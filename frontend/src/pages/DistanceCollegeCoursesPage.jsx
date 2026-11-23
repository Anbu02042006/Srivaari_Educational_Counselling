import {
  Award,
  BookOpen,
  Code2,
  GraduationCap,
  TrendingUp,
} from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'
import {
  distanceCourseCards,
  distanceUniversities,
} from '../data/distanceEducationData'

function DistanceCollegeCoursesPage() {
  const { slug } = useParams()
  const { openEnquiry } = useEnquiry()

  // Match current university by slug or default to first university
  const currentUniversity =
    distanceUniversities.find((u) => u.id === slug) || distanceUniversities[0]

  useEffect(() => {
    document.title = `${currentUniversity.name} - Distance Mode Courses | Sri Vaari`
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Explore approved UG, PG, MBA, B.Ed, and MCA distance education courses at ${currentUniversity.name} with Sri Vaari Educational Counselling.`
      )
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentUniversity])

  const handleCourseEnquiry = (courseName, categoryTitle) => {
    openEnquiry({
      initialCourse: `${courseName} (${currentUniversity.shortName})`,
      initialStream: categoryTitle || 'Distance Mode Education',
      source: `Distance Course: ${courseName} - ${currentUniversity.name}`,
    })
  }

  // Render watermark icon matching each card theme
  const renderWatermark = (watermarkType) => {
    switch (watermarkType) {
      case 'trending-up':
        return <TrendingUp size={110} aria-hidden="true" className="course-card-watermark__icon" />
      case 'book-open':
        return <BookOpen size={110} aria-hidden="true" className="course-card-watermark__icon" />
      case 'code':
        return <Code2 size={110} aria-hidden="true" className="course-card-watermark__icon" />
      case 'award':
        return <Award size={110} aria-hidden="true" className="course-card-watermark__icon" />
      case 'graduation-cap':
      default:
        return <GraduationCap size={110} aria-hidden="true" className="course-card-watermark__icon" />
    }
  }

  return (
    <main className="distance-courses-page">
      {/* 1. TOP BREADCRUMB NAVIGATION */}
      <section className="distance-courses-hero reveal-fade-up">
        <div className="container">
          <nav className="distance-courses-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="distance-courses-breadcrumb__link">Home</Link>
            <span className="distance-courses-breadcrumb__separator">/</span>
            <Link to="/distance-education" className="distance-courses-breadcrumb__link">Distance Mode Education</Link>
            <span className="distance-courses-breadcrumb__separator">/</span>
            <span className="distance-courses-breadcrumb__current">{currentUniversity.name}</span>
          </nav>
        </div>
      </section>

      {/* 2. SLOGAN BANNER (From Image) */}
      <section className="distance-slogan-section">
        <div className="container">
          <div className="distance-slogan-banner reveal-scale-in">
            <span className="distance-slogan-line distance-slogan-line--left" aria-hidden="true" />
            <h2 className="distance-slogan-title">Your Future, Our Commitment!</h2>
            <span className="distance-slogan-line distance-slogan-line--right" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* 3. 5 COURSE CARDS SECTION (Matching Image Layout) */}
      <section className="distance-course-cards-section">
        <div className="container">
          {/* Top Row: UG & PG (Wide 2-column cards) */}
          <div className="distance-cards-row distance-cards-row--top reveal-stagger-group">
            {distanceCourseCards.slice(0, 2).map((card) => (
              <article
                key={card.id}
                className={`distance-course-card distance-course-card--${card.theme} reveal-stagger-item`}
              >
                {/* Pill Header */}
                <div className="distance-course-card__header-pill">
                  <div className="distance-course-card__icon-badge">
                    <GraduationCap size={18} className="distance-course-card__cap-icon" />
                  </div>
                  <h3 className="distance-course-card__pill-title">{card.title}</h3>
                </div>

                {/* Card Body with 2 columns */}
                <div className="distance-course-card__body">
                  <div className="distance-course-card__columns-grid">
                    {card.columns.map((col, colIdx) => (
                      <ul key={colIdx} className="distance-course-card__list">
                        {col.map((course, idx) => (
                          <li
                            key={idx}
                            className="distance-course-card__item"
                            onClick={() => handleCourseEnquiry(course, card.title)}
                            title={`Click to enquire for ${course}`}
                          >
                            <span className="distance-course-card__bullet">•</span>
                            <span className="distance-course-card__name">{course}</span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>

                  {/* Faded Decorative Watermark */}
                  <div className="distance-course-card__watermark" aria-hidden="true">
                    {renderWatermark(card.watermark)}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Row: MBA, B.Ed, MCA (3 cards side by side) */}
          <div className="distance-cards-row distance-cards-row--bottom reveal-stagger-group">
            {distanceCourseCards.slice(2).map((card) => (
              <article
                key={card.id}
                className={`distance-course-card distance-course-card--${card.theme} reveal-stagger-item`}
              >
                {/* Pill Header */}
                <div className="distance-course-card__header-pill">
                  <div className="distance-course-card__icon-badge">
                    <GraduationCap size={18} className="distance-course-card__cap-icon" />
                  </div>
                  <h3 className="distance-course-card__pill-title">{card.title}</h3>
                </div>

                {/* Card Body with 1 column */}
                <div className="distance-course-card__body">
                  <ul className="distance-course-card__list">
                    {card.columns[0].map((course, idx) => (
                      <li
                        key={idx}
                        className="distance-course-card__item"
                        onClick={() => handleCourseEnquiry(course, card.title)}
                        title={`Click to enquire for ${course}`}
                      >
                        <span className="distance-course-card__bullet">•</span>
                        <span className="distance-course-card__name">{course}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Faded Decorative Watermark */}
                  <div className="distance-course-card__watermark" aria-hidden="true">
                    {renderWatermark(card.watermark)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default DistanceCollegeCoursesPage
