import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function HeroImageCard({ children, onEnquire }) {
  return (
    <div className="hero-image-card">
      {/* SVG ClipPath for smooth organic curvy notches */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <clipPath id="hero-organic-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.25,0
                     L 0.92,0
                     C 0.97,0 1,0.03 1,0.08
                     L 1,0.92
                     C 1,0.97 0.97,1 0.92,1
                     L 0.08,1
                     C 0.03,1 0,0.97 0,0.92
                     L 0,0.17
                     C 0,0.14 0.02,0.13 0.06,0.13
                     L 0.16,0.13
                     C 0.20,0.13 0.22,0.11 0.22,0.07
                     L 0.22,0.04
                     C 0.22,0.01 0.23,0 0.25,0
                     Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="hero-image-card__container">
        {/* Main Hero Photograph */}
        <div className="hero-image-card__image-wrapper">
          <img
            src="/images/counselling-partnership.jpg"
            alt="Education counselling partnership"
            className="hero-image-card__img"
            loading="eager"
            onError={(e) => {
              const fallback = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80'
              if (e.target.src !== fallback) {
                e.target.src = fallback
              }
            }}
          />
          <div className="hero-image-card__gradient-overlay" />
        </div>

        {/* Top-Left Notch (Logo) */}
        <div className="hero-image-card__notch hero-image-card__notch--tl">
          <img
            src="/logo.png"
            alt="Sri Vaari Logo"
            className="hero-image-card__logo"
          />
        </div>

        {/* Card Content Overlay */}
        {children}
      </div>
    </div>
  )
}

export default HeroImageCard
