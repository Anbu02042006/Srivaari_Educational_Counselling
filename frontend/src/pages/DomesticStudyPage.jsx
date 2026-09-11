import { ArrowLeft, ArrowRight, Award, Calendar, ShieldCheck, Users } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'
import { domesticStudiesBySlug, domesticStudiesList } from '../data/domesticStudiesData'

function DomesticStudyPage() {
  const { slug } = useParams()
  const { openEnquiry } = useEnquiry()

  const course = slug ? domesticStudiesBySlug[slug] : null

  // Update page title and meta description dynamically
  useEffect(() => {
    if (slug && course) {
      document.title = `${course.title} | Sri Vaari Educational Counselling`
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `Complete guide to ${course.title} admissions, eligibility, duration, fees, salary, and career opportunities at Sri Vaari Educational Counselling.`
        )
      }
    } else {
      document.title = 'Domestic Studies - Choose Your Desired Career | Sri Vaari Educational Counselling'
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Explore premier domestic degree programs across Medical, AYUSH, Engineering, Healthcare, Law, and Sciences with expert guidance from Sri Vaari Educational Counselling.'
        )
      }
    }
  }, [slug, course])

  const handleContactClick = (selectedCourse) => {
    const c = selectedCourse || course
    openEnquiry({
      initialCourse: c?.name || 'Domestic Studies',
      initialStream: c?.particulars?.level || 'Undergraduate',
      source: `Domestic Studies: ${c?.name || 'General Inquiry'}`,
    })
  }

  // If a slug is in URL, render the detailed course view
  if (slug) {
    if (!course) {
      return (
        <div className="abroad-study-page">
          <div className="container abroad-study-container abroad-not-found">
            <h2>Course Not Found</h2>
            <p>We couldn't find a study guide for "{slug}".</p>
            <Link to="/domestic-studies" className="button button--primary">
              <ArrowLeft size={16} />
              <span>Back to All Courses</span>
            </Link>
          </div>
        </div>
      )
    }

    const particularsList = [
      { label: 'Course Name', value: course.particulars?.courseName },
      { label: 'Full Form', value: course.particulars?.fullForm },
      { label: 'Course Duration', value: course.particulars?.duration },
      { label: 'Course Level', value: course.particulars?.level },
      { label: 'Eligibility Criteria', value: course.particulars?.eligibility },
      { label: 'Entrance Exams', value: course.particulars?.entranceExams },
      { label: 'Medium of Studies', value: course.particulars?.medium },
      { label: 'Course Fees', value: course.particulars?.courseFees },
      { label: 'Salary Package', value: course.particulars?.salaryPackage },
      { label: 'Job Position', value: course.particulars?.jobs },
    ].filter((item) => item.value)

    const bannerTitle =
      course.bannerTitle || `${course.name?.toUpperCase()} ADMISSIONS & GUIDANCE`

    return (
      <div className="abroad-study-page">
        <div className="container abroad-study-container">
          {/* Detailed Course Content */}
          <section className="abroad-detail-view" aria-label={`${course.name} Course Information`}>
            {/* 1. TOP BANNER */}
            <div className="abroad-study-banner">
              <h2 className="abroad-study-banner__title">{bannerTitle}</h2>
            </div>

            {/* 2. OVERVIEW CARD */}
            <div className="abroad-overview-card">
              <div className="abroad-overview-media">
                <img
                  src={course.image}
                  alt={`${course.name} curriculum and training overview`}
                  className="abroad-overview-photo"
                  loading="eager"
                />
              </div>

              <div className="abroad-overview-info">
                <div className="abroad-overview-block">
                  <h3 className="abroad-block-heading">Course Overview</h3>
                  <p className="abroad-block-desc">{course.description}</p>
                </div>

                <div className="abroad-quickfacts-block">
                  <h3 className="abroad-block-heading">Key Highlights</h3>
                  <p className="abroad-block-desc">
                    {course.name} is a premier degree program accredited by national regulatory councils.
                    Students receive thorough classroom training, advanced laboratory exposure, and dedicated clinical/industrial internships to ensure industry readiness.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. PARTICULARS TABLE + SIDEBAR CARD */}
            <div className="abroad-bottom-grid">
              <div className="abroad-table-card">
                <table className="abroad-particulars-table" aria-label={`Particulars for ${course.name}`}>
                  <thead>
                    <tr>
                      <th scope="col" className="abroad-table__th abroad-table__th--particulars">
                        Particulars
                      </th>
                      <th scope="col" className="abroad-table__th abroad-table__th--details">
                        Course Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {particularsList.map((row, idx) => (
                      <tr key={idx} className="abroad-table__tr">
                        <td className="abroad-table__td abroad-table__td--label">{row.label}</td>
                        <td className="abroad-table__td abroad-table__td--value">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <aside className="abroad-sidebar-wrapper">
                <div className="abroad-promo-card">
                  <span className="abroad-promo-card__eyebrow">SRI VAARI EDUCATIONAL GROUPS</span>
                  <h3 className="abroad-promo-card__title">
                    {course.name} Admissions & Counselling
                  </h3>

                  <ul className="abroad-promo-card__features">
                    <li className="abroad-promo-feature">
                      <span className="abroad-promo-icon-wrap" aria-hidden="true">
                        <ShieldCheck size={19} />
                      </span>
                      <span className="abroad-promo-text">100% Trusted</span>
                    </li>
                    <li className="abroad-promo-feature">
                      <span className="abroad-promo-icon-wrap" aria-hidden="true">
                        <Users size={19} />
                      </span>
                      <span className="abroad-promo-text">Professional Services</span>
                    </li>
                    <li className="abroad-promo-feature">
                      <span className="abroad-promo-icon-wrap" aria-hidden="true">
                        <Calendar size={19} />
                      </span>
                      <span className="abroad-promo-text">Since 1997</span>
                    </li>
                    <li className="abroad-promo-feature">
                      <span className="abroad-promo-icon-wrap" aria-hidden="true">
                        <Award size={19} />
                      </span>
                      <span className="abroad-promo-text">Certified Guidance</span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="button button--primary abroad-promo-btn"
                    onClick={() => handleContactClick(course)}
                    aria-label={`Apply for counselling for ${course.name}`}
                  >
                    <span>Contact Now</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                </div>

                <div className="abroad-sidebar-watermark" aria-hidden="true">
                  <span className="abroad-sidebar-script">Your Career Dreams, Our Support.</span>
                  <svg
                    className="abroad-sidebar-swoosh"
                    viewBox="0 0 200 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 14 C70 20, 150 17, 195 7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    )
  }

  // Landing Page View (when on /domestic-studies without slug)
  return (
    <div className="abroad-landing-page">
      <div className="container abroad-study-container">
        {/* 1. Header Section matching reference layout & theme */}
        <header className="abroad-landing__header">
          <h1 className="abroad-landing__title">
            Choose Your Desired Degree &amp; Career Pathway!
          </h1>
          <p className="abroad-landing__subtitle">
            Explore India's premier undergraduate and professional programs across Medical, AYUSH, Healthcare, Engineering, Architecture, Law, and Sciences. Backed by <strong>27+ years of excellence</strong> and direct tie-ups with <strong>100+ accredited institutions</strong>, Sri Vaari Educational Groups provides end-to-end guidance on cut-offs, transparent quota admissions, scholarship opportunities, and personalized career roadmaps.
          </p>
          <div className="abroad-landing__divider" aria-hidden="true">
            <span className="abroad-landing__divider-dark" />
            <span className="abroad-landing__divider-blue" />
          </div>
        </header>

        {/* 2. Domestic Courses Cards Grid */}
        <div className="colleges-cards-grid">
          {domesticStudiesList.map((item) => (
            <article key={item.slug} className="college-grid-card college-grid-card--interactive">
              <Link
                to={`/domestic-studies/${item.slug}`}
                className="college-grid-card__link"
                aria-label={`Learn more about ${item.name}`}
              >
                <div className="college-grid-card__circle-wrap">
                  <div className="college-grid-card__circle">
                    <img
                      className="college-grid-card__img"
                      alt={`${item.name} logo`}
                      loading="lazy"
                      src={item.image}
                      onError={(e) => {
                        if (!e.currentTarget.dataset.fallback) {
                          e.currentTarget.dataset.fallback = 'true'
                          e.currentTarget.src = '/logo.png'
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="college-grid-card__body college-grid-card__body--minimal">
                  <h3 className="college-grid-card__title">{item.name}</h3>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DomesticStudyPage
