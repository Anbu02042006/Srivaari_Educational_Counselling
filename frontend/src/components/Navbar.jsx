import { ArrowRight, ChevronDown, Menu } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'
import {
  abroadStudiesMenu,
  domesticStudiesMenu,
  aboutMenu,
} from '../data/navigationData'
import { scrollToContact } from '../utils/scrollToContact'
import Logo from './Logo'
import MobileDrawer from './MobileDrawer'

function Navbar() {
  const { openEnquiry } = useEnquiry()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null) // 'domestic' | 'abroad' | 'about' | null
  const [mobileAccordion, setMobileAccordion] = useState(null) // 'domestic' | 'abroad' | 'about' | null
  const [isScrolled, setIsScrolled] = useState(false)

  const dropdownTimeoutRef = useRef(null)
  const navContainerRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
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
        className={`site-header ${
          isScrolled ? 'site-header--scrolled' : ''
        } ${
          isHiddenOnHome ? 'site-header--home-hidden' : ''
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

            {/* 2. DOMESTIC STUDIES */}
            <div
              className={`nav__dropdown-wrapper ${
                activeDropdown === 'domestic' ? 'nav__dropdown-wrapper--open' : ''
              }`}
              onMouseEnter={() => handleMouseEnter('domestic')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/domestic-studies"
                className={({ isActive }) =>
                  `nav__menu-item nav__menu-item--has-arrow ${
                    isActive || activeDropdown === 'domestic' || location.pathname.startsWith('/domestic-studies')
                      ? 'nav__menu-item--active'
                      : ''
                  }`
                }
                onClick={() => setActiveDropdown(null)}
              >
                <span>DOMESTIC STUDIES</span>
                <ChevronDown size={14} className="nav__chevron-icon" aria-hidden="true" />
              </NavLink>

              {/* 3-Column Domestic Studies Mega Menu */}
              {activeDropdown === 'domestic' && (
                <div
                  className="mega-menu mega-menu--domestic"
                  role="menu"
                  aria-label="Domestic Studies courses"
                >
                  <div className="mega-menu__grid">
                    {domesticStudiesMenu.map((column, colIdx) => (
                      <div key={colIdx} className="mega-menu__column">
                        <div className="mega-menu__column-title">{column.title}</div>
                        <ul className="mega-menu__list">
                          {column.items.map((item) => (
                            <li key={item.name} className="mega-menu__list-item">
                              <Link
                                to={item.path}
                                className="mega-menu__link"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <img
                                  src={item.icon}
                                  alt=""
                                  className="mega-menu__icon-img"
                                  loading="lazy"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                  }}
                                />
                                <span className="mega-menu__item-name">{item.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. ABROAD STUDIES */}
            <div
              className={`nav__dropdown-wrapper ${
                activeDropdown === 'abroad' ? 'nav__dropdown-wrapper--open' : ''
              }`}
              onMouseEnter={() => handleMouseEnter('abroad')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/abroad-studies"
                className={({ isActive }) =>
                  `nav__menu-item nav__menu-item--has-arrow ${
                    isActive || activeDropdown === 'abroad' || location.pathname.startsWith('/abroad-studies')
                      ? 'nav__menu-item--active'
                      : ''
                  }`
                }
                onClick={() => setActiveDropdown(null)}
              >
                <span>ABROAD STUDIES</span>
                <ChevronDown size={14} className="nav__chevron-icon" aria-hidden="true" />
              </NavLink>

              {/* 2-Column Abroad Studies Mega Menu */}
              {activeDropdown === 'abroad' && (
                <div
                  className="mega-menu mega-menu--abroad"
                  role="menu"
                  aria-label="Abroad Studies destinations"
                >
                  <div className="mega-menu__grid">
                    {abroadStudiesMenu.map((column, colIdx) => (
                      <div key={colIdx} className="mega-menu__column">
                        <div className="mega-menu__column-title">{column.title}</div>
                        <ul className="mega-menu__list">
                          {column.items.map((item) => (
                            <li key={item.name} className="mega-menu__list-item">
                              <Link
                                to={item.path}
                                className="mega-menu__link"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <img
                                  src={item.flag}
                                  alt=""
                                  className="mega-menu__flag-img"
                                  loading="lazy"
                                  onError={(e) => {
                                    if (item.name === 'TAJIKISTAN' && !e.currentTarget.dataset.fallback) {
                                      e.currentTarget.dataset.fallback = 'true'
                                      e.currentTarget.src = 'https://flagcdn.com/w320/tj.png'
                                    } else {
                                      e.currentTarget.style.display = 'none'
                                    }
                                  }}
                                />
                                <span className="mega-menu__item-name">{item.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. COLLEGE & UNIVERSITIES */}
            <NavLink
              to="/colleges"
              className={({ isActive }) =>
                `nav__menu-item ${isActive ? 'nav__menu-item--active' : ''}`
              }
              onClick={() => setActiveDropdown(null)}
            >
              COLLEGE & UNIVERSITIES
            </NavLink>

            {/* 5. ABOUT (Dropdown with Gallery) */}
            <div
              className={`nav__dropdown-wrapper nav__dropdown-wrapper--about ${
                activeDropdown === 'about' ? 'nav__dropdown-wrapper--open' : ''
              }`}
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav__menu-item nav__menu-item--has-arrow ${
                    isActive ? 'nav__menu-item--active' : ''
                  }`
                }
                onClick={() => setActiveDropdown(null)}
              >
                <span>ABOUT</span>
                <ChevronDown size={14} className="nav__chevron-icon" aria-hidden="true" />
              </NavLink>

              {/* About Dropdown Menu */}
              {activeDropdown === 'about' && (
                <div
                  className="nav__simple-dropdown"
                  role="menu"
                  aria-label="About menu"
                >
                  {aboutMenu.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`nav__simple-dropdown-link ${
                        location.pathname === item.path ? 'nav__simple-dropdown-link--active' : ''
                      }`}
                      onClick={() => setActiveDropdown(null)}
                      role="menuitem"
                    >
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 6. CONTACT */}
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
      </header>

      {/* Mobile Slide-Over Drawer Navigation */}
      <MobileDrawer isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  )
}

export default Navbar
