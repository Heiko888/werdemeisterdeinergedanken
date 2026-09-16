// Reliable PNG crop (top-left W x H) using only Node's zlib.
// Usage: node pngcrop.js in.png out.png W H
const fs = require("fs");
const zlib = require("zlib");

function readPNG(file) {
  const buf = fs.readFileSync(file);
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("not a png");
  let p = 8, W, H, bitDepth, colorType, idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString("ascii", p + 4, p + 8);
    const data = buf.subarray(p + 8, p + 8 + len);
    if (type === "IHDR") {
      W = data.readUInt32BE(0); H = data.readUInt32BE(4);
      bitDepth = data[8]; colorType = data[9];
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    p += 12 + len;
  }
  if (bitDepth !== 8) throw new Error("bitDepth " + bitDepth + " unsupported");
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 0 ? 1 : colorType === 4 ? 2 : (() => { throw new Error("colorType " + colorType); })();
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = channels; // bytes per pixel (8-bit)
  const stride = W * bpp;
  const out = Buffer.alloc(H * stride);
  let inPos = 0;
  for (let y = 0; y < H; y++) {
    const f = raw[inPos++];
    for (let x = 0; x < stride; x++) {
      const v = raw[inPos++];
      const a = x >= bpp ? out[y * stride + x - bpp] : 0;
      const b = y > 0 ? out[(y - 1) * stride + x] : 0;
      const c = (x >= bpp && y > 0) ? out[(y - 1) * stride + x - bpp] : 0;
      let r;
      switch (f) {
        case 0: r = v; break;
        case 1: r = v + a; break;
        case 2: r = v + b; break;
        case 3: r = v + ((a + b) >> 1); break;
        case 4: {
          const pp = a + b - c;
          const pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c);
          r = v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); break;
        }
        default: throw new Error("filter " + f);
      }
      out[y * stride + x] = r & 255;
    }
  }
  return { W, H, channels, data: out };
}

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xEDB88320 & -(c & 1));
  }
  return ~c >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}
function writePNG(file, W, H, channels, data) {
  const colorType = channels === 4 ? 6 : channels === 3 ? 2 : channels === 2 ? 4 : 0;
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; ihdr[9] = colorType; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const stride = W * channels;
  const rawf = Buffer.alloc(H * (stride + 1));
  for (let y = 0; y < H; y++) {
    rawf[y * (stride + 1)] = 0; // filter none
    data.copy(rawf, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = zlib.deflateSync(rawf, { level: 9 });
  const sig = Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]);
  fs.writeFileSync(file, Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]));
}

const [,, inF, outF, wArg, hArg] = process.argv;
const img = readPNG(inF);
const cw = Math.min(parseInt(wArg, 10), img.W);
const ch = Math.min(parseInt(hArg, 10), img.H);
const stride = img.W * img.channels;
const cropped = Buffer.alloc(ch * cw * img.channels);
for (let y = 0; y < ch; y++) {
  img.data.copy(cropped, y * cw * img.channels, y * stride, y * stride + cw * img.channels);
}
writePNG(outF, cw, ch, img.channels, cropped);
console.log("cropped", inF, "->", outF, cw + "x" + ch, "(src " + img.W + "x" + img.H + ")");
