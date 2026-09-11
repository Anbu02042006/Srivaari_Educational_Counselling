import React from 'react'

function SriVaariEmblem({ className = '', style = {} }) {
  return (
    <div
      className={`sri-vaari-emblem ${className}`.trim()}
      style={style}
      role="img"
      aria-label="Sri Vaari Educational Groups Emblem"
    >
      <svg
        viewBox="0 0 200 200"
        className="sri-vaari-emblem__svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle badge drop shadow */}
          <filter id="badge-outer-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" floodColor="#0a2558" floodOpacity="0.2" />
          </filter>

          {/* Top arc: left to right clockwise over the top */}
          <path id="emblem-top-arc" d="M 22, 100 A 78 78 0 0 1 178, 100" fill="none" />

          {/* Bottom arc: left to right counter-clockwise along the bottom */}
          <path id="emblem-bottom-arc" d="M 17, 100 A 83 83 0 0 0 183, 100" fill="none" />
        </defs>

        {/* Outer White Disc with Border & Shadow */}
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="#ffffff"
          stroke="#0a2558"
          strokeWidth="2.5"
          filter="url(#badge-outer-shadow)"
        />

        {/* Outer Subtle Inset Ring */}
        <circle cx="100" cy="100" r="92.5" fill="none" stroke="#e2e8f0" strokeWidth="0.75" />

        {/* Inner Crisp White Disc for Logo */}
        <circle cx="100" cy="100" r="62" fill="#ffffff" stroke="#0a2558" strokeWidth="2" />

        {/* Inner Subtle Ring Accent */}
        <circle cx="100" cy="100" r="59.5" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />

        {/* Decorative Side Separator Dots */}
        <circle cx="19" cy="100" r="2.2" fill="#0a2558" />
        <circle cx="181" cy="100" r="2.2" fill="#0a2558" />

        {/* Top Curved Text: SRI VAARI */}
        <text
          fontFamily="'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
          fontWeight="900"
          fontSize="19"
          fill="#0a2558"
          letterSpacing="2.5px"
        >
          <textPath href="#emblem-top-arc" startOffset="50%" textAnchor="middle">
            SRI VAARI
          </textPath>
        </text>

        {/* Bottom Curved Text: EDUCATIONAL GROUPS */}
        <text
          fontFamily="'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
          fontWeight="900"
          fontSize="13"
          fill="#0a2558"
          letterSpacing="1.5px"
        >
          <textPath href="#emblem-bottom-arc" startOffset="50%" textAnchor="middle">
            EDUCATIONAL GROUPS
          </textPath>
        </text>
      </svg>

      {/* Center User Logo (Rendered crisp white inside the blue disc) */}
      <img
        src="/logo.png"
        alt="Sri Vaari Logo"
        className="sri-vaari-emblem__logo"
        width="60"
        height="60"
        loading="eager"
      />
    </div>
  )
}

export default SriVaariEmblem
