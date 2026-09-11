const fs = require('fs');

const W = 440;
const H = 545;

const desktopRx = (52 / W).toFixed(4);
const desktopRy = (52 / H).toFixed(4);
const desktopXTop = desktopRx;
const desktopYLeft = desktopRy;

const desktopPathD = `M ${desktopXTop},0
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
L 0,${desktopYLeft}
A ${desktopRx} ${desktopRy} 0 1 0 ${desktopXTop} 0
Z`;

console.log('Desktop Path:', desktopPathD);

const mobileW = 360;
const mobileH = 450;
const mobileRx = (45 / mobileW).toFixed(4);
const mobileRy = (45 / mobileH).toFixed(4);
const mobileXTop = mobileRx;
const mobileYLeft = mobileRy;

const mobilePathD = `M ${mobileXTop},0
L 0.90,0
C 0.96,0 1,0.04 1,0.10
L 1,0.835
C 1,0.852 0.98,0.858 0.94,0.858
L 0.70,0.858
C 0.665,0.858 0.65,0.878 0.65,0.915
L 0.65,0.945
C 0.65,0.982 0.63,1 0.59,1
L 0.10,1
C 0.04,1 0,0.96 0,0.90
L 0,${mobileYLeft}
A ${mobileRx} ${mobileRy} 0 1 0 ${mobileXTop} 0
Z`;

console.log('Mobile Path:', mobilePathD);
