import {
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CollegeCard from '../components/CollegeCard'
import { useEnquiry } from '../context/EnquiryContext'
import { distanceUniversities } from '../data/distanceEducationData'

function DistanceEducationPage() {
  const navigate = useNavigate()
  const { openEnquiry } = useEnquiry()

  useEffect(() => {
    document.title = 'Distance Mode Education | UGC-DEB Approved Degree Programs | Sri Vaari'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore UGC-DEB approved Distance Mode UG, PG, and Diploma degrees from premier universities in Tamil Nadu and India with Sri Vaari Educational Counselling.'
      )
    }
  }, [])

  const handleEnquireClick = (courseTitle) => {
    openEnquiry({
      initialCourse: courseTitle || 'Distance Education Program',
      initialStream: 'Distance Mode Education',
      source: `Distance Education: ${courseTitle || 'General Inquiry'}`,
    })
  }

  return (
    <main className="distance-page">
      {/* 1. HERO SECTION */}
      <header className="page-hero distance-hero">
        <div className="container distance-hero__container">
          <div className="distance-hero__eyebrow page-hero-eyebrow">
            <span className="distance-hero__eyebrow-line" aria-hidden="true" />
            <span>FLEXIBLE &amp; ACCREDITED LEARNING</span>
          </div>

          <h1 className="page-hero__title distance-hero__title page-hero-title">
            UGC-DEB Approved <br />
            <span className="text-highlight">Distance Mode Education</span>
          </h1>

          <p className="page-hero__lead distance-hero__lead page-hero-lead">
            Advance your career or resume interrupted education with UGC-DEB recognized degrees from premier universities including <strong>Alagappa University</strong>, <strong>Manonmaniam Sundaranar University</strong>, and <strong>Bharathidasan University</strong>. Study at your own pace with zero study-gap penalties.
          </p>

          <div className="distance-hero__features page-hero-features">
            <div className="distance-hero__feature-item">
              <div className="distance-hero__feature-icon">
                <ShieldCheck size={16} aria-hidden="true" />
              </div>
              <span className="distance-hero__feature-text">
                UGC &amp; DEB
                <br />
                Recognized
              </span>
            </div>

            <div className="distance-hero__feature-divider" aria-hidden="true" />

            <div className="distance-hero__feature-item">
              <div className="distance-hero__feature-icon">
                <Briefcase size={16} aria-hidden="true" />
              </div>
              <span className="distance-hero__feature-text">
                Study While
                <br />
                You Work
              </span>
            </div>

            <div className="distance-hero__feature-divider" aria-hidden="true" />

            <div className="distance-hero__feature-item">
              <div className="distance-hero__feature-icon">
                <GraduationCap size={16} aria-hidden="true" />
              </div>
              <span className="distance-hero__feature-text">
                Top State &amp;
                <br />
                Central Varsities
              </span>
            </div>

            <div className="distance-hero__feature-divider" aria-hidden="true" />

            <div className="distance-hero__feature-item">
              <div className="distance-hero__feature-icon">
                <Sparkles size={16} aria-hidden="true" />
              </div>
              <span className="distance-hero__feature-text">
                100% Exam &amp;
                <br />
                Material Support
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. UNIVERSITIES SHOWCASE (CARDS SAME AS IN COLLEGES) */}
      <div className="colleges-content-section">
        <div className="container">
          <div className="colleges-stream-content">
            <section className="colleges-stream-section" aria-labelledby="heading-distance-universities">
              <div className="colleges-stream-section__header reveal-fade-up">
                <div className="colleges-stream-section__title-group">
                  <div className="colleges-stream-section__icon-wrap colleges-stream-section__icon-wrap--engineering">
                    <GraduationCap size={20} aria-hidden="true" />
                  </div>
                  <div className="colleges-stream-section__text-col">
                    <h2 id="heading-distance-universities" className="colleges-stream-section__title">
                      <span>Distance Education Universities</span>
                      <span className="colleges-stream-section__count-badge">
                        {distanceUniversities.length} Universities
                      </span>
                    </h2>
                  </div>
                </div>
              </div>

              {/* Exact Colleges Cards Grid */}
              <div className="colleges-cards-grid reveal-stagger-group">
                {distanceUniversities.map((college) => (
                  <CollegeCard
                    key={college.id}
                    name={college.name}
                    image={college.image}
                    onClick={() => navigate(`/distance-education/${college.id}`)}
                    className="reveal-stagger-item"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DistanceEducationPage
