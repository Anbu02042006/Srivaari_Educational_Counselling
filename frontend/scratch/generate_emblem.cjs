const fs = require('fs');

function generateUpdatedEmblemSvg() {
  // Read /logo.png as base64
  const logoBuf = fs.readFileSync('public/logo.png');
  const logoBase64 = `data:image/png;base64,${logoBuf.toString('base64')}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <!-- Soft outer drop shadow for tactile badge depth -->
    <filter id="emblem-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3.5" flood-color="#0a2558" flood-opacity="0.22" />
    </filter>

    <!-- Top arc: left to right clockwise over the top -->
    <path id="top-arc-path" d="M 22, 100 A 78 78 0 0 1 178, 100" fill="none" />

    <!-- Bottom arc: left to right counter-clockwise along the bottom -->
    <path id="bottom-arc-path" d="M 17, 100 A 83 83 0 0 0 183, 100" fill="none" />
  </defs>

  <!-- 1. Outer White Ring Base with Drop Shadow & Dark Navy Stroke -->
  <circle cx="100" cy="100" r="96" fill="#ffffff" stroke="#0a2558" stroke-width="2.5" filter="url(#emblem-shadow)" />

  <!-- 2. Subtle Outer Inset Guide Line -->
  <circle cx="100" cy="100" r="92.5" fill="none" stroke="#e2e8f0" stroke-width="0.75" />

  <!-- 3. Inner Clean White Circle (Logo Background) -->
  <circle cx="100" cy="100" r="62" fill="#ffffff" stroke="#0a2558" stroke-width="2" />

  <!-- 4. Subtle Inner Accent Ring -->
  <circle cx="100" cy="100" r="59.5" fill="none" stroke="#e2e8f0" stroke-width="0.8" />

  <!-- 5. Decorative Side Stars/Dots separating top and bottom text -->
  <circle cx="18" cy="100" r="2.2" fill="#0a2558" />
  <circle cx="182" cy="100" r="2.2" fill="#0a2558" />

  <!-- 6. Top Curved Text: SRI VAARI -->
  <text
    font-family="'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    font-weight="900"
    font-size="14.5"
    fill="#0a2558"
    letter-spacing="2.2px"
  >
    <textPath href="#top-arc-path" startOffset="50%" text-anchor="middle">
      SRI VAARI
    </textPath>
  </text>

  <!-- 7. Bottom Curved Text: EDUCATIONAL GROUPS -->
  <text
    font-family="'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    font-weight="850"
    font-size="9.8"
    fill="#0a2558"
    letter-spacing="1.2px"
  >
    <textPath href="#bottom-arc-path" startOffset="50%" text-anchor="middle">
      EDUCATIONAL GROUPS
    </textPath>
  </text>

  <!-- 8. Center Logo: Original Logo Colors on Crisp White Background -->
  <g id="emblem-center-logo">
    <image
      href="${logoBase64}"
      x="54"
      y="54"
      width="92"
      height="92"
      preserveAspectRatio="xMidYMid meet"
    />
  </g>
</svg>`;

  fs.writeFileSync('public/sri_vaari_emblem.svg', svg);
  console.log('Successfully regenerated public/sri_vaari_emblem.svg with white background and original colors!');
}

generateUpdatedEmblemSvg();
