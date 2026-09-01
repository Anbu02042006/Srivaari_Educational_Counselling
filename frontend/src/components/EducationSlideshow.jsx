import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function EducationSlideshow({ onEnquire }) {
  return (
    <div
      className="education-slideshow"
      aria-label="Education and counselling card"
    >
      {/* Responsive SVG Notch ClipPath */}
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="hero-notched-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.27,0 L 0.92,0 C 0.965,0 1.00,0.035 1.00,0.08 L 1.00,0.82 C 1.00,0.855 0.97,0.875 0.93,0.875 L 0.59,0.875 C 0.555,0.875 0.535,0.93 0.535,1.00 L 0.08,1.00 C 0.035,1.00 0.00,0.965 0.00,0.92 L 0.00,0.22 C 0.00,0.185 0.02,0.168 0.08,0.168 L 0.18,0.168 C 0.235,0.168 0.27,0.09 0.27,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="education-slideshow__viewport">
        {/* Main Image */}
        <div className="education-slideshow__slide">
          <img
            src="/images/counselling-partnership.jpg"
            alt="Education counselling partnership and mentorship handshake"
            loading="eager"
            className="education-slideshow__img"
            onError={(e) => {
              const fallback = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80'
              if (e.target.src !== fallback) {
                e.target.src = fallback
              }
            }}
          />
        </div>

        {/* Top-Left Notch (White Cut-Out) with Logo */}
        <div className="education-slideshow__notch education-slideshow__notch--tl">
          <img
            src="/logo.png"
            alt="Sri Vaari"
            className="education-slideshow__notch-logo"
            width="44"
            height="44"
          />
        </div>

        {/* Bottom-Right Notch (White Cut-Out) with Enquire Button */}
        <div className="education-slideshow__notch education-slideshow__notch--br">
          {onEnquire ? (
            <button
              type="button"
              className="education-slideshow__notch-btn"
              onClick={onEnquire}
              aria-label="Enquire now"
            >
              <span>Enquire Now</span>
              <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
            </button>
          ) : (
            <Link
              to="/contact"
              className="education-slideshow__notch-btn"
              aria-label="Enquire now"
            >
              <span>Enquire Now</span>
              <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default EducationSlideshow
