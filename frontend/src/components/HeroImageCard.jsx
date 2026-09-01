import { Link } from 'react-router-dom'
import { scrollToContact } from '../utils/scrollToContact'

function HeroImageCard({ onContactClick }) {
  const handleContact = (e) => {
    if (onContactClick) {
      onContactClick(e)
      return
    }
    scrollToContact(e)
  }

  return (
    <div className="hero-image-card">
      {/* SVG ClipPaths: Mobile and Extended Desktop (with extended image near logo & button curves) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          {/* Mobile ClipPath */}
          <clipPath id="hero-organic-clip-mobile" clipPathUnits="objectBoundingBox">
            <path d="M 0.22,0
                     L 0.90,0
                     C 0.96,0 1,0.04 1,0.10
                     L 1,0.845
                     C 1,0.86 0.97,0.87 0.94,0.87
                     L 0.74,0.87
                     C 0.70,0.87 0.68,0.90 0.68,0.93
                     L 0.68,0.96
                     C 0.68,0.988 0.66,1 0.63,1
                     L 0.10,1
                     C 0.04,1 0,0.96 0,0.90
                     L 0,0.20
                     C 0,0.165 0.03,0.155 0.07,0.155
                     L 0.15,0.155
                     C 0.19,0.155 0.205,0.115 0.205,0.075
                     L 0.205,0.045
                     C 0.205,0.01 0.21,0 0.22,0
                     Z" />
          </clipPath>

          {/* Desktop ClipPath (Extended Image around Curves + Fully Visible Logo) */}
          <clipPath id="hero-organic-clip-desktop" clipPathUnits="objectBoundingBox">
            <path d="M 0.18,0
                     L 0.92,0
                     C 0.97,0 1,0.03 1,0.08
                     L 1,0.885
                     C 1,0.895 0.98,0.905 0.95,0.905
                     L 0.80,0.905
                     C 0.77,0.905 0.75,0.93 0.75,0.95
                     L 0.75,0.97
                     C 0.75,0.99 0.73,1 0.70,1
                     L 0.08,1
                     C 0.03,1 0,0.97 0,0.92
                     L 0,0.17
                     C 0,0.14 0.02,0.125 0.06,0.125
                     L 0.12,0.125
                     C 0.155,0.125 0.165,0.09 0.165,0.055
                     L 0.165,0.035
                     C 0.165,0.01 0.17,0 0.18,0
                     Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Top-Left Notch (Logo) */}
      <div className="hero-image-card__notch hero-image-card__notch--tl">
        <img
          src="/logo.png"
          alt="Sri Vaari Logo"
          className="hero-image-card__logo"
        />
      </div>

      {/* Bottom-Right Notch (Contact Us Button) */}
      <div className="hero-image-card__notch hero-image-card__notch--br">
        <button
          type="button"
          className="hero-image-card__notch-btn"
          onClick={handleContact}
          aria-label="Contact Us"
        >
          <span>Contact Us</span>
        </button>
      </div>

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
        </div>
      </div>
    </div>
  )
}

export default HeroImageCard
