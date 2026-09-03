import {
  Building,
  Compass,
  Cpu,
  Globe2,
  GraduationCap,
  Sparkles,
  Stethoscope,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import CollegeCard from '../components/CollegeCard'
import EmptyState from '../components/EmptyState'
import {
  engineeringColleges,
  medicalColleges,
  medicalRegionTabs,
} from '../data/collegesData'

const regionIcons = {
  Tamilnadu: Building,
  Puducherry: Compass,
  Karnataka: GraduationCap,
  Abroad: Globe2,
}

function CollegesPage() {
  const [activeStream, setActiveStream] = useState('medical') // 'medical' | 'engineering'
  const [activeMedicalRegion, setActiveMedicalRegion] = useState('Tamilnadu')

  const handleStreamClick = (stream, e) => {
    setActiveStream(stream)
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }

  const handleRegionClick = (regionKey, e) => {
    setActiveMedicalRegion(regionKey)
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }

  // Colleges list based on active stream and region
  const displayedColleges = useMemo(() => {
    if (activeStream === 'medical') {
      return medicalColleges.filter((c) => c.region === activeMedicalRegion)
    }
    return engineeringColleges
  }, [activeStream, activeMedicalRegion])

  return (
    <main className="colleges-page">
      {/* 1. HERO HEADER */}
      <section className="colleges-hero">
        <div className="container">
          <div className="colleges-hero__content">
            <span className="eyebrow colleges-hero__eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              Verified Campuses & Direct Admissions
            </span>
            <h1 className="colleges-hero__title">
              Find the Right Medical & Engineering College.
            </h1>
            <p className="colleges-hero__lead">
              Explore leading Medical institutions across Tamil Nadu, Puducherry, Karnataka, Abroad, and Premier Engineering & Technology Colleges.
            </p>
          </div>
        </div>
      </section>

      {/* 2. NAVIGATION BAR (Stream Selector + Medical Sub-regions) */}
      <nav className="colleges-nav-sticky" aria-label="Colleges navigation">
        <div className="container colleges-nav-container">
          {/* PRIMARY CATEGORY / STREAM TABS */}
          <div className="colleges-stream-wrapper">
            <div className="colleges-stream-tabs" role="tablist" aria-label="College Stream Categories">
              <button
                type="button"
                role="tab"
                id="tab-stream-medical"
                aria-selected={activeStream === 'medical'}
                className={`colleges-stream-btn ${activeStream === 'medical' ? 'colleges-stream-btn--active' : ''}`}
                onClick={(e) => handleStreamClick('medical', e)}
              >
                <Stethoscope size={18} aria-hidden="true" className="colleges-stream-btn__icon" />
                <span className="colleges-stream-btn__label">Medical Colleges</span>
                <span className="colleges-stream-btn__count">{medicalColleges.length}</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-stream-engineering"
                aria-selected={activeStream === 'engineering'}
                className={`colleges-stream-btn ${activeStream === 'engineering' ? 'colleges-stream-btn--active' : ''}`}
                onClick={(e) => handleStreamClick('engineering', e)}
              >
                <Cpu size={18} aria-hidden="true" className="colleges-stream-btn__icon" />
                <span className="colleges-stream-btn__label">Engineering Colleges</span>
                <span className="colleges-stream-btn__count">{engineeringColleges.length}</span>
              </button>
            </div>
          </div>

          {/* SECONDARY NAVIGATION: SUB-REGIONS UNDER MEDICAL COLLEGES */}
          {activeStream === 'medical' && (
            <div className="colleges-subnav-wrapper">
              <div className="colleges-subnav-tabs" role="tablist" aria-label="Medical Regions">
                {medicalRegionTabs.map((tab) => {
                  const isActive = activeMedicalRegion === tab.key
                  const TabIcon = regionIcons[tab.key] || Building

                  return (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      id={`tab-med-${tab.key}`}
                      aria-selected={isActive}
                      className={`colleges-subnav-btn ${isActive ? 'colleges-subnav-btn--active' : ''}`}
                      onClick={(e) => handleRegionClick(tab.key, e)}
                    >
                      <TabIcon size={16} aria-hidden="true" className="colleges-subnav-btn__icon" />
                      <span className="colleges-subnav-btn__label">{tab.label}</span>
                      <span className="colleges-subnav-btn__count">{tab.count}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 3. SHOWCASE SECTION */}
      <section className="colleges-content-section">
        <div className="container">
          {/* COLLEGES CARDS GRID */}
          {displayedColleges.length > 0 ? (
            <div className="colleges-cards-grid">
              {displayedColleges.map((college) => (
                <CollegeCard
                  key={college.id}
                  name={college.name}
                  image={college.image}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title={`No colleges found in this section`}
              description="Please select a different category or region tab to explore colleges."
            />
          )}
        </div>
      </section>
    </main>
  )
}

export default CollegesPage
