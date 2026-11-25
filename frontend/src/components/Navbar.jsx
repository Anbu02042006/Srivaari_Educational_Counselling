import { BookOpen, GraduationCap, Menu, Users } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'
import Logo from './Logo'
import MobileDrawer from './MobileDrawer'

function Navbar() {
  const { openEnquiry } = useEnquiry()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null) // 'domestic' | 'abroad' | 'colleges' | null
  const [isScrolled, setIsScrolled] = useState(false)

  const dropdownTimeoutRef = useRef(null)
  const navContainerRef = useRef(null)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      setIsScrolled(scrollY > 80)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on outside click or escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setIsMobileOpen(false)
      }
    }

    const handleClickOutside = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null)
    setIsMobileOpen(false)
  }, [location.pathname, location.search, location.hash])

  // Body scroll locking when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
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
  }, [isMobileOpen])

  // Smooth hover handlers with small grace period to prevent flickering
  const handleMouseEnter = (menuKey) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(menuKey)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 180)
  }

  const toggleDropdown = (menuKey, e) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveDropdown((prev) => (prev === menuKey ? null : menuKey))
  }

  const isHiddenOnHome = isHomePage && !isScrolled

  return (
    <>
      <header
        className={`site-header ${isScrolled ? 'site-header--scrolled' : ''
          } ${isHiddenOnHome ? 'site-header--home-hidden' : ''
          }`.trim()}
      >
        <div className="navbar container" ref={navContainerRef} aria-label="Primary navigation">
          {/* Left: Brand Logo */}
          <Logo isDark={false} onNavigate={() => setActiveDropdown(null)} />

          {/* Center: Desktop Navigation Bar Links */}
          <nav className="nav__desktop-menu" aria-label="Desktop menu">
            {/* 1. HOME */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav__menu-item ${isActive ? 'nav__menu-item--active' : ''}`
              }
              onClick={() => {
                setActiveDropdown(null)
                if (isHomePage) window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              HOME
            </NavLink>

            {/* 2. COLLEGES */}
            <NavLink
              to="/distance-education"
              className={({ isActive }) =>
                `nav__menu-item ${isActive || location.pathname.startsWith('/distance-education')
                  ? 'nav__menu-item--active'
                  : ''
                }`
              }
              onClick={() => setActiveDropdown(null)}
            >
              <span>COLLEGES</span>
            </NavLink>

            {/* 3. COURSES FOR 10TH, 11TH & 12TH */}
            <NavLink
              to="/school-courses"
              className={({ isActive }) =>
                `nav__menu-item ${isActive ||
                  location.pathname.startsWith('/school-courses') ||
                  location.pathname.startsWith('/courses-for-10th-11th-12th')
                  ? 'nav__menu-item--active'
                  : ''
                }`
              }
              onClick={() => setActiveDropdown(null)}
            >
              <span>COURSES FOR 10TH, 11TH &amp; 12TH</span>
            </NavLink>

            {/* 4. ABOUT */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav__menu-item ${isActive ? 'nav__menu-item--active' : ''}`
              }
              onClick={() => setActiveDropdown(null)}
            >
              ABOUT
            </NavLink>

            {/* 5. CONTACT */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav__menu-item ${isActive ? 'nav__menu-item--active' : ''}`
              }
              onClick={() => setActiveDropdown(null)}
            >
              CONTACT
            </NavLink>
          </nav>

          {/* Right: Enquiry Now Button (Desktop) */}
          <div className="nav__actions nav__actions--desktop">
            <button
              type="button"
              className="button button--primary nav__enquiry-btn blink-subtle"
              onClick={() => openEnquiry()}
            >
              ENQUIRY NOW
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="nav__hamburger-btn"
            onClick={() => setIsMobileOpen(true)}
            aria-expanded={isMobileOpen}
            aria-label="Open navigation menu"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Quick Sub-Navbar (Distance | 10th-12th | About) */}
        <nav className="nav__mobile-subbar" aria-label="Quick category navigation">
          <div className="nav__mobile-subbar-container">
            <NavLink
              to="/distance-education"
              className={({ isActive }) =>
                `nav__mobile-subbar-link ${isActive || location.pathname.startsWith('/distance-education')
                  ? 'nav__mobile-subbar-link--active'
                  : ''
                }`
              }
              onClick={() => setActiveDropdown(null)}
            >
              <GraduationCap size={15} className="nav__mobile-subbar-icon" aria-hidden="true" />
              <span>Colleges</span>
            </NavLink>

            <NavLink
              to="/school-courses"
              className={({ isActive }) =>
                `nav__mobile-subbar-link ${isActive ||
                  location.pathname.startsWith('/school-courses') ||
                  location.pathname.startsWith('/courses-for-10th-11th-12th')
                  ? 'nav__mobile-subbar-link--active'
                  : ''
                }`
              }
              onClick={() => setActiveDropdown(null)}
            >
              <BookOpen size={15} className="nav__mobile-subbar-icon" aria-hidden="true" />
              <span>10th–12th</span>
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav__mobile-subbar-link ${isActive || location.pathname.startsWith('/about')
                  ? 'nav__mobile-subbar-link--active'
                  : ''
                }`
              }
              onClick={() => setActiveDropdown(null)}
            >
              <Users size={15} className="nav__mobile-subbar-icon" aria-hidden="true" />
              <span>About</span>
            </NavLink>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-Over Drawer Navigation */}
      <MobileDrawer isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  )
}

export default Navbar
