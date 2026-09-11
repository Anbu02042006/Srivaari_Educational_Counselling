const fs = require('fs');

const W = 460;
const H = 570;

// Emblem: Diameter = 88px. Radius = 44px.
// Let's place the emblem with center at (cx, cy):
// If the emblem sits in the top-left:
// Say cx = 50px, cy = 50px (diameter 88px fits from x=6 to 94, y=6 to 94).
// A concentric circle around this emblem with gap g = 8px:
// Radius R = 44 + 8 = 52px (or R = 54px).
//
// What points does this circle of radius R around (cx, cy) touch?
// If cx = 50, cy = 50, R = 52:
// At x = 0: (0 - 50)^2 + (y - 50)^2 = 52^2 = 2704
// (y - 50)^2 = 2704 - 2500 = 204
// y - 50 = sqrt(204) = 14.28
// y = 50 + 14.28 = 64.28px!
// And at y = 0:
// x = 50 + 14.28 = 64.28px!
// But wait! From (0, 64.28) to (64.28, 0):
// That's only an arc of 30 degrees! It cuts off the corner!
//
// WHAT IF cx = 0, cy = 0? (The circle is centered at the top-left corner!)
// If the circle is centered at (0, 0):
// Radius R = 100px.
// At x = 0, y = 100px!
// At y = 0, x = 100px!
// Between (0, 100) and (100, 0):
// It is an EXACT QUARTER-CIRCLE centered at (0, 0)!
// And if the emblem is centered at (0, 0), only 1/4 of the emblem would show!
//
// BUT THE EMBLEM IS FULLY VISIBLE!
// The emblem is a full circle of 88px diameter, fully inside the top-left!
// Let's see: If the emblem is fully visible, its center is at (cx, cy).
// How does a notch wrap around a full circle?
// Look at a coin or badge placed in a card cutout:
// The card has a circular socket!
// A circular socket has:
// 1. A transition from the top edge: coming from x = 110px on top edge.
// 2. An arc that wraps around the emblem:
//    From angle ~30° (top-right of circle) all the way around to ~240° (bottom-left of circle)!
//    THAT IS A 210° ARC — MORE THAN A HALF CIRCLE!
// 3. And exits to the left edge at y = 110px!

console.log('Calculating circular socket...');
