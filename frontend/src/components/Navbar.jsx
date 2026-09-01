import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  // Track scroll position on mobile for Home page
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      setIsScrolled(scrollY > 80)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  // Listen to mobile menu toggle events & escape key
  useEffect(() => {
    const handleOpenMenu = () => setIsOpen(true)
    const handleToggleMenu = () => setIsOpen((prev) => !prev)
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('open-mobile-menu', handleOpenMenu)
    window.addEventListener('toggle-mobile-menu', handleToggleMenu)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('open-mobile-menu', handleOpenMenu)
      window.removeEventListener('toggle-mobile-menu', handleToggleMenu)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Lock/unlock body scroll safely when mobile menu is open/closed
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen])

  return (
    <>
      <header
        className={`site-header ${isHomePage ? 'site-header--home' : 'site-header--other'} ${
          isScrolled ? 'site-header--scrolled' : ''
        }`}
      >
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
      </header>

      {/* Mobile Drawer rendered directly to document.body via Portal */}
      {typeof document !== 'undefined' && createPortal(
        <>
          {isOpen && (
            <div
              className="mobile-drawer-backdrop"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
          )}

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
        </>,
        document.body
      )}
    </>
  )
}

export default Navbar
