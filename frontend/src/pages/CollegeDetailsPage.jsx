import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Home,
  MapPin,
  Send,
  Sparkles,
  UsersRound,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CTASection from '../components/CTASection'
import EmptyState from '../components/EmptyState'
import EnquiryModal from '../components/EnquiryModal'
import { colleges } from '../data/collegesData'

function CollegeDetailsPage() {
  const { id } = useParams()
  const college = colleges.find((item) => item.id === id)
  const [openFaq, setOpenFaq] = useState(0)
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)

  if (!college) {
    return (
      <main className="container" style={{ padding: 'var(--space-12) 0' }}>
        <EmptyState
          title="Institution not found"
          description="This college may have moved or is not currently in our catalogue."
          actionLabel="Browse all colleges"
          actionTo="/colleges"
        />
      </main>
    )
  }

  const toggleFaq = (index) => {
    setOpenFaq((current) => (current === index ? -1 : index))
  }

  return (
    <main className="college-detail">
      {/* 1. BREADCRUMB */}
      <div className="breadcrumb-wrapper">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb__item">
              <Home size={14} aria-hidden="true" />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="breadcrumb__separator" aria-hidden="true" />
            <Link to="/colleges" className="breadcrumb__item">
              <span>Colleges</span>
            </Link>
            <ChevronRight size={14} className="breadcrumb__separator" aria-hidden="true" />
            <span className="breadcrumb__current" aria-current="page">
              {college.name}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. COLLEGE DETAIL HERO */}
      <section className="college-detail__hero">
        <div className="container college-detail__hero-grid">
          <div className="college-detail__hero-content">
            <div className="college-detail__badges">
              <span className="eyebrow college-detail__eyebrow">
                <Sparkles size={14} aria-hidden="true" />
                {college.type}
              </span>
              <span className="college-detail__location-pill">
                <MapPin size={14} aria-hidden="true" />
                <span>{college.city}, {college.region === 'Abroad' ? college.country : college.state}</span>
              </span>
            </div>

            <h1 className="college-detail__title">{college.name}</h1>
            <p className="college-detail__lead">{college.description}</p>

            <div className="college-detail__actions">
              <button
                className="button button--primary"
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
              >
                <span>Enquire About This College</span>
                <ArrowRight size={17} aria-hidden="true" />
              </button>
              <Link className="button button--secondary" to="/counselling">
                <span>Talk to Counsellor</span>
              </Link>
            </div>
          </div>

          <div className="college-detail__hero-media">
            <img
              src={college.image}
              alt={`${college.name} campus view`}
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT & SIDEBAR */}
      <section className="college-detail__content">
        <div className="container college-detail__layout">
          {/* Main Column */}
          <article className="college-detail__main">
            {/* Overview */}
            <section className="detail-section">
              <h2 className="detail-section__title">Campus Overview</h2>
              <p className="detail-section__text">{college.overview}</p>
            </section>

            {/* Popular Programs */}
            <section className="detail-section">
              <h2 className="detail-section__title">Popular Programs</h2>
              <p className="detail-section__subtitle">
                Flagship courses offered at {college.name}:
              </p>
              <div className="career-list">
                {college.popularCourses.map((course) => (
                  <span key={course} className="career-chip career-chip--accent">
                    {course}
                  </span>
                ))}
              </div>
            </section>

            {/* Facilities */}
            <section className="detail-section">
              <h2 className="detail-section__title">Campus Facilities</h2>
              <ul className="facilities-grid" role="list">
                {college.facilities.map((facility) => (
                  <li key={facility} className="facilities-item">
                    <span className="facilities-item__icon" aria-hidden="true">
                      <CheckCircle2 size={18} />
                    </span>
                    <span>{facility}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Admission Process */}
            <section className="detail-section">
              <h2 className="detail-section__title">Admission Information</h2>
              <div className="detail-card">
                <p className="detail-section__text">{college.admission}</p>
              </div>
            </section>

            {/* Eligibility */}
            <section className="detail-section">
              <h2 className="detail-section__title">Eligibility Criteria</h2>
              <div className="detail-card detail-card--tint">
                <p className="detail-section__text">{college.eligibility}</p>
              </div>
            </section>

            {/* Placements */}
            <section className="detail-section">
              <h2 className="detail-section__title">Placement Highlights</h2>
              <ul className="check-list" role="list">
                {college.placements.map((item) => (
                  <li key={item} className="check-list__item">
                    <span className="check-list__icon" aria-hidden="true">
                      <CheckCircle2 size={18} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQs */}
            <section className="detail-section">
              <h2 className="detail-section__title">Frequently Asked Questions</h2>
              <div className="faq-list" role="region" aria-label="College FAQs">
                {college.faqs.map(([question, answer], index) => {
                  const isOpen = openFaq === index
                  return (
                    <article
                      key={question}
                      className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                    >
                      <h3>
                        <button
                          type="button"
                          onClick={() => toggleFaq(index)}
                          aria-expanded={isOpen}
                          aria-controls={`college-faq-${index}`}
                          id={`college-faq-btn-${index}`}
                        >
                          <span>{question}</span>
                          <ChevronDown size={20} aria-hidden="true" />
                        </button>
                      </h3>
                      <div
                        id={`college-faq-${index}`}
                        className="faq-item__answer"
                        role="region"
                        aria-labelledby={`college-faq-btn-${index}`}
                        hidden={!isOpen}
                      >
                        <p>{answer}</p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          </article>

          {/* Sticky Sidebar */}
          <aside className="college-detail__aside">
            <div className="college-facts">
              <h3 className="college-facts__title">At a Glance</h3>
              <div className="college-facts__list">
                <div className="college-facts__item">
                  <span className="college-facts__icon" aria-hidden="true">
                    <MapPin size={18} />
                  </span>
                  <div className="college-facts__data">
                    <span className="college-facts__label">Location</span>
                    <strong className="college-facts__value">{college.city}, {college.region === 'Abroad' ? college.country : college.state}</strong>
                  </div>
                </div>

                <div className="college-facts__item">
                  <span className="college-facts__icon" aria-hidden="true">
                    <Building2 size={18} />
                  </span>
                  <div className="college-facts__data">
                    <span className="college-facts__label">Institution Type</span>
                    <strong className="college-facts__value">{college.type}</strong>
                  </div>
                </div>

                <div className="college-facts__item">
                  <span className="college-facts__icon" aria-hidden="true">
                    <Award size={18} />
                  </span>
                  <div className="college-facts__data">
                    <span className="college-facts__label">Accreditation</span>
                    <strong className="college-facts__value">{college.accreditation}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="college-detail__help">
              <UsersRound size={26} aria-hidden="true" />
              <h3>Want a clearer comparison?</h3>
              <p>Compare fee structures, hostel accommodations, and cut-offs with an advisor.</p>
              <button
                className="button button--accent college-detail__help-btn"
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
              >
                <span>Send Free Enquiry</span>
                <Send size={16} aria-hidden="true" />
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* 4. BOTTOM CTA */}
      <CTASection
        eyebrow="Ready When You Are"
        title={`Interested in ${college.name}?`}
        description="Get unbiased guidance on admissions, scholarship opportunities, and program suitability."
        primaryLabel="Enquire About This College"
        onPrimaryClick={() => setIsEnquiryOpen(true)}
        secondaryLabel="Talk to Counsellor"
        secondaryTo="/counselling"
      />

      {/* 5. ENQUIRY MODAL */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialCourse={college.popularCourses[0] || ''}
        initialLocation={`${college.city}, ${college.state}`}
        contextName={college.name}
      />
    </main>
  )
}

export default CollegeDetailsPage
