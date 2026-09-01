import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import BenefitSlider from '../components/BenefitSlider'
import EducationSlideshow from '../components/EducationSlideshow'
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

  return (
    <main className="home-page">
      {/* 1. TOP HERO CARD (Below Navigation Bar) */}
      <section className="home-section home-section--about">
        <div className="container">
          <div className="about-split__media">
            <HeroImageCard onEnquire={() => setIsEnquiryOpen(true)} />

            <div className="desktop-only">
              <EducationSlideshow onEnquire={() => setIsEnquiryOpen(true)} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. HERO / INTRODUCTION */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <span className="eyebrow hero__eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              Personal, Caring Education Counselling
            </span>

            <h1 className="hero__title">
              Find Your Ideal College. <br />
              <span>Step Confidently Into Tomorrow.</span>
            </h1>

            <p className="hero__lead">
              Confused about courses, cut-offs, or college options? We sit down with you and your parents to help you choose the right academic path with complete clarity.
            </p>

            <div className="hero__actions">
              <Link className="button button--primary hero__btn-primary" to="/services">
                <span>Explore Our Services</span>
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
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=85"
                alt="Students discussing academic roadmaps"
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
              <h2 className="enquiry-panel__title">Request Free Counselling</h2>
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
