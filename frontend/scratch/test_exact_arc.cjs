const fs = require('fs');

const W = 460;
const H = 570;

const cx = 52;
const cy = 52;
const rEmblem = 44;
const R = 52;

const Rx = (R / W).toFixed(4);
const Ry = (R / H).toFixed(4);
const xTop = (cx / W).toFixed(4);
const yLeft = (cy / H).toFixed(4);

const pathD = `M ${xTop},0
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
L 0,${yLeft}
A ${Rx} ${Ry} 0 1 0 ${xTop} 0
Z`;

console.log('Generated Path:');
console.log(pathD);

// Let's create an SVG showing this exact card in full scale (460 x 570)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 570" width="460" height="570">
  <defs>
    <clipPath id="test-clip" clipPathUnits="objectBoundingBox">
      <path d="${pathD}" />
    </clipPath>
  </defs>

  <!-- Blue Image Card clipped with the exact path -->
  <rect width="460" height="570" fill="#2563eb" clip-path="url(#test-clip)" />

  <!-- Circular Emblem placed at (52, 52) with radius 44px -->
  <circle cx="52" cy="52" r="44" fill="#ffffff" stroke="#0a2558" stroke-width="2.5" />
  <circle cx="52" cy="52" r="28" fill="#ffffff" stroke="#0a2558" stroke-width="1.5" />
  <text x="52" y="56" font-family="sans-serif" font-size="10" font-weight="bold" fill="#0a2558" text-anchor="middle">LOGO</text>
</svg>`;

fs.writeFileSync('C:/Users/Gowthaman KS/.gemini/antigravity-ide/brain/e4caee58-76ce-4aff-9f92-848ca9c7aa39/exact_circle_card.svg', svg);
console.log('Saved exact_circle_card.svg successfully!');
