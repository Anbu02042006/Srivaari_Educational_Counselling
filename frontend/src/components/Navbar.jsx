import { Menu, X, Home, Building, Compass, Image, Info, PhoneCall } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { scrollToContact } from '../utils/scrollToContact'
import Logo from './Logo'

const navRoutes = [
  { to: '/', label: 'Home', icon: Home, isHome: true },
  { to: '/colleges', label: 'Colleges', icon: Building },
  { to: '/services', label: 'Services', icon: Compass },
  { to: '/gallery', label: 'Gallery', icon: Image },
  { to: '/about', label: 'About', icon: Info },
  { to: '/', label: 'Contact', icon: PhoneCall, isContact: true },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContactInView, setIsContactInView] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'

  // Track scroll position for header visibility and contact section highlight
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      setIsScrolled(scrollY > 80)

      if (isHomePage) {
        const contactEl = document.getElementById('contact') || document.getElementById('enquire')
        if (contactEl) {
          const rect = contactEl.getBoundingClientRect()
          // Active when contact section top is within viewport
          const inView = rect.top <= window.innerHeight * 0.6 && rect.bottom >= 100
          setIsContactInView(inView)
        } else {
          setIsContactInView(false)
        }
      } else {
        setIsContactInView(false)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage, location.pathname])

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

  const handleLinkClick = (route, e) => {
    if (route.isHome) {
      if (isHomePage) {
        if (e && typeof e.preventDefault === 'function') {
          e.preventDefault()
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else if (route.isContact) {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault()
      }
      if (isHomePage) {
        const contactEl = document.getElementById('contact') || document.getElementById('enquire')
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        sessionStorage.setItem('scroll_to_contact', '1')
        navigate('/')
      }
    }
  }

  const getLinkClass = (route, isActive) => {
    if (route.isHome) {
      return `nav__link ${isHomePage && !isContactInView ? 'nav__link--active' : ''}`.trim()
    }
    if (route.isContact) {
      return `nav__link ${isHomePage && isContactInView ? 'nav__link--active' : ''}`.trim()
    }
    return `nav__link ${isActive ? 'nav__link--active' : ''}`.trim()
  }

  const getMobileLinkClass = (route, isActive) => {
    if (route.isHome) {
      return `mobile-drawer__link ${isHomePage && !isContactInView ? 'mobile-drawer__link--active' : ''}`.trim()
    }
    if (route.isContact) {
      return `mobile-drawer__link ${isHomePage && isContactInView ? 'mobile-drawer__link--active' : ''}`.trim()
    }
    return `mobile-drawer__link ${isActive ? 'mobile-drawer__link--active' : ''}`.trim()
  }

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
            {navRoutes.map((route) => (
              <NavLink
                key={route.label}
                to={route.to}
                onClick={(e) => handleLinkClick(route, e)}
                className={({ isActive }) => getLinkClass(route, isActive)}
              >
                {route.label}
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
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer Navigation rendered via Portal to document.body */}
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
                {navRoutes.map((route) => {
                  const Icon = route.icon
                  return (
                    <NavLink
                      key={route.label}
                      to={route.to}
                      onClick={(e) => {
                        setIsOpen(false)
                        handleLinkClick(route, e)
                      }}
                      className={({ isActive }) => getMobileLinkClass(route, isActive)}
                    >
                      {Icon && <Icon size={18} aria-hidden="true" style={{ marginRight: '10px', color: 'var(--color-primary-500)' }} />}
                      <span>{route.label}</span>
                    </NavLink>
                  )
                })}
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
