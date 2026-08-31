import fs from 'fs';
import zlib from 'zlib';
import jpeg from 'jpeg-js';

const inputPath = 'C:/Users/Gowthaman KS/.gemini/antigravity-ide/brain/0367975f-8806-439a-9412-b41149a5c422/.user_uploaded/media_1788191670233.jpg';
const outputPath = 'd:/consultingApp/frontend/public/logo.png';

const jpegData = fs.readFileSync(inputPath);
const rawImageData = jpeg.decode(jpegData, { useTArray: true });

const width = rawImageData.width;
const height = rawImageData.height;
const data = rawImageData.data; // RGBA buffer

console.log(`Original image size: ${width}x${height}`);

// Process transparency
// For each pixel, calculate distance from pure white (255, 255, 255)
// And create transparent alpha
for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  // Luminance or Euclidean distance from white (255, 255, 255)
  const distWhite = Math.sqrt((r - 255) ** 2 + (g - 255) ** 2 + (b - 255) ** 2);

  if (distWhite < 25 || (r > 242 && g > 242 && b > 242)) {
    data[i + 3] = 0; // Pure transparent
  } else if (distWhite < 55) {
    // Smooth antialiasing gradient
    const alphaFactor = (distWhite - 25) / 30;
    data[i + 3] = Math.min(255, Math.max(0, Math.round(alphaFactor * 255)));
  } else {
    data[i + 3] = 255;
  }
}

// Find bounding box of non-transparent pixels to crop tight
let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const a = data[idx + 3];
    if (a > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

// Add padding (approx 4%)
const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.04);
minX = Math.max(0, minX - pad);
maxX = Math.min(width - 1, maxX + pad);
minY = Math.max(0, minY - pad);
maxY = Math.min(height - 1, maxY + pad);

const croppedWidth = maxX - minX + 1;
const croppedHeight = maxY - minY + 1;

console.log(`Cropped dimensions: ${croppedWidth}x${croppedHeight}`);

// Make it square for standard icon ratio
const size = Math.max(croppedWidth, croppedHeight);
const offsetX = Math.floor((size - croppedWidth) / 2);
const offsetY = Math.floor((size - croppedHeight) / 2);

const squareRaw = Buffer.alloc(size * (1 + size * 4));
let rawOffset = 0;

for (let y = 0; y < size; y++) {
  squareRaw[rawOffset++] = 0; // Filter None

  for (let x = 0; x < size; x++) {
    const srcX = x - offsetX + minX;
    const srcY = y - offsetY + minY;

    if (srcX >= minX && srcX <= maxX && srcY >= minY && srcY <= maxY) {
      const srcIdx = (srcY * width + srcX) * 4;
      squareRaw[rawOffset++] = data[srcIdx];
      squareRaw[rawOffset++] = data[srcIdx + 1];
      squareRaw[rawOffset++] = data[srcIdx + 2];
      squareRaw[rawOffset++] = data[srcIdx + 3];
    } else {
      squareRaw[rawOffset++] = 0;
      squareRaw[rawOffset++] = 0;
      squareRaw[rawOffset++] = 0;
      squareRaw[rawOffset++] = 0;
    }
  }
}

// Re-encode PNG
const newCompressed = zlib.deflateSync(squareRaw);

// CRC32 Helper
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

function createChunk(type, chunkData) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(chunkData.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = crc32(Buffer.concat([typeBuf, chunkData]));
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc >>> 0, 0);
  return Buffer.concat([len, typeBuf, chunkData, crcBuf]);
}

const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(size, 0);
ihdrData.writeUInt32BE(size, 4);
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
console.log('Successfully saved high-res transparent logo to:', outputPath);
