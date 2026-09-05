import {
  Building,
  Compass,
  Cpu,
  FileCheck2,
  Globe2,
  GraduationCap,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
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
  const [activeStream, setActiveStream] = useState('engineering') // 'engineering' | 'medical'
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
      <header className="page-hero colleges-hero">
        <div className="container colleges-hero__container">
          <div className="colleges-hero__eyebrow">
            <span className="colleges-hero__eyebrow-line" aria-hidden="true" />
            <span>COLLEGE GUIDANCE</span>
          </div>

          <h1 className="page-hero__title colleges-hero__title">
            Find the Right <br />
            <span className="text-highlight">Medical & Engineering</span> College.
          </h1>

          <p className="page-hero__lead colleges-hero__lead">
            Explore leading medical and engineering colleges across Tamil Nadu, Puducherry, Karnataka, and accredited international institutions for your future.
          </p>

          <div className="colleges-hero__features">
            <div className="colleges-hero__feature-item">
              <div className="colleges-hero__feature-icon">
                <GraduationCap size={16} aria-hidden="true" />
              </div>
              <span className="colleges-hero__feature-text">
                Verified
                <br />
                Colleges
              </span>
            </div>

            <div className="colleges-hero__feature-divider" aria-hidden="true" />

            <div className="colleges-hero__feature-item">
              <div className="colleges-hero__feature-icon">
                <FileCheck2 size={16} aria-hidden="true" />
              </div>
              <span className="colleges-hero__feature-text">
                Updated
                <br />
                Information
              </span>
            </div>

            <div className="colleges-hero__feature-divider" aria-hidden="true" />

            <div className="colleges-hero__feature-item">
              <div className="colleges-hero__feature-icon">
                <Users size={16} aria-hidden="true" />
              </div>
              <span className="colleges-hero__feature-text">
                Personalized
                <br />
                Guidance
              </span>
            </div>

            <div className="colleges-hero__feature-divider" aria-hidden="true" />

            <div className="colleges-hero__feature-item">
              <div className="colleges-hero__feature-icon">
                <TrendingUp size={16} aria-hidden="true" />
              </div>
              <span className="colleges-hero__feature-text">
                Brighter
                <br />
                Futures
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. NAVIGATION BAR (Stream Selector + Medical Sub-regions) */}
      <nav className="colleges-nav-sticky" aria-label="Colleges navigation">
        <div className="container colleges-nav-container">
          {/* PRIMARY CATEGORY / STREAM TABS */}
          <div className="colleges-stream-wrapper">
            <div className="colleges-stream-tabs" role="tablist" aria-label="College Stream Categories">
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
