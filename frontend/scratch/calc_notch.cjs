const fs = require('fs');

// Card dimensions: aspect-ratio 1 / 1.24 (e.g. 450 x 558)
const W = 450;
const H = 558;

// Emblem: Diameter = 92px. Radius = 46px.
// Let's place emblem center at (x0, y0):
// If emblem is at left: 14px, top: 14px -> center is at (60px, 60px).
// In normalized units:
// x0_norm = 60 / 450 = 0.1333
// y0_norm = 60 / 558 = 0.1075

// The notch cutout should smoothly wrap around the circle.
// Let's evaluate a smooth bezier arc around the circle:
// 1. On top edge (y=0):
//    Coming from right, at x = 0.22, the boundary curves smoothly down.
// 2. Around the bottom-right of the circular emblem:
//    At angle ~45 deg down-right:
//    The curve is concentric with the emblem, at radius ~58px (emblem radius 46 + gap 12).
//    In normalized units:
//    x_diag = (60 + 58 * cos(45°)) / 450 = (60 + 41) / 450 = 101 / 450 = 0.224
//    y_diag = (60 + 58 * sin(45°)) / 558 = (60 + 41) / 558 = 101 / 558 = 0.181
// 3. Rounding to left edge (x=0):
//    At y = 0.20, curve smoothly meets x = 0.

console.log('Calculating smooth contour curve...');
