import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('d:/consultingApp/frontend/public/logo.png');
let pos = 8;
let width = 0, height = 0;
const idatChunks = [];

while (pos < buf.length) {
  const length = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  const chunkData = buf.slice(pos + 8, pos + 8 + length);
  if (type === 'IHDR') {
    width = chunkData.readUInt32BE(0);
    height = chunkData.readUInt32BE(4);
  } else if (type === 'IDAT') {
    idatChunks.push(chunkData);
  } else if (type === 'IEND') {
    break;
  }
  pos += 12 + length;
}

const uncompressed = zlib.inflateSync(Buffer.concat(idatChunks));
const stride = width * 4;
let transparentCount = 0;
let opaqueCount = 0;
const sampleColors = [];

for (let y = 0; y < height; y += 50) {
  const rowStart = y * (1 + stride) + 1;
  for (let x = 0; x < width; x += 50) {
    const px = rowStart + x * 4;
    const r = uncompressed[px];
    const g = uncompressed[px + 1];
    const b = uncompressed[px + 2];
    const a = uncompressed[px + 3];
    if (a === 0) transparentCount++;
    else opaqueCount++;
    if (sampleColors.length < 15 && a > 0) {
      sampleColors.push({ x, y, r, g, b, a });
    }
  }
}

console.log({ width, height, transparentCount, opaqueCount, sampleColors });
