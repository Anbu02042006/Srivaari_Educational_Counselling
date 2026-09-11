const fs = require('fs');

// Card dimensions
const W = 450;
const H = 558;

// Emblem: 90px x 90px, centered at (52, 52)
// Center in normalized:
const cx = 52 / W; // 0.1155
const cy = 52 / H; // 0.0932

// We want the clip path curve to hug this circle from (x_top, 0) to (0, y_left):
// Let's test a couple of curve formulations:

// Option A: Smooth Cubic Bezier pocket
// Starts at (0.22, 0)
// Curves down around the circle:
// Control point 1: (0.20, 0.09)
// Control point 2: (0.13, 0.16)
// Control point 3: (0, 0.175)

// Option B: Multi-segment with outer transition fillets
// Top edge fillet: (0.23, 0) -> C (0.21, 0) (0.20, 0.02) -> (0.195, 0.05)
// Circular arc: C (0.195, 0.11) (0.135, 0.165) -> (0.06, 0.165)
// Left edge fillet: C (0.025, 0.165) (0, 0.18) -> (0, 0.20)

// Let's generate an SVG showing:
// 1. The card background (blue photo placeholder)
// 2. The cutout path
// 3. The emblem circle at (52, 52) with radius 45px (diameter 90px)

function makeCardSvg(pathD, label) {
  return `
  <g transform="translate(0, 0)">
    <text x="20" y="30" font-family="sans-serif" font-size="14" font-weight="bold">${label}</text>
    <!-- Background Card -->
    <path d="${pathD}" fill="#1d4ed8" />
    <!-- Emblem Circle -->
    <circle cx="52" cy="52" r="45" fill="#ffffff" stroke="#0a2558" stroke-width="2" />
    <circle cx="52" cy="52" r="28" fill="#2563eb" />
  </g>`;
}

// Convert normalized path to pixel path (450 x 558)
function denorm(pathStr) {
  return pathStr.replace(/([0-9.]+),([0-9.]+)/g, (match, x, y) => {
    return `${(parseFloat(x) * W).toFixed(1)},${(parseFloat(y) * H).toFixed(1)}`;
  });
}

// Let's test Option 1:
// Top-left notch:
// M 0.22,0
// L 0.92,0 ... L 0,0.92 ... L 0,0.185
// C 0,0.165 0.03,0.155 0.07,0.155 (wait, that was stepped)
// What if it is:
// L 0, 0.19
// C 0.02, 0.185 0.045, 0.18 0.07, 0.175
// C 0.135, 0.165 0.195, 0.125 0.20, 0.065
// C 0.205, 0.035 0.21, 0 0.23, 0

const opt1_norm = `
M 0.23,0
L 0.92,0
C 0.97,0 1,0.03 1,0.08
L 1,0.885
C 1,0.895 0.985,0.905 0.96,0.905
L 0.76,0.905
C 0.735,0.905 0.72,0.92 0.72,0.945
L 0.72,0.965
C 0.72,0.99 0.70,1 0.66,1
L 0.08,1
C 0.03,1 0,0.97 0,0.92
L 0,0.19
C 0.015,0.185 0.04,0.178 0.07,0.172
C 0.135,0.158 0.185,0.118 0.198,0.065
C 0.205,0.035 0.21,0 0.23,0
Z`;

// Option 2: circular arc
// An exact circular arc of radius 58px centered at (52, 52):
// Radius in norm: rx = 58/450 = 0.1289, ry = 58/558 = 0.1039
// Center: cx = 52/450 = 0.1156, cy = 52/558 = 0.0932
// Point on left edge: (0, 0.165)
// Point on top edge: (0.21, 0)
// Using cubic bezier that closely approximates the circle contour:
const opt2_norm = `
M 0.22,0
L 0.92,0
C 0.97,0 1,0.03 1,0.08
L 1,0.885
C 1,0.895 0.985,0.905 0.96,0.905
L 0.76,0.905
C 0.735,0.905 0.72,0.92 0.72,0.945
L 0.72,0.965
C 0.72,0.99 0.70,1 0.66,1
L 0.08,1
C 0.03,1 0,0.97 0,0.92
L 0,0.185
C 0.035,0.18 0.08,0.172 0.115,0.15
C 0.155,0.125 0.185,0.085 0.198,0.04
C 0.205,0.015 0.21,0 0.22,0
Z`;

// Option 3: Smooth circular pocket with reverse fillet shoulders
const opt3_norm = `
M 0.225,0
L 0.92,0
C 0.97,0 1,0.03 1,0.08
L 1,0.885
C 1,0.895 0.985,0.905 0.96,0.905
L 0.76,0.905
C 0.735,0.905 0.72,0.92 0.72,0.945
L 0.72,0.965
C 0.72,0.99 0.70,1 0.66,1
L 0.08,1
C 0.03,1 0,0.97 0,0.92
L 0,0.195
C 0.01,0.178 0.035,0.17 0.065,0.168
C 0.12,0.165 0.172,0.135 0.195,0.085
C 0.205,0.06 0.21,0.02 0.225,0
Z`;

const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 700" width="1500" height="700">
  <rect width="100%" height="100%" fill="#f8fafc" />
  <g transform="translate(50, 50)">
    ${makeCardSvg(denorm(opt1_norm), 'Option 1: Progressive Bezier')}
  </g>
  <g transform="translate(520, 50)">
    ${makeCardSvg(denorm(opt2_norm), 'Option 2: Circular Arc Contour')}
  </g>
  <g transform="translate(990, 50)">
    ${makeCardSvg(denorm(opt3_norm), 'Option 3: Circular Pocket with Shoulder Fillets')}
  </g>
</svg>`;

fs.writeFileSync('C:/Users/Gowthaman KS/.gemini/antigravity-ide/brain/e4caee58-76ce-4aff-9f92-848ca9c7aa39/compare_notches.svg', fullSvg);
console.log('Saved compare_notches.svg!');
