const fs = require('fs');

// Card dimensions: W = 460, H = 570
const W = 460;
const H = 570;

// Emblem: diameter D = 92px. Radius = 46px.
// Let's place the emblem so it fits beautifully in the top-left.
// If the emblem center is at (cx, cy):
// Say emblem is at top-left with a 6px margin:
// cx = 6 + 46 = 52px. cy = 6 + 46 = 52px.
// Or say emblem center is at (50, 50).
//
// What if the cutout is an EXACT CIRCLE of radius R = 54px (emblem radius 46 + 8px gap)?
// If the cutout circle is centered at (cx, cy):
// Let's see where a circle of radius R around (cx, cy) goes!

function makeTestSvg(cx, cy, R, label) {
  // Center in normalized:
  const cx_norm = cx / W;
  const cy_norm = cy / H;
  const Rx = R / W;
  const Ry = R / H;

  // Let's calculate the exact arc:
  // If the arc goes from left edge to top edge:
  // At x = 0: y = cy + sqrt(R^2 - cx^2)
  // At y = 0: x = cx + sqrt(R^2 - cy^2)
  const dy = Math.sqrt(Math.max(0, R*R - cx*cx));
  const dx = Math.sqrt(Math.max(0, R*R - cy*cy));

  const yLeft = (cy + dy) / H;
  const xTop = (cx + dx) / W;

  // SVG Arc command:
  // From (0, yLeft) to (xTop, 0)
  // A Rx Ry 0 0 0 xTop 0
  const pathD = `M ${xTop.toFixed(4)},0
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
L 0,${yLeft.toFixed(4)}
A ${Rx.toFixed(4)} ${Ry.toFixed(4)} 0 0 0 ${xTop.toFixed(4)} 0
Z`;

  return { pathD, cx, cy, R, xTop, yLeft, label };
}

// Case 1: cx = 54, cy = 54, R = 54 (perfect tangential meeting at (0, 54) and (54, 0))
console.log('Case 1: Tangential meeting:');
const c1 = makeTestSvg(54, 54, 54, 'Tangential');
console.log(c1);

// Case 2: cx = 48, cy = 48, R = 56 (extends slightly onto edges)
console.log('Case 2: Slight overlap:');
const c2 = makeTestSvg(48, 48, 56, 'Overlap');
console.log(c2);

// Case 3: Circular pocket with reverse fillets (shoulders)
// Starts at x = 90 on top edge, curves with shoulder into circle of radius 50, curves out with shoulder to y = 90 on left edge
console.log('Case 3: Circle with shoulders');
