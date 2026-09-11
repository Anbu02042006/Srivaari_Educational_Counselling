const fs = require('fs');

const W = 460;
const H = 570;

// Emblem: 88px x 88px, centered at (49, 49)
const cx = 49;
const cy = 49;
const r = 44;

// Cutout circle: radius R = 52px (gap = 8px)
// We want the blue card to have a circular notch that fits the emblem.
// Let's test Option A: Using SVG Arc command A
// Start point on top edge: (xTop, 0)
// Start point on left edge: (0, yLeft)

// Let's calculate:
// Where does a circle of radius R=55 around (cx=49, cy=49) intersect y=0?
// (x - 49)^2 + (0 - 49)^2 = 55^2 = 3025
// (x - 49)^2 = 3025 - 2401 = 624
// x - 49 = sqrt(624) = 24.98
// x = 49 + 25 = 74px -> normalized: 74 / 460 = 0.1609

// Where does it intersect x=0?
// (0 - 49)^2 + (y - 49)^2 = 55^2 -> y = 49 + 25 = 74px -> normalized: 74 / 570 = 0.1298

// But at (74, 0), the circle is at an angle!
// To make it smooth with the top edge:
// In modern card notches:
// The curve comes from the top edge with a reverse fillet (outer curve),
// sweeps around the circle (inner curve),
// and exits to the left edge with a reverse fillet (outer curve)!
// This is the classic inverted-corner circular notch!

// Let's compute the exact bezier for an inverted circular notch:
// Let's test:
// Top edge point: (xTop, 0) where xTop = 96px (norm: 96/460 = 0.2087)
// Left edge point: (0, yLeft) where yLeft = 96px (norm: 96/570 = 0.1684)
//
// The curve between them:
// At all angles between 0° and 90°:
// Distance from (49, 49) should be R ≈ 52px!
// Let's check:
// At 90° (bottom): y = 49 + 52 = 101px, x = 49px
// At 45° (bottom-right): x = 49 + 52*cos(45°) = 85.8px, y = 49 + 52*sin(45°) = 85.8px
// At 0° (right): x = 49 + 52 = 101px, y = 49px

console.log('Computing points...');
