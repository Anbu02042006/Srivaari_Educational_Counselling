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
import { useState } from 'react'
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

  return (
    <main className="services-page">
      {/* 1. HERO */}
      <header className="page-hero">
        <div className="container">
          <span className="eyebrow page-hero__eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            How We Can Help
          </span>
          <h1 className="page-hero__title">
            Useful Support for Every Education Decision.
          </h1>
          <p className="page-hero__lead">
            Choose the guidance you need today; our counsellors will make the path ahead clear, structured, and achievable.
          </p>

          <div className="hero__actions" style={{ marginTop: 'var(--space-6)' }}>
            <button
              className="button button--primary"
              type="button"
              onClick={() => setIsEnquiryOpen(true)}
            >
              <span>Request Free Counselling</span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>
            <Link className="button button--secondary" to="/contact">
              <span>Contact Advisory Desk</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. SERVICES GRID */}
      <section className="home-section">
        <div className="container">
          <SectionHeading
            eyebrow="Our Guidance Areas"
            title="Comprehensive Services Tailored to Your Journey."
            description="From early goal discovery to application submission, explore how our advisors support you at every milestone."
          />

          <div className="services-catalog-grid">
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
        </div>
      </section>

      {/* 3. FEATURED WORKFLOW (How We Help Timeline) */}
      <section className="home-section home-section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="Structured Process"
            title="How We Guide You Step by Step."
            description="Our simple, reliable four-step framework turns confusion into confident admission."
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
