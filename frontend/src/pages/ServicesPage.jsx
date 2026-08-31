import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Compass,
  FileCheck2,
  Globe2,
  GraduationCap,
  Lightbulb,
  Sparkles,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import EnquiryModal from '../components/EnquiryModal'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import { processSteps } from '../data/homeData'

const services = [
  {
    icon: Compass,
    title: 'Career Counselling',
    text: 'Understand your personal strengths, interests, and the career directions worth exploring.',
  },
  {
    icon: Lightbulb,
    title: 'Course Selection',
    text: 'Compare syllabus content, study modes, durations, and future growth possibilities across disciplines.',
  },
  {
    icon: GraduationCap,
    title: 'College Selection',
    text: 'Shortlist recognized institutions that fit your budget, location priorities, and campus culture.',
  },
  {
    icon: FileCheck2,
    title: 'Admission Assistance',
    text: 'Stay organized through every application step with dedicated timeline tracking and check-ins.',
  },
  {
    icon: Globe2,
    title: 'Study Abroad Guidance',
    text: 'Explore global academic pathways, visa prerequisites, and institution accreditations with clarity.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Skill Development',
    text: 'Identify certified, high-demand upskilling programs that directly accelerate your career growth.',
  },
  {
    icon: BadgeCheck,
    title: 'Application Support',
    text: 'Review documentation, entrance prerequisites, and statements of purpose with calm expert feedback.',
  },
]

function ServicesPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  const viewportRef = useRef(null)

  const handleScroll = () => {
    if (!viewportRef.current) return
    const { scrollLeft, offsetWidth } = viewportRef.current
    if (offsetWidth > 0) {
      const newIndex = Math.round(scrollLeft / offsetWidth)
      if (newIndex !== mobileActiveIndex && newIndex >= 0 && newIndex < services.length) {
        setMobileActiveIndex(newIndex)
      }
    }
  }

  const scrollToIndex = (index) => {
    if (viewportRef.current) {
      const width = viewportRef.current.offsetWidth
      viewportRef.current.scrollTo({
        left: index * width,
        behavior: 'smooth',
      })
    }
    setMobileActiveIndex(index)
  }

  return (
    <main className="services-page">
      {/* 1. HERO */}
      <header className="page-hero">
        <div className="container">
          <span className="eyebrow page-hero__eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            Support When You Need It Most
          </span>
          <h1 className="page-hero__title">
            Patient, Clear Guidance for Every College Decision.
          </h1>
          <p className="page-hero__lead">
            Whether you are feeling lost about your 12th cut-off, choosing between degrees, or planning your budget, our counsellors are here to guide you step-by-step.
          </p>

          <div className="hero__actions" style={{ marginTop: 'var(--space-4)' }}>
            <button
              className="button button--primary"
              type="button"
              onClick={() => setIsEnquiryOpen(true)}
            >
              <span>Request Free Counselling</span>
            </button>
            <Link className="button button--secondary" to="/contact">
              <span>Contact Advisory Desk</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. SERVICES GRID & MOBILE SLIDER */}
      <section className="home-section">
        <div className="container">
          <SectionHeading
            eyebrow="How We Support You"
            title="Practical Help for Every Step of Admission."
            description="From initial branch shortlisting to application paperwork, scholarship support, and campus visits, we make your journey peaceful and organized."
          />

          {/* Desktop 3-Column Grid (Hidden on Mobile) */}
          <div className="services-catalog-grid services-catalog-grid--desktop">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.text}
                icon={service.icon}
                number={`0${index + 1}`}
                actionLabel="Request Counselling"
                to="/contact"
              />
            ))}
          </div>

          {/* Mobile Only: Smooth Hardware-Accelerated 7 Cards Slideshow */}
          <div
            className="service-slider service-slider--mobile"
            role="region"
            aria-label="Services carousel"
          >
            <div
              ref={viewportRef}
              className="service-slider__viewport"
              onScroll={handleScroll}
            >
              <div className="service-slider__track">
                {services.map((service, index) => (
                  <div key={service.title} className="service-slider__slide">
                    <ServiceCard
                      title={service.title}
                      description={service.text}
                      icon={service.icon}
                      number={`0${index + 1}`}
                      actionLabel="Request Counselling"
                      to="/contact"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Centered Pagination Indicator Dots */}
            <div className="service-slider__controls">
              <div className="service-slider__dots" role="tablist" aria-label="Service slides">
                {services.map((service, index) => (
                  <button
                    key={service.title}
                    type="button"
                    role="tab"
                    aria-selected={mobileActiveIndex === index}
                    aria-label={`Go to service ${index + 1} (${service.title})`}
                    className={`service-slider__dot ${mobileActiveIndex === index ? 'is-active' : ''}`}
                    onClick={() => scrollToIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED WORKFLOW (How We Help Timeline) */}
      <section className="home-section home-section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="Simple 4-Step Journey"
            title="How We Help You Get Started."
            description="No complicated bureaucracy. Just a relaxed conversation, honest recommendations, and direct admission support."
            align="center"
          />

          <ol className="process-list">
            {processSteps.map(([number, title, text]) => (
              <li key={number} className="process-list__item">
                <span className="process-list__number">{number}</span>
                <div className="process-list__body">
                  <h3 className="process-list__title">{title}</h3>
                  <p className="process-list__text">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. SERVICES CTA */}
      <CTASection
        eyebrow="Personalized Support"
        title="Ready to Discuss Your Academic Future?"
        description="Connect with a senior education advisor today and get a customized recommendation report."
        primaryLabel="Schedule Free Consultation"
        primaryTo="/contact"
        secondaryLabel="View Photo Gallery"
        secondaryTo="/gallery"
      />

      {/* 5. ENQUIRY MODAL */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </main>
  )
}

export default ServicesPage
