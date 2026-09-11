const fs = require('fs');

const svgTest = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
  <circle cx="100" cy="100" r="96" fill="#ffffff" stroke="#0a2558" stroke-width="2" />
  <circle cx="100" cy="100" r="62" fill="#2563eb" />
  
  <defs>
    <!-- Top arc: left to right clockwise over the top -->
    <path id="top-arc" d="M 22, 100 A 78 78 0 0 1 178, 100" fill="none" />
    
    <!-- Bottom arc: left to right counter-clockwise along the bottom -->
    <path id="bottom-arc" d="M 18, 100 A 82 82 0 0 0 182, 100" fill="none" />
  </defs>

  <text font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="14.5" fill="#0a2558" letter-spacing="2px">
    <textPath href="#top-arc" startOffset="50%" text-anchor="middle">SRI VAARI</textPath>
  </text>
  
  <text font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="850" font-size="10.2" fill="#0a2558" letter-spacing="1.2px">
    <textPath href="#bottom-arc" startOffset="50%" text-anchor="middle">EDUCATIONAL GROUPS</textPath>
  </text>
</svg>`;

fs.writeFileSync('C:/Users/Gowthaman KS/.gemini/antigravity-ide/brain/e4caee58-76ce-4aff-9f92-848ca9c7aa39/test_emblem.svg', svgTest);
console.log('Saved test_emblem.svg successfully!');
