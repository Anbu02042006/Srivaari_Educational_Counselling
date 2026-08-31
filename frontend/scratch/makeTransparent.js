import fs from 'fs';
import zlib from 'zlib';

function processPng(inputPath, outputPath) {
  const buf = fs.readFileSync(inputPath);
  
  // Verify PNG signature
  if (buf.readUInt32BE(0) !== 0x89504E47 || buf.readUInt32BE(4) !== 0x0D0A1A0A) {
    console.error('Not a valid PNG');
    return;
  }

  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0, compression = 0, filter = 0, interlace = 0;
  const idatChunks = [];
  const otherChunksBeforeIdat = [];
  const otherChunksAfterIdat = [];
  let foundIdat = false;
  let finishedIdat = false;

  while (pos < buf.length) {
    const length = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const chunkData = buf.slice(pos + 8, pos + 8 + length);
    const crc = buf.readUInt32BE(pos + 8 + length);

    if (type === 'IHDR') {
      width = chunkData.readUInt32BE(0);
      height = chunkData.readUInt32BE(4);
      bitDepth = chunkData[8];
      colorType = chunkData[9];
      compression = chunkData[10];
      filter = chunkData[11];
      interlace = chunkData[12];
      console.log({ width, height, bitDepth, colorType, compression, filter, interlace });
    } else if (type === 'IDAT') {
      foundIdat = true;
      idatChunks.push(chunkData);
    } else if (type === 'IEND') {
      break;
    } else {
      if (!foundIdat) {
        otherChunksBeforeIdat.push({ type, chunkData });
      } else {
        otherChunksAfterIdat.push({ type, chunkData });
      }
    }

    pos += 12 + length;
  }

  const compressedData = Buffer.concat(idatChunks);
  const uncompressed = zlib.inflateSync(compressedData);
  console.log('Uncompressed length:', uncompressed.length);

  // If colorType is 6 (RGBA) or 2 (RGB)
  // Let's create an RGBA raw scanlines buffer
  const bytesPerPixel = colorType === 6 ? 4 : (colorType === 2 ? 3 : 4);
  const stride = width * bytesPerPixel;
  
  // Convert to RGBA (colorType 6)
  const newRaw = Buffer.alloc(height * (1 + width * 4));
  
  let srcPos = 0;
  let dstPos = 0;

  // Track the background color from top-left pixel (0,0)
  // We can also make any pixel with high brightness / white / matching corner color transparent
  let cornerR = 255, cornerG = 255, cornerB = 255;

  // Let's first un-filter scanlines
  const uncompressedRows = [];
  let rowOffset = 0;
  for (let y = 0; y < height; y++) {
    const filterType = uncompressed[rowOffset];
    const row = uncompressed.slice(rowOffset + 1, rowOffset + 1 + stride);
    uncompressedRows.push({ filterType, row });
    rowOffset += 1 + stride;
  }

  // Simple reconstruction (handle filter types: 0=None, 1=Sub, 2=Up, 3=Average, 4=Paeth)
  const reconstructed = Buffer.alloc(height * stride);
  for (let y = 0; y < height; y++) {
    const { filterType, row } = uncompressedRows[y];
    const rowStart = y * stride;
    const prevRowStart = (y - 1) * stride;

    for (let x = 0; x < stride; x++) {
      const bpp = bytesPerPixel;
      const rawByte = row[x];
      const a = x >= bpp ? reconstructed[rowStart + x - bpp] : 0;
      const b = y > 0 ? reconstructed[prevRowStart + x] : 0;
      const c = (x >= bpp && y > 0) ? reconstructed[prevRowStart + x - bpp] : 0;

      let val = rawByte;
      if (filterType === 0) {
        val = rawByte;
      } else if (filterType === 1) {
        val = (rawByte + a) & 0xFF;
      } else if (filterType === 2) {
        val = (rawByte + b) & 0xFF;
      } else if (filterType === 3) {
        val = (rawByte + Math.floor((a + b) / 2)) & 0xFF;
      } else if (filterType === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        let pr;
        if (pa <= pb && pa <= pc) pr = a;
        else if (pb <= pc) pr = b;
        else pr = c;
        val = (rawByte + pr) & 0xFF;
      }
      reconstructed[rowStart + x] = val;
    }
  }

  // Get corner color
  cornerR = reconstructed[0];
  cornerG = reconstructed[1];
  cornerB = reconstructed[2];
  console.log('Corner pixel color:', { cornerR, cornerG, cornerB });

  // Now build RGBA with transparent background
  let outOffset = 0;
  for (let y = 0; y < height; y++) {
    newRaw[outOffset++] = 0; // Filter None
    const inRow = y * stride;

    for (let x = 0; x < width; x++) {
      const px = inRow + x * bytesPerPixel;
      const r = reconstructed[px];
      const g = reconstructed[px + 1];
      const b = reconstructed[px + 2];
      let a = bytesPerPixel === 4 ? reconstructed[px + 3] : 255;

      // Color distance from white (255,255,255) and corner color
      const distWhite = Math.sqrt((r - 255) ** 2 + (g - 255) ** 2 + (b - 255) ** 2);
      const distCorner = Math.sqrt((r - cornerR) ** 2 + (g - cornerG) ** 2 + (b - cornerB) ** 2);

      // If near white or corner color (threshold)
      if (distWhite < 45 || distCorner < 35 || (r > 240 && g > 240 && b > 240)) {
        a = 0;
      } else if (distWhite < 65) {
        // Soft edge antialiasing
        a = Math.min(a, Math.round(((distWhite - 45) / 20) * 255));
      }

      newRaw[outOffset++] = r;
      newRaw[outOffset++] = g;
      newRaw[outOffset++] = b;
      newRaw[outOffset++] = a;
    }
  }

  // Re-encode PNG
  const newCompressed = zlib.deflateSync(newRaw);

  function createChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crc = crc32(Buffer.concat([typeBuf, data]));
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc >>> 0, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // Simple CRC32 table
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }
  function crc32(buf) {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) {
      c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
    }
    return (c ^ 0xFFFFFFFF);
  }

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bitDepth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', newCompressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  const outBuf = Buffer.concat([pngSignature, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(outputPath, outBuf);
  console.log('Successfully saved transparent logo to', outputPath);
}

processPng('d:/consultingApp/frontend/public/logo.png', 'd:/consultingApp/frontend/public/logo.png');
