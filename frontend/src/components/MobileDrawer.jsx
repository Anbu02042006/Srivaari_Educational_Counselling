import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, X } from 'lucide-react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'
import {
  abroadStudiesMenu,
  domesticStudiesMenu,
  aboutMenu,
} from '../data/navigationData'
import { scrollToContact } from '../utils/scrollToContact'
import Logo from './Logo'

function MobileDrawer({ isOpen, onClose }) {
  const { openEnquiry } = useEnquiry()
  const [mobileAccordion, setMobileAccordion] = useState(null) // 'domestic' | 'abroad' | 'about' | null
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'

  // Close accordion whenever drawer closes or page changes
  useEffect(() => {
    if (!isOpen) {
      setMobileAccordion(null)
    }
  }, [isOpen, location.pathname])

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent background scrolling when open
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

  const toggleAccordion = (name) => {
    setMobileAccordion((prev) => (prev === name ? null : name))
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <>
      {isOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={onClose}
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
          {/* Header with Sri Vaari Logo and Close Button */}
          <div className="mobile-drawer__header">
            <Logo onNavigate={onClose} />
            <button
              type="button"
              className="mobile-drawer__close-btn"
              onClick={onClose}
              aria-label="Close menu"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links with Newly Implemented Nav Buttons */}
          <nav className="mobile-drawer__nav" aria-label="Mobile menu links">
            {/* 1. HOME */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `mobile-drawer__link ${isActive ? 'mobile-drawer__link--active' : ''}`
              }
              onClick={() => {
                onClose()
                if (isHomePage) window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <span>HOME</span>
            </NavLink>

            {/* 2. DOMESTIC STUDIES (Has extra filter options -> + symbol) */}
            <div className="mobile-drawer__accordion-group mobile-drawer__accordion-group--split">
              <div className="mobile-drawer__accordion-header-row">
                <NavLink
                  to="/domestic-studies"
                  className={({ isActive }) =>
                    `mobile-drawer__link mobile-drawer__link--split ${
                      isActive || location.pathname.startsWith('/domestic-studies') ? 'mobile-drawer__link--active' : ''
                    }`
                  }
                  onClick={onClose}
                >
                  <span>DOMESTIC STUDIES</span>
                </NavLink>
                <button
                  type="button"
                  className="mobile-drawer__accordion-toggle-btn"
                  onClick={() => toggleAccordion('domestic')}
                  aria-expanded={mobileAccordion === 'domestic'}
                  aria-label="Toggle Domestic Studies courses"
                >
                  <span
                    className={`mobile-drawer__accordion-toggle-symbol ${
                      mobileAccordion === 'domestic' ? 'mobile-drawer__accordion-toggle-symbol--active' : ''
                    }`}
                    aria-hidden="true"
                  >
                    {mobileAccordion === 'domestic' ? '−' : '+'}
                  </span>
                </button>
              </div>

              {mobileAccordion === 'domestic' && (
                <div className="mobile-drawer__accordion-body">
                  {domesticStudiesMenu.map((group, idx) => (
                    <div key={idx} className="mobile-drawer__accordion-subgroup">
                      <div className="mobile-drawer__subgroup-title">{group.title}</div>
                      {group.items.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="mobile-drawer__subitem"
                          onClick={onClose}
                        >
                          <img
                            src={item.icon}
                            alt=""
                            className="mega-menu__icon-img"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. ABROAD STUDIES (Has extra filter options -> + symbol) */}
            <div className="mobile-drawer__accordion-group mobile-drawer__accordion-group--split">
              <div className="mobile-drawer__accordion-header-row">
                <NavLink
                  to="/abroad-studies"
                  className={({ isActive }) =>
                    `mobile-drawer__link mobile-drawer__link--split ${
                      isActive || location.pathname.startsWith('/abroad-studies') ? 'mobile-drawer__link--active' : ''
                    }`
                  }
                  onClick={onClose}
                >
                  <span>ABROAD STUDIES</span>
                </NavLink>
                <button
                  type="button"
                  className="mobile-drawer__accordion-toggle-btn"
                  onClick={() => toggleAccordion('abroad')}
                  aria-expanded={mobileAccordion === 'abroad'}
                  aria-label="Toggle Abroad Studies destinations"
                >
                  <span
                    className={`mobile-drawer__accordion-toggle-symbol ${
                      mobileAccordion === 'abroad' ? 'mobile-drawer__accordion-toggle-symbol--active' : ''
                    }`}
                    aria-hidden="true"
                  >
                    {mobileAccordion === 'abroad' ? '−' : '+'}
                  </span>
                </button>
              </div>

              {mobileAccordion === 'abroad' && (
                <div className="mobile-drawer__accordion-body">
                  {abroadStudiesMenu.map((group, idx) => (
                    <div key={idx} className="mobile-drawer__accordion-subgroup">
                      <div className="mobile-drawer__subgroup-title">{group.title}</div>
                      {group.items.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="mobile-drawer__subitem"
                          onClick={onClose}
                        >
                          <img
                            src={item.flag}
                            alt=""
                            className="mega-menu__flag-img"
                            onError={(e) => {
                              if (item.name === 'TAJIKISTAN' && !e.currentTarget.dataset.fallback) {
                                e.currentTarget.dataset.fallback = 'true'
                                e.currentTarget.src = 'https://flagcdn.com/w320/tj.png'
                              } else {
                                e.currentTarget.style.display = 'none'
                              }
                            }}
                          />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. COLLEGE & UNIVERSITIES */}
            <NavLink
              to="/colleges"
              className={({ isActive }) =>
                `mobile-drawer__link ${isActive ? 'mobile-drawer__link--active' : ''}`
              }
              onClick={onClose}
            >
              <span>COLLEGE & UNIVERSITIES</span>
            </NavLink>

            {/* 5. ABOUT (Has Gallery navigation -> + symbol) */}
            <div className="mobile-drawer__accordion-group mobile-drawer__accordion-group--split">
              <div className="mobile-drawer__accordion-header-row">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `mobile-drawer__link mobile-drawer__link--split ${
                      isActive ? 'mobile-drawer__link--active' : ''
                    }`
                  }
                  onClick={onClose}
                >
                  <span>ABOUT</span>
                </NavLink>
                <button
                  type="button"
                  className="mobile-drawer__accordion-toggle-btn"
                  onClick={() => toggleAccordion('about')}
                  aria-expanded={mobileAccordion === 'about'}
                  aria-label="Toggle Gallery navigation"
                >
                  <span
                    className={`mobile-drawer__accordion-toggle-symbol ${
                      mobileAccordion === 'about' ? 'mobile-drawer__accordion-toggle-symbol--active' : ''
                    }`}
                    aria-hidden="true"
                  >
                    {mobileAccordion === 'about' ? '−' : '+'}
                  </span>
                </button>
              </div>

              {mobileAccordion === 'about' && (
                <div className="mobile-drawer__accordion-body">
                  <div className="mobile-drawer__accordion-subgroup">
                    {aboutMenu.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="mobile-drawer__subitem mobile-drawer__subitem--text-only"
                        onClick={onClose}
                      >
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 6. CONTACT */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `mobile-drawer__link ${isActive ? 'mobile-drawer__link--active' : ''}`
              }
              onClick={onClose}
            >
              <span>CONTACT</span>
            </NavLink>
          </nav>

          {/* Drawer Footer CTA */}
          <div className="mobile-drawer__footer" style={{ padding: '1.25rem 1.5rem', marginTop: 'auto' }}>
            <button
              type="button"
              className="button button--primary nav__enquiry-btn blink-subtle"
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => {
                onClose()
                openEnquiry()
              }}
            >
              ENQUIRY NOW
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}

export default MobileDrawer
