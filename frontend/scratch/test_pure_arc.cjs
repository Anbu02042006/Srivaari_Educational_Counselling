const fs = require('fs');

const W = 460;
const H = 570;

// Emblem: 88px x 88px.
// Let's place the emblem at: left = 6px, top = 6px.
// Emblem center = (50, 50). Emblem radius = 44px.
const cx = 50;
const cy = 50;
const rEmblem = 44;

// Notch curve: Concentric circle of radius R = 50px around (50, 50).
// Distance between emblem edge (44px) and cutout (50px) is exactly 6px all the way around!
// At angle theta (from 0 to 180 deg under the emblem):
// theta = 0 deg (pointing right): x = 100, y = 50
// theta = 30 deg: x = 50 + 50*cos(30°) = 93.3, y = 50 + 50*sin(30°) = 75
// theta = 60 deg: x = 50 + 50*cos(60°) = 75, y = 50 + 50*sin(60°) = 93.3
// theta = 90 deg (bottom): x = 50, y = 100
// theta = 120 deg: x = 25, y = 93.3
// theta = 150 deg: x = 6.7, y = 75
// theta = 180 deg (left): x = 0, y = 50
//
// And from (100, 50) up to the top edge:
// theta = -30 deg: x = 93.3, y = 25
// theta = -60 deg: x = 75, y = 6.7
// theta = -90 deg (top): x = 50, y = 0
//
// In normalized units:
// Left edge point: x = 0 / 460 = 0, y = 50 / 570 = 0.0877
// Bottom-left point: x = 14.6 / 460 = 0.0317, y = 85.4 / 570 = 0.1498
// Bottom point: x = 50 / 460 = 0.1087, y = 100 / 570 = 0.1754
// Bottom-right point: x = 85.4 / 460 = 0.1857, y = 85.4 / 570 = 0.1498
// Right point: x = 100 / 460 = 0.2174, y = 50 / 570 = 0.0877
// Top edge point: x = 50 / 460 = 0.1087, y = 0 / 570 = 0

// Notice that with SVG arc:
// From (0, 0.0877) to (0.1087, 0):
// An arc of radius Rx = 50/460 = 0.1087, Ry = 50/570 = 0.0877:
// A Rx Ry 0 1 0 0.1087 0 (large-arc-flag = 1 because it's 270 degrees!)
// WOW!

console.log('Testing 270 deg circular arc:');
console.log('A', (50/W).toFixed(4), (50/H).toFixed(4), '0 1 0', (50/W).toFixed(4), '0');
