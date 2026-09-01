import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function HeroImageCard({ onEnquire, onContactClick }) {
  const handleContact = (e) => {
    if (onContactClick) {
      onContactClick(e)
      return
    }
    const target = document.getElementById('contact') || document.getElementById('enquire')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (onEnquire) {
      onEnquire(e)
    }
  }

  return (
    <div className="hero-image-card">
      {/* SVG ClipPath for smooth organic curvy notches (Top-Left Logo + Bottom-Right Contact Us) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <clipPath id="hero-organic-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.24,0
                     L 0.92,0
                     C 0.97,0 1,0.03 1,0.08
                     L 1,0.845
                     C 1,0.86 0.97,0.87 0.94,0.87
                     L 0.67,0.87
                     C 0.63,0.87 0.61,0.90 0.61,0.93
                     L 0.61,0.96
                     C 0.61,0.988 0.58,1 0.54,1
                     L 0.08,1
                     C 0.03,1 0,0.97 0,0.92
                     L 0,0.205
                     C 0,0.18 0.02,0.164 0.06,0.164
                     L 0.16,0.164
                     C 0.20,0.164 0.22,0.135 0.22,0.09
                     L 0.22,0.048
                     C 0.22,0.012 0.23,0 0.24,0
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
