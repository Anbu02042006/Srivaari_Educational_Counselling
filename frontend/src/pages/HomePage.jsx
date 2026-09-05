import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock3,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BenefitSlider from '../components/BenefitSlider'
import HeroImageCard from '../components/HeroImageCard'
import EnquiryForm from '../components/EnquiryForm'
import EnquiryModal from '../components/EnquiryModal'
import GallerySection from '../components/GallerySection'
import SectionHeading from '../components/SectionHeading'
import StatCounter from '../components/StatCounter'
import TestimonialSlider from '../components/TestimonialSlider'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { contactInfo } from '../data/contactInfo'
import { benefits } from '../data/homeData'

const statsData = [
  { value: '500+', label: 'Courses & Programs', icon: BookOpen },
  { value: '100+', label: 'Partner Institutions', icon: Award },
  { value: '10K+', label: 'Students Guided', icon: Users },
  { value: '95%', label: 'Student Satisfaction', icon: HeartHandshake },
]

function HomePage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // If navigated from another page via scrollToContact
    try {
      const shouldScroll = sessionStorage.getItem('scroll_to_contact')
      if (shouldScroll) {
        sessionStorage.removeItem('scroll_to_contact')
        const el = document.getElementById('contact') || document.getElementById('enquire')
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 150)
        }
      }
    } catch {
      // ignore
    }

    // Clear any hash if present so page refreshes stay at the top
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [location])

  return (
    <main className="home-page">
      {/* 1. TOP HERO SECTION (Split on Desktop, Compact on Mobile) */}
      <section className="home-hero-split">
        <div className="container home-hero-split__grid">
          {/* Left: Hero Image Card */}
          <div className="home-hero-split__media">
            <HeroImageCard onEnquire={() => setIsEnquiryOpen(true)} />
          </div>

          {/* Right: Desktop Hero Content (Only shown on Desktop view) */}
          <div className="home-hero-split__content desktop-only-hero">
            <span className="eyebrow home-hero-split__eyebrow">
              <Sparkles size={16} aria-hidden="true" className="home-hero-split__eyebrow-icon" />
              PERSONAL, CARING EDUCATION COUNSELLING
            </span>

            <h1 className="home-hero-split__title">
              Find Your Ideal College. <br />
              <span className="home-hero-split__title-accent">
                Step Confidently Into{' '}
                <span className="home-hero-split__highlight">
                  Tomorrow
                  <svg
                    className="home-hero-split__underline-svg"
                    viewBox="0 0 240 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 14C50 4 150 2 237 12C180 18 80 18 20 16"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            <p className="home-hero-split__lead">
              At Sri Vaari, we help students discover the right colleges and career paths that match their interests and ambitions. From expert guidance to end-to-end admission support, we are with you at every step of your academic journey.
            </p>

            {/* Core Value Highlights (Clean Compact Text Content) */}
            <div className="home-hero-split__highlights">
              <div className="home-hero-split__highlight-item">
                <CheckCircle2 size={17} className="home-hero-split__highlight-icon" aria-hidden="true" />
                <span><strong>Top Medical & Engineering Colleges:</strong> Guidance for premier NMC & AICTE recognized institutions across Tamil Nadu, Puducherry, Karnataka & Abroad.</span>
              </div>
              <div className="home-hero-split__highlight-item">
                <CheckCircle2 size={17} className="home-hero-split__highlight-icon" aria-hidden="true" />
                <span><strong>Cut-off & Rank Mapping:</strong> Accurate marks-to-rank evaluation with category-wise seat matrix and cutoff analysis.</span>
              </div>
              <div className="home-hero-split__highlight-item">
                <CheckCircle2 size={17} className="home-hero-split__highlight-icon" aria-hidden="true" />
                <span><strong>Management & NRI Quota Support:</strong> Transparent fee structures and verified seat reservation guidance.</span>
              </div>
              <div className="home-hero-split__highlight-item">
                <CheckCircle2 size={17} className="home-hero-split__highlight-icon" aria-hidden="true" />
                <span><strong>End-to-End Admission Support:</strong> Dedicated 1-on-1 parent & student counselling from choice filling to campus reporting.</span>
              </div>
              <div className="home-hero-split__highlight-item">
                <CheckCircle2 size={17} className="home-hero-split__highlight-icon" aria-hidden="true" />
                <span><strong>Scholarship & Educational Aid:</strong> Assistance with institutional fee concessions and education loan documentation.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SRI VAARI SECTION */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <span className="eyebrow hero__eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              About Sri Vaari
            </span>

            <h2 className="hero__title">
              Guiding Students Towards <br />
              <span>Better Futures</span>
            </h2>

            <p className="hero__lead">
              Confused about courses, cut-offs, or college options? We sit down with you and your parents to help you choose the right academic path with complete clarity and trusted advice.
            </p>

            <div className="hero__features">
              <div className="hero__feature-item">
                <CheckCircle2 size={16} className="hero__feature-icon" aria-hidden="true" />
                <span><strong>Personalized Academic Roadmap:</strong> Tailored college shortlists matching your rank, budget, and career ambitions.</span>
              </div>
              <div className="hero__feature-item">
                <CheckCircle2 size={16} className="hero__feature-icon" aria-hidden="true" />
                <span><strong>Verified Seat Matrix & Fee Clarity:</strong> Transparent cut-off analysis, scholarship assistance, and genuine guidance.</span>
              </div>
              <div className="hero__feature-item">
                <CheckCircle2 size={16} className="hero__feature-icon" aria-hidden="true" />
                <span><strong>Direct Choice Filling Guidance:</strong> Step-by-step assistance through state & national counselling rounds.</span>
              </div>
            </div>

            <div className="hero__actions">
              <Link className="button button--primary hero__btn-primary" to="/colleges">
                <span>Explore Colleges</span>
              </Link>
              <Link
                className="button button--secondary hero__btn-secondary"
                to="/about"
              >
                <span>About Us</span>
              </Link>
            </div>

            <div className="hero__note">
              <CheckCircle2 size={16} aria-hidden="true" />
              <span>Your initial counselling consultation is completely free of charge.</span>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-wrapper">
              <img
                src="/images/indian-admissions-guidance.jpg"
                alt="Indian students and counsellor discussing academic roadmap"
                loading="eager"
              />
            </div>
            <div className="hero__badge">
              <div className="hero__badge-icon">
                <GraduationCap size={22} aria-hidden="true" />
              </div>
              <div className="hero__badge-text">
                <strong>10,000+ Students</strong>
                <span>Guided into top institutions</span>
              </div>
            </div>
            <div className="hero__accent" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* 3. IMPACT STATISTICS */}
      <section className="stats-section" aria-label="Key statistics">
        <div className="container stats-grid">
          {statsData.map(({ value, label, icon: Icon }) => (
            <StatCounter
              key={label}
              value={value}
              label={label}
              icon={Icon}
              className="stat-card--ribbon"
            />
          ))}
        </div>
      </section>

      {/* 4. OUR SERVICES / WHY CHOOSE US (Slideshow) */}
      <section className="home-section home-section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="Why Choose Sri Vaari"
            title="Guidance Built with Care & Integrity."
            description="We don't believe in one-size-fits-all advice. We tailor every recommendation to your individual strengths, career ambitions, and family budget."
          />

          <BenefitSlider />
        </div>
      </section>

      {/* 5. PHOTO GALLERY (Layered PhotoStack Section) */}
      <GallerySection showViewAll={true} />

      {/* 6. STUDENT TESTIMONIALS */}
      <section className="home-section home-section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="Real Student Experiences"
            title="Stories of Clarity, Relief & Success."
            description="Hear how students and families found peace of mind and secured admissions into top colleges through our patient guidance."
          />

          <div className="testimonials-showcase">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* 7. CONTACT / DIRECT ENQUIRY */}
      <section className="home-section" id="contact" aria-label="Contact and Enquiry">
        <div className="container contact-layout">
          {/* Left Column: Direct Contact Details */}
          <div className="contact-details">
            <SectionHeading
              eyebrow="Get in Touch"
              title="Let’s Talk About Your Future."
              description="Reach our advisory desk directly or leave your details below. A caring senior counsellor will connect with you for a personalized session."
            />

            <div className="contact-cards-grid">
              <a href={contactInfo.phoneHref} className="contact-card">
                <span className="contact-card__icon" aria-hidden="true">
                  <Phone size={20} />
                </span>
                <div className="contact-card__info">
                  <small className="contact-card__label">Direct Call</small>
                  <strong className="contact-card__value">{contactInfo.phoneDisplay}</strong>
                </div>
              </a>

              <a href={contactInfo.emailHref} className="contact-card">
                <span className="contact-card__icon" aria-hidden="true">
                  <Mail size={20} />
                </span>
                <div className="contact-card__info">
                  <small className="contact-card__label">Email Support</small>
                  <strong className="contact-card__value">{contactInfo.email}</strong>
                </div>
              </a>

              <a
                href={contactInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-card contact-card--whatsapp"
              >
                <span className="contact-card__icon contact-card__icon--whatsapp" aria-hidden="true">
                  <WhatsAppIcon size={20} />
                </span>
                <div className="contact-card__info">
                  <small className="contact-card__label">WhatsApp</small>
                  <strong className="contact-card__value">Chat with a Counsellor</strong>
                </div>
              </a>

              <div className="contact-card contact-card--static">
                <span className="contact-card__icon" aria-hidden="true">
                  <Clock3 size={20} />
                </span>
                <div className="contact-card__info">
                  <small className="contact-card__label">Office Hours</small>
                  <strong className="contact-card__value">{contactInfo.officeHours}</strong>
                </div>
              </div>
            </div>

            {/* Map & In-Person Advisory Card */}
            <div className="map-placeholder">
              <div className="map-placeholder__icon-wrapper">
                <MapPin size={28} aria-hidden="true" />
              </div>
              <strong className="map-placeholder__title">Sri Vaari Advisory Center</strong>
              <span className="map-placeholder__address">{contactInfo.officeLocation}</span>
              <span className="map-placeholder__note">In-person counselling sessions available by appointment</span>
            </div>
          </div>

          {/* Right Column: Direct Enquiry Form Panel */}
          <div className="enquiry-panel">
            <div className="enquiry-panel__header">
              <span className="eyebrow">Direct Enquiry</span>
              <h2 className="enquiry-panel__title">Request for counselling</h2>
              <p className="enquiry-panel__desc">
                Fill in your details below to schedule a 1-on-1 personalized academic guidance session.
              </p>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* GLOBAL ENQUIRY MODAL (For Header/Hero CTAs) */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </main>
  )
}

export default HomePage
