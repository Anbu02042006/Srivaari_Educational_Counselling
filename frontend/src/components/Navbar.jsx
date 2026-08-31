import { ArrowRight, Menu, MessageCircle, Phone, PhoneCall, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { contactInfo } from '../data/contactInfo'
import Logo from './Logo'

const navRoutes = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setIsOpen(false)
  const toggleMenu = () => setIsOpen((prev) => !prev)

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Handle Escape key to close mobile menu & lock body scrolling
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <header className="site-header">
      <div className="navbar container" aria-label="Primary navigation">
        {/* Left: Logo */}
        <Logo onNavigate={closeMenu} />

        {/* Center: Desktop Navigation Links */}
        <nav className="nav__desktop-links" aria-label="Desktop menu">
          {navRoutes.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav__link ${isActive ? 'nav__link--active' : ''}`.trim()
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Desktop CTA & Mobile Hamburger */}
        <div className="nav__actions">
          <Link className="button button--primary nav__enquire" to="/contact">
            <span>Enquire Now</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <button
            className="nav__toggle"
            type="button"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Backdrop */}
      <div
        className={`mobile-nav-backdrop ${isOpen ? 'mobile-nav-backdrop--visible' : ''}`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      />

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation"
        className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="mobile-nav__container">
          <div className="mobile-nav__header">
            <Logo onNavigate={closeMenu} />
            <button
              className="mobile-nav__close-btn"
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mobile-nav__links" aria-label="Mobile menu">
            {navRoutes.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`.trim()
                }
              >
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mobile-nav__footer">
            <Link
              className="button button--primary mobile-nav__cta"
              to="/contact"
              onClick={closeMenu}
            >
              <PhoneCall size={17} aria-hidden="true" />
              <span>Enquire Now</span>
            </Link>

            <div className="mobile-nav__quick-actions">
              <a
                href={contactInfo.phoneHref}
                className="mobile-nav__quick-btn"
                aria-label="Call support desk"
              >
                <Phone size={15} aria-hidden="true" />
                <span>Call Us</span>
              </a>
              <a
                href={contactInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mobile-nav__quick-btn mobile-nav__quick-btn--whatsapp"
                aria-label="WhatsApp quick chat"
              >
                <MessageCircle size={15} aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
