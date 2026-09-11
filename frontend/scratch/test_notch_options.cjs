const fs = require('fs');

// We want to test different notch paths for a card of width 450, height 558.
// Aspect ratio is 450:558 (1 : 1.24)
// Let's create an SVG that shows the card, the clipped image, the circular emblem, and the notch contour!

const emblemSize = 92; // increased emblem size
const emblemPadX = 14;
const emblemPadY = 14;
const cx = emblemPadX + emblemSize / 2; // 14 + 46 = 60px
const cy = emblemPadY + emblemSize / 2; // 14 + 46 = 60px
const rEmblem = emblemSize / 2; // 46px

// In normalized coordinates (0 to 1):
const W = 450;
const H = 558;

// Radius of cutout around emblem:
// We want a uniform gap of ~10px around the emblem:
const rCutoutX = (rEmblem + 12) / W; // (46 + 12) / 450 = 58 / 450 = 0.1289
const rCutoutY = (rEmblem + 12) / H; // (46 + 12) / 558 = 58 / 558 = 0.1039
const cxNorm = cx / W; // 60 / 450 = 0.1333
const cyNorm = cy / H; // 60 / 558 = 0.1075

// Let's design the path from (0, yStart) around the circle to (xEnd, 0):
// On left edge: at y = 0.19 (106px), curve starts
// Point 1: (0, 0.19)
// Reverse fillet rounding into circle:
// Transition to circular arc around (cxNorm, cyNorm)
// Point 2: bottom-left of circle cutout: (cxNorm - rCutoutX * 0.707, cyNorm + rCutoutY * 0.707)
// Point 3: bottom-center of circle cutout: (cxNorm, cyNorm + rCutoutY)
// Point 4: bottom-right of circle cutout: (cxNorm + rCutoutX * 0.707, cyNorm + rCutoutY * 0.707)
// Point 5: right-center of circle cutout: (cxNorm + rCutoutX, cyNorm)
// Transition to top edge at (0.24, 0)

console.log('Generating test options...');
