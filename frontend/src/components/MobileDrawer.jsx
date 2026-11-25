import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'
import Logo from './Logo'

function MobileDrawer({ isOpen, onClose }) {
  const { openEnquiry } = useEnquiry()
  const [mobileAccordion, setMobileAccordion] = useState(null)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  // Close accordion when drawer closes
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

          {/* Navigation Links */}
          <nav className="mobile-drawer__nav" aria-label="Mobile menu links">
            {/* 1. HOME */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `mobile-drawer__link ${isActive && isHomePage ? 'mobile-drawer__link--active' : ''}`
              }
              onClick={() => {
                onClose()
                if (isHomePage) window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <span>HOME</span>
            </NavLink>

            {/* 2. COLLEGES */}
            <NavLink
              to="/distance-education"
              className={({ isActive }) =>
                `mobile-drawer__link ${isActive || location.pathname.startsWith('/distance-education')
                  ? 'mobile-drawer__link--active'
                  : ''
                }`
              }
              onClick={onClose}
            >
              <span>COLLEGES</span>
            </NavLink>

            {/* 3. COURSES FOR 10TH, 11TH & 12TH */}
            <NavLink
              to="/school-courses"
              className={({ isActive }) =>
                `mobile-drawer__link ${isActive ||
                  location.pathname.startsWith('/school-courses') ||
                  location.pathname.startsWith('/courses-for-10th-11th-12th')
                  ? 'mobile-drawer__link--active'
                  : ''
                }`
              }
              onClick={onClose}
            >
              <span>COURSES FOR 10TH, 11TH &amp; 12TH</span>
            </NavLink>

            {/* 4. ABOUT */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `mobile-drawer__link ${isActive ? 'mobile-drawer__link--active' : ''}`
              }
              onClick={onClose}
            >
              <span>ABOUT</span>
            </NavLink>

            {/* 5. CONTACT */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `mobile-drawer__link ${isActive ? 'mobile-drawer__link--active' : ''}`
              }
              onClick={onClose}
            >
              <span>CONTACT</span>
            </NavLink>

            {/* 6. TERMS & CONDITIONS */}
            <NavLink
              to="/terms-and-conditions"
              className={({ isActive }) =>
                `mobile-drawer__link ${isActive ? 'mobile-drawer__link--active' : ''}`
              }
              onClick={onClose}
            >
              <span>TERMS &amp; CONDITIONS</span>
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
