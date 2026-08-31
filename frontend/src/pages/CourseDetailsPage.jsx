import {
  ArrowRight,
  BadgeIndianRupee,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  GraduationCap,
  HelpCircle,
  Home,
  Monitor,
  Sparkles,
  UserCheck,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CTASection from '../components/CTASection'
import EmptyState from '../components/EmptyState'
import EnquiryModal from '../components/EnquiryModal'
import { courses } from '../data/coursesData'

function CourseDetailsPage() {
  const { id } = useParams()
  const course = courses.find((item) => item.id === id)
  const [openFaq, setOpenFaq] = useState(0)
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)

  if (!course) {
    return (
      <main className="container" style={{ padding: 'var(--space-12) 0' }}>
        <EmptyState
          title="Course not found"
          description="This course may have moved or is not currently available in our catalogue."
          actionLabel="Browse all courses"
          actionTo="/courses"
        />
      </main>
    )
  }

  const facts = [
    { icon: Clock3, label: 'Duration', value: course.duration },
    { icon: Monitor, label: 'Learning Mode', value: course.mode },
    { icon: UserCheck, label: 'Eligibility', value: course.eligibility },
    { icon: BadgeIndianRupee, label: 'Starting Fee', value: course.fee },
  ]

  const toggleFaq = (index) => {
    setOpenFaq((current) => (current === index ? -1 : index))
  }

  return (
    <main className="course-detail">
      {/* 1. BREADCRUMB */}
      <div className="breadcrumb-wrapper">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb__item">
              <Home size={14} aria-hidden="true" />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="breadcrumb__separator" aria-hidden="true" />
            <Link to="/courses" className="breadcrumb__item">
              <span>Courses</span>
            </Link>
            <ChevronRight size={14} className="breadcrumb__separator" aria-hidden="true" />
            <span className="breadcrumb__current" aria-current="page">
              {course.title}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. COURSE DETAIL HERO */}
      <section className="course-detail__hero">
        <div className="container course-detail__hero-grid">
          <div className="course-detail__hero-content">
            <span className="eyebrow course-detail__eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              {course.category}
            </span>
            <h1 className="course-detail__title">{course.title}</h1>
            <p className="course-detail__lead">{course.description}</p>

            <div className="course-detail__hero-actions">
              <button
                className="button button--primary"
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
              >
                <span>Enquire About This Course</span>
                <ArrowRight size={17} aria-hidden="true" />
              </button>
              <Link className="button button--secondary" to="/counselling">
                <span>Talk to Counsellor</span>
              </Link>
            </div>
          </div>

          <div className="course-detail__hero-media">
            <img
              src={course.image}
              alt={`${course.title} learning environment`}
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT & SIDEBAR */}
      <section className="course-detail__content">
        <div className="container course-detail__layout">
          {/* Main Column */}
          <article className="course-detail__main">
            {/* Overview */}
            <section className="detail-section">
              <h2 className="detail-section__title">About this program</h2>
              <p className="detail-section__text">{course.overview}</p>
            </section>

            {/* Curriculum */}
            <section className="detail-section">
              <h2 className="detail-section__title">What you will learn</h2>
              <ul className="check-list" role="list">
                {course.curriculum.map((item) => (
                  <li key={item} className="check-list__item">
                    <span className="check-list__icon" aria-hidden="true">
                      <CheckCircle2 size={18} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Career Opportunities */}
            <section className="detail-section">
              <h2 className="detail-section__title">Career opportunities</h2>
              <p className="detail-section__subtitle">
                Graduates of this program frequently pursue roles such as:
              </p>
              <div className="career-list">
                {course.careers.map((career) => (
                  <span key={career} className="career-chip">
                    {career}
                  </span>
                ))}
              </div>
            </section>

            {/* Admission Process */}
            <section className="detail-section">
              <h2 className="detail-section__title">Admission process</h2>
              <ol className="admission-list" role="list">
                <li className="admission-list__item">
                  <span className="admission-list__num">01</span>
                  <div className="admission-list__text">
                    <strong>Discuss your goals</strong>
                    <span>Speak with an advisor to ensure this course aligns with your future ambitions.</span>
                  </div>
                </li>
                <li className="admission-list__item">
                  <span className="admission-list__num">02</span>
                  <div className="admission-list__text">
                    <strong>Check eligibility</strong>
                    <span>Review qualification requirements and prepare necessary application documents.</span>
                  </div>
                </li>
                <li className="admission-list__item">
                  <span className="admission-list__num">03</span>
                  <div className="admission-list__text">
                    <strong>Apply with confidence</strong>
                    <span>Submit your application with dedicated guidance and enrolment timeline support.</span>
                  </div>
                </li>
              </ol>
            </section>

            {/* FAQs */}
            <section className="detail-section">
              <h2 className="detail-section__title">Frequently asked questions</h2>
              <div className="faq-list" role="region" aria-label="Course FAQs">
                {course.faqs.map(([question, answer], index) => {
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
                          aria-controls={`course-faq-${index}`}
                          id={`course-faq-btn-${index}`}
                        >
                          <span>{question}</span>
                          <ChevronDown size={20} aria-hidden="true" />
                        </button>
                      </h3>
                      <div
                        id={`course-faq-${index}`}
                        className="faq-item__answer"
                        role="region"
                        aria-labelledby={`course-faq-btn-${index}`}
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
          <aside className="course-detail__aside">
            <div className="course-facts">
              <h3 className="course-facts__title">At a glance</h3>
              <div className="course-facts__list">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="course-facts__item">
                    <span className="course-facts__icon" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                    <div className="course-facts__data">
                      <span className="course-facts__label">{label}</span>
                      <strong className="course-facts__value">{value}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="course-detail__help">
              <GraduationCap size={26} aria-hidden="true" />
              <h3>Need help deciding?</h3>
              <p>Get personalized guidance on whether this course fits your academic goals and career plans.</p>
              <button
                className="button button--accent course-detail__help-btn"
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
              >
                <span>Request Free Advice</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* 4. BOTTOM CTA */}
      <CTASection
        eyebrow="Your Next Step"
        title="Ready to Explore This Course Further?"
        description="Our counsellors can help you understand admission deadlines, eligibility criteria, and best-fit institutions."
        primaryLabel="Enquire About This Course"
        onPrimaryClick={() => setIsEnquiryOpen(true)}
        secondaryLabel="Talk to Counsellor"
        secondaryTo="/counselling"
      />

      {/* 5. ENQUIRY MODAL */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialCourse={course.title}
        contextName={course.title}
      />
    </main>
  )
}

export default CourseDetailsPage
