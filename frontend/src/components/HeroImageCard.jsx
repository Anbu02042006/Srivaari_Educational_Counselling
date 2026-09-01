import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X, Home, Compass, Image, Info, PhoneCall } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { scrollToContact } from '../utils/scrollToContact'
import Logo from './Logo'

const navLinks = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/services', label: 'Services', icon: Compass },
  { to: '/gallery', label: 'Gallery', icon: Image },
  { to: '/about', label: 'About Us', icon: Info },
  { to: '/', label: 'Contact', icon: PhoneCall, isContact: true },
]

function HeroImageCard({ onContactClick, onEnquire }) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  // Listen to open-mobile-menu / toggle-mobile-menu events
  useEffect(() => {
    const handleOpen = () => setIsNavOpen(true)
    const handleToggle = () => setIsNavOpen((prev) => !prev)
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsNavOpen(false)
    }

    window.addEventListener('open-mobile-menu', handleOpen)
    window.addEventListener('toggle-mobile-menu', handleToggle)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('open-mobile-menu', handleOpen)
      window.removeEventListener('toggle-mobile-menu', handleToggle)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Safely lock/unlock body scroll when mobile navigation card is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isNavOpen])

  const handleContact = (e) => {
    if (onContactClick) {
      onContactClick(e)
      return
    }
    scrollToContact(e)
  }

  const handleMenuToggle = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault()
      e.stopPropagation()
    }
    setIsNavOpen((prev) => !prev)
  }

  const handleEnquireClick = (e) => {
    setIsNavOpen(false)
    if (onEnquire) {
      onEnquire()
    } else {
      scrollToContact(e)
    }
  }

  return (
    <div className="hero-image-card">
      {/* SVG ClipPaths: Mobile and Extended Desktop */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          {/* Mobile ClipPath (Proportionally calibrated for all mobile screens from 320px to 480px) */}
          <clipPath id="hero-organic-clip-mobile" clipPathUnits="objectBoundingBox">
            <path d="M 0.22,0
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

      {/* Top-Right Hamburger Menu Button (Inside Hero Card - Mobile Only) */}
      <button
        type="button"
        className="hero-image-card__menu-btn"
        onClick={handleMenuToggle}
        aria-label={isNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isNavOpen}
      >
        {isNavOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

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

      {/* Dedicated Mobile Navigation Slide-Over Card / Modal rendered via Portal to document.body */}
      {typeof document !== 'undefined' && createPortal(
        <>
          {isNavOpen && (
            <div
              className="mobile-drawer-backdrop"
              onClick={() => setIsNavOpen(false)}
              aria-hidden="true"
            />
          )}

          <div
            className={`mobile-drawer ${isNavOpen ? 'mobile-drawer--open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="mobile-drawer__content">
              <div className="mobile-drawer__header">
                <Logo onNavigate={() => setIsNavOpen(false)} />
                <button
                  type="button"
                  className="mobile-drawer__close-btn"
                  onClick={() => setIsNavOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <nav className="mobile-drawer__nav" aria-label="Mobile menu links">
                {navLinks.map(({ to, label, end, icon: Icon, isContact }) => (
                  <NavLink
                    key={label}
                    to={to}
                    end={end}
                    onClick={(e) => {
                      setIsNavOpen(false)
                      if (isContact) {
                        scrollToContact(e)
                      }
                    }}
                    className={({ isActive }) =>
                      `mobile-drawer__link ${isActive && !isContact ? 'mobile-drawer__link--active' : ''}`.trim()
                    }
                  >
                    <Icon size={18} aria-hidden="true" style={{ marginRight: '10px', color: 'var(--color-primary-500)' }} />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="mobile-drawer__footer">
                <button
                  type="button"
                  className="button button--primary mobile-drawer__cta"
                  onClick={handleEnquireClick}
                >
                  <span>Enquire Now</span>
                </button>
                <p className="mobile-drawer__helpline">
                  Helpline: <strong>+91 94432 77764</strong>
                </p>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  )
}

export default HeroImageCard
