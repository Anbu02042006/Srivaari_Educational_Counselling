import { ChevronDown, Globe, GraduationCap, Landmark, MapPin, Menu } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'
import {
  engineeringLocationTabs,
  medicalRegionTabs,
} from '../data/collegesData'
import {
  abroadStudiesMenu,
  collegesMenu,
  domesticStudiesMenu,
} from '../data/navigationData'
import { scrollToContact } from '../utils/scrollToContact'
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
                  `nav__menu-item ${
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
                  `nav__menu-item ${
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

              {/* 2-Column Abroad Studies Dropdown Card (4 | 3 split with divider) */}
              {activeDropdown === 'abroad' && (
                <div
                  className="mega-menu mega-menu--abroad"
                  role="menu"
                  aria-label="Abroad Studies destinations"
                >
                  <div className="mega-menu__column-title mega-menu__column-title--center">
                    TOP DESTINATIONS
                  </div>

                  <div className="mega-menu--abroad__columns">
                    {/* Left Column (4 items) */}
                    <ul className="mega-menu__list">
                      {(abroadStudiesMenu[0]?.items || []).slice(0, 4).map((item) => (
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

                    {/* Vertical Divider */}
                    <div className="mega-menu--abroad__divider" aria-hidden="true" />

                    {/* Right Column (3 items) */}
                    <ul className="mega-menu__list">
                      {(abroadStudiesMenu[0]?.items || []).slice(4).map((item) => (
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
                </div>
              )}
            </div>

            {/* 4. COLLEGE & UNIVERSITIES (Dropdown with stream & category filters) */}
            <div
              className={`nav__dropdown-wrapper ${
                activeDropdown === 'colleges' ? 'nav__dropdown-wrapper--open' : ''
              }`}
              onMouseEnter={() => handleMouseEnter('colleges')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/colleges"
                className={({ isActive }) =>
                  `nav__menu-item ${
                    isActive || activeDropdown === 'colleges' || location.pathname.startsWith('/colleges')
                      ? 'nav__menu-item--active'
                      : ''
                  }`
                }
                onClick={() => setActiveDropdown(null)}
              >
                <span>COLLEGE & UNIVERSITIES</span>
                <ChevronDown size={14} className="nav__chevron-icon" aria-hidden="true" />
              </NavLink>

              {/* 2-Option Card (Engineering & Medical) with location filters for Desktop view */}
              {activeDropdown === 'colleges' && (
                <div
                  className="mega-menu mega-menu--colleges-stream"
                  role="menu"
                  aria-label="Colleges and Universities streams"
                >
                  <div className="mega-menu__column-title mega-menu__column-title--center">
                    SELECT STREAM
                  </div>

                  <div className="mega-menu--colleges-stream__columns">
                    {/* Left: Engineering with Locations */}
                    <div className="mega-menu--colleges-stream__column">
                      <Link
                        to="/colleges?stream=engineering"
                        className="mega-menu__stream-header mega-menu__stream-header--link"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <img
                          src="/img/dropdown/eng.png"
                          alt=""
                          className="mega-menu__flag-img"
                          loading="lazy"
                        />
                        <span className="mega-menu__item-name">ENGINEERING</span>
                      </Link>

                      <ul className="mega-menu__sublocations-list">
                        {engineeringLocationTabs.map((loc) => (
                          <li key={loc.key} className="mega-menu__sublocations-item">
                            <Link
                              to={`/colleges?stream=engineering&location=${encodeURIComponent(loc.key)}`}
                              className="mega-menu__sublocation-link"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <MapPin size={12} className="mega-menu__sublocation-icon" aria-hidden="true" />
                              <span>{loc.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Vertical Divider */}
                    <div className="mega-menu--colleges-stream__divider" aria-hidden="true" />

                    {/* Right: Medical with Regions */}
                    <div className="mega-menu--colleges-stream__column">
                      <Link
                        to="/colleges?stream=medical"
                        className="mega-menu__stream-header mega-menu__stream-header--link"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <img
                          src="/img/dropdown/mbbs.png"
                          alt=""
                          className="mega-menu__flag-img"
                          loading="lazy"
                        />
                        <span className="mega-menu__item-name">MEDICAL</span>
                      </Link>

                      <ul className="mega-menu__sublocations-list">
                        {medicalRegionTabs.map((reg) => (
                          <li key={reg.key} className="mega-menu__sublocations-item">
                            <Link
                              to={`/colleges?stream=medical&region=${encodeURIComponent(reg.key)}`}
                              className="mega-menu__sublocation-link"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <MapPin size={12} className="mega-menu__sublocation-icon" aria-hidden="true" />
                              <span>{reg.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. ABOUT */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav__menu-item ${isActive ? 'nav__menu-item--active' : ''}`
              }
              onClick={() => setActiveDropdown(null)}
            >
              ABOUT
            </NavLink>

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

        {/* Mobile Quick Sub-Navbar (Domestic | Colleges | Abroad) */}
        <nav className="nav__mobile-subbar" aria-label="Quick category navigation">
          <div className="nav__mobile-subbar-container">
            <NavLink
              to="/domestic-studies"
              className={({ isActive }) =>
                `nav__mobile-subbar-link ${
                  isActive || location.pathname.startsWith('/domestic-studies')
                    ? 'nav__mobile-subbar-link--active'
                    : ''
                }`
              }
              onClick={() => setActiveDropdown(null)}
            >
              <GraduationCap size={15} className="nav__mobile-subbar-icon" aria-hidden="true" />
              <span>Domestic</span>
            </NavLink>

            <NavLink
              to="/colleges"
              className={({ isActive }) =>
                `nav__mobile-subbar-link ${
                  isActive || location.pathname.startsWith('/colleges')
                    ? 'nav__mobile-subbar-link--active'
                    : ''
                }`
              }
              onClick={() => setActiveDropdown(null)}
            >
              <Landmark size={15} className="nav__mobile-subbar-icon" aria-hidden="true" />
              <span>Colleges</span>
            </NavLink>

            <NavLink
              to="/abroad-studies"
              className={({ isActive }) =>
                `nav__mobile-subbar-link ${
                  isActive || location.pathname.startsWith('/abroad-studies')
                    ? 'nav__mobile-subbar-link--active'
                    : ''
                }`
              }
              onClick={() => setActiveDropdown(null)}
            >
              <Globe size={15} className="nav__mobile-subbar-icon" aria-hidden="true" />
              <span>Abroad</span>
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
