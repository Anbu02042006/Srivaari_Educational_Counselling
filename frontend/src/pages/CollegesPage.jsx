import {
  Building,
  Compass,
  FileCheck2,
  GraduationCap,
  MapPin,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CollegeCard from '../components/CollegeCard'
import EmptyState from '../components/EmptyState'
import {
  engineeringColleges,
  engineeringLocationTabs,
  medicalColleges,
  medicalRegionTabs,
} from '../data/collegesData'

const regionIcons = {
  Tamilnadu: Building,
  Puducherry: Compass,
  Karnataka: GraduationCap,
}

// Location tabs for Engineering with 'All Locations' option
const enggLocationTabs = [
  { key: 'all', label: 'All Locations', count: engineeringColleges.length },
  ...engineeringLocationTabs.map((t) => ({
    ...t,
    count: engineeringColleges.filter((c) => c.location === t.key).length,
  })),
]

// Region tabs for Medical with 'All Regions' option
const medRegionTabs = [
  { key: 'all', label: 'All Regions', count: medicalColleges.length },
  ...medicalRegionTabs,
]

function CollegesPage() {
  const [searchParams] = useSearchParams()
  const [activeStream, setActiveStream] = useState('all') // 'all' | 'engineering' | 'medical'
  const [activeEnggLocation, setActiveEnggLocation] = useState('all')
  const [activeMedicalRegion, setActiveMedicalRegion] = useState('all')

  useEffect(() => {
    const stream = searchParams.get('stream')
    const region = searchParams.get('region')
    const locationParam = searchParams.get('location') || searchParams.get('city')

    if (stream === 'medical') {
      setActiveStream('medical')
      if (region && ['Tamilnadu', 'Puducherry', 'Karnataka'].includes(region)) {
        setActiveMedicalRegion(region)
      } else {
        setActiveMedicalRegion('all')
      }
    } else if (stream === 'engineering') {
      setActiveStream('engineering')
      if (locationParam) {
        const found = engineeringLocationTabs.find(
          (t) => t.key.toLowerCase() === locationParam.toLowerCase()
        )
        setActiveEnggLocation(found ? found.key : 'all')
      } else {
        setActiveEnggLocation('all')
      }
    } else {
      // Default landing page mode: All Colleges (Engineering & Medical)
      setActiveStream('all')
      setActiveEnggLocation('all')
      setActiveMedicalRegion('all')
    }

    // Scroll smoothly to top on navigation change
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [searchParams])

  const handleEnggLocationClick = (locationKey) => {
    setActiveEnggLocation(locationKey)
  }

  const handleRegionClick = (regionKey) => {
    setActiveMedicalRegion(regionKey)
  }

  // Filter engineering colleges by active location
  const filteredEnggColleges = useMemo(() => {
    if (activeEnggLocation === 'all') {
      return engineeringColleges
    }
    return engineeringColleges.filter((c) => c.location === activeEnggLocation)
  }, [activeEnggLocation])

  // Filter medical colleges by active region
  const displayedMedicalColleges = useMemo(() => {
    if (activeMedicalRegion === 'all') {
      return medicalColleges
    }
    return medicalColleges.filter((c) => c.region === activeMedicalRegion)
  }, [activeMedicalRegion])

  return (
    <main className="colleges-page">
      {/* 1. HERO HEADER */}
      <header className="page-hero colleges-hero">
        <div className="container colleges-hero__container">
          <div className="colleges-hero__eyebrow page-hero-eyebrow">
            <span className="colleges-hero__eyebrow-line" aria-hidden="true" />
            <span>COLLEGE GUIDANCE</span>
          </div>

          <h1 className="page-hero__title colleges-hero__title page-hero-title">
            Find the Right <br />
            <span className="text-highlight">Medical & Engineering</span> College.
          </h1>

          <p className="page-hero__lead colleges-hero__lead page-hero-lead">
            Explore leading medical and engineering colleges across Tamil Nadu, Puducherry, Karnataka, and accredited institutions for your future.
          </p>

          <div className="colleges-hero__features page-hero-features">
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



      {/* 3. SHOWCASE SECTIONS */}
      <div className="colleges-content-section">
        <div className="container">
          <div className="colleges-stream-content">

            {/* ================= 1. ENGINEERING COLLEGES SECTION ================= */}
            {(activeStream === 'all' || activeStream === 'engineering') && (
              <section id="engineering-colleges" className="colleges-stream-section" aria-labelledby="heading-engg-colleges">
                <div className="colleges-stream-section__header">
                  <h2 id="heading-engg-colleges" className="colleges-stream-section__title">
                    <span>Engineering Colleges</span>
                  </h2>

                  {/* Secondary Location Filter Tabs */}
                  <div className="colleges-filter-pills" role="tablist" aria-label="Filter Engineering Colleges by Location">
                    {enggLocationTabs.map((tab) => {
                      const isActive = activeEnggLocation === tab.key
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={`colleges-filter-pill ${isActive ? 'colleges-filter-pill--active' : ''}`}
                          onClick={() => handleEnggLocationClick(tab.key)}
                        >
                          <MapPin size={13} aria-hidden="true" className="colleges-filter-pill__icon" />
                          <span>{tab.label}</span>
                          <span className="colleges-filter-pill__count">{tab.count}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* College Cards Grid */}
                {filteredEnggColleges.length > 0 ? (
                  <div className="colleges-cards-grid reveal-stagger-group" key={`engg-${activeEnggLocation}`}>
                    {filteredEnggColleges.map((college) => (
                      <CollegeCard
                        key={college.id}
                        name={college.name}
                        image={college.image}
                        className="reveal-stagger-item"
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No engineering colleges found"
                    description="No engineering colleges found for this location."
                  />
                )}
              </section>
            )}

            {/* SEPARATOR BETWEEN STREAMS ON LANDING PAGE */}
            {activeStream === 'all' && (
              <div className="colleges-landing-divider" aria-hidden="true" />
            )}

            {/* ================= 2. MEDICAL COLLEGES SECTION ================= */}
            {(activeStream === 'all' || activeStream === 'medical') && (
              <section id="medical-colleges" className="colleges-stream-section colleges-stream-section--medical" aria-labelledby="heading-med-colleges">
                <div className="colleges-stream-section__header">
                  <h2 id="heading-med-colleges" className="colleges-stream-section__title">
                    <span>Medical Colleges</span>
                  </h2>

                  {/* Secondary Region Filter Tabs */}
                  <div className="colleges-filter-pills" role="tablist" aria-label="Filter Medical Colleges by Region">
                    {medRegionTabs.map((tab) => {
                      const isActive = activeMedicalRegion === tab.key
                      const TabIcon = regionIcons[tab.key] || Building
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={`colleges-filter-pill ${isActive ? 'colleges-filter-pill--active' : ''}`}
                          onClick={() => handleRegionClick(tab.key)}
                        >
                          <TabIcon size={13} aria-hidden="true" className="colleges-filter-pill__icon" />
                          <span>{tab.label}</span>
                          <span className="colleges-filter-pill__count">{tab.count}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* College Cards Grid */}
                {displayedMedicalColleges.length > 0 ? (
                  <div className="colleges-cards-grid reveal-stagger-group" key={`med-${activeMedicalRegion}`}>
                    {displayedMedicalColleges.map((college) => (
                      <CollegeCard
                        key={college.id}
                        name={college.name}
                        image={college.image}
                        className="reveal-stagger-item"
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No medical colleges found"
                    description="No medical colleges found for this region."
                  />
                )}
              </section>
            )}

          </div>
        </div>
      </div>
    </main>
  )
}

export default CollegesPage
