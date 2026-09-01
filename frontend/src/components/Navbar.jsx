import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { scrollToContact } from '../utils/scrollToContact'
import Logo from './Logo'

const navRoutes = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/', label: 'Contact', isContact: true },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header className="site-header">
      <div className="navbar container" aria-label="Primary navigation">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Desktop Navigation Links */}
        <nav className="nav__desktop-links" aria-label="Desktop menu">
          {navRoutes.map(({ to, label, end, isContact }) => (
            <NavLink
              key={label}
              to={to}
              end={end}
              onClick={isContact ? scrollToContact : undefined}
              className={({ isActive }) =>
                `nav__link ${isActive && !isContact ? 'nav__link--active' : ''}`.trim()
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Enquire CTA Action (Desktop Only) */}
        <div className="nav__actions nav__actions--desktop">
          <Link
            className="button button--primary nav__enquire"
            to="/"
            onClick={scrollToContact}
          >
            <span>Enquire Now</span>
          </Link>
        </div>

        {/* Right: Hamburger Menu Toggle Button (Mobile Only) */}
        <button
          type="button"
          className="nav__hamburger-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation Menu Backdrop */}
      {isOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Slide-over Panel (Half Screen) */}
      <div
        className={`mobile-drawer ${isOpen ? 'mobile-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="mobile-drawer__content">
          <div className="mobile-drawer__header">
            <Logo onNavigate={() => setIsOpen(false)} />
            <button
              type="button"
              className="mobile-drawer__close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <nav className="mobile-drawer__nav" aria-label="Mobile menu links">
            {navRoutes.map(({ to, label, end, isContact }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                onClick={(e) => {
                  setIsOpen(false)
                  if (isContact) {
                    scrollToContact(e)
                  }
                }}
                className={({ isActive }) =>
                  `mobile-drawer__link ${isActive && !isContact ? 'mobile-drawer__link--active' : ''}`.trim()
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mobile-drawer__footer">
            <Link
              to="/"
              className="button button--primary mobile-drawer__cta"
              onClick={(e) => {
                setIsOpen(false)
                scrollToContact(e)
              }}
            >
              <span>Enquire Now</span>
            </Link>
            <p className="mobile-drawer__helpline">
              Call <strong>+91 94432 77764</strong>
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
