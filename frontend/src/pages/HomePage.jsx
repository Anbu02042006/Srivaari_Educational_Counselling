import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  HeartHandshake,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import BenefitSlider from '../components/BenefitSlider'
import EnquiryForm from '../components/EnquiryForm'
import EnquiryModal from '../components/EnquiryModal'
import GallerySection from '../components/GallerySection'
import SectionHeading from '../components/SectionHeading'
import StatCounter from '../components/StatCounter'
import TestimonialSlider from '../components/TestimonialSlider'
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
      {/* 1. ABOUT PATHWAY / WHO WE ARE (Below Navigation Bar) */}
      <section className="home-section home-section--about">
        <div className="container about-split">
          <div className="about-split__media">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
              alt="Education counselling session"
              loading="lazy"
            />
            <div className="about-split__floating-card">
              <ShieldCheck size={24} className="about-split__floating-icon" aria-hidden="true" />
              <div>
                <strong>100% Unbiased Advice</strong>
                <span>Matching students to verified programs</span>
              </div>
            </div>
          </div>

          <div className="about-split__content">
            <SectionHeading
              eyebrow="Who We Are"
              title="Personalized Guidance Built Around Your Ambition."
              description="Sri Vaari Educational Counselling is dedicated to helping students navigate the complex world of higher education with clarity, confidence, and human-first counselling."
            />

            <div className="about-split__points">
              <div className="about-split__point">
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>Customised course recommendations aligned with your long-term goals.</span>
              </div>
              <div className="about-split__point">
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>Direct admission support and transparent timeline management.</span>
              </div>
              <div className="about-split__point">
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>Verified partnerships with recognized autonomous colleges and universities.</span>
              </div>
            </div>

            <div className="about-split__action">
              <Link className="button button--primary" to="/about">
                <span>Learn More About Us</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
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
              Education Guidance Made Clear
            </span>

            <h1 className="hero__title">
              Find the Right Path. <br />
              <span>Build the Future You Want.</span>
            </h1>

            <p className="hero__lead">
              Discover verified courses, top-tier colleges, and career directions tailored to your ambitions — with personalized counselling at every important milestone.
            </p>

            <div className="hero__actions">
              <Link className="button button--primary hero__btn-primary" to="/services">
                <span>Explore Our Services</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <button
                className="button button--secondary hero__btn-secondary"
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
              >
                <span>Talk to a Counsellor</span>
              </button>
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
                alt="Students collaborating on campus"
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
            title="Guidance Designed Around Your Success."
            description="We eliminate confusion and replace guesswork with structured, student-first consultancy services."
          />

          <BenefitSlider />
        </div>
      </section>

      {/* 5. PHOTO GALLERY (Curated Preview with View Gallery Link) */}
      <GallerySection showViewAll={true} />

      {/* 6. STUDENT TESTIMONIALS */}
      <section className="home-section home-section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="Student Stories"
            title="Confidence Starts With the Right Conversation."
            description="Real experiences from students and families who discovered clarity and academic direction through our guidance."
          />

          <div className="testimonials-showcase">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* 7. CONTACT / DIRECT ENQUIRY */}
      <section className="home-section" id="enquire" aria-label="Contact and Enquiry">
        <div className="container contact-layout">
          {/* Left Column: Direct Contact Details */}
          <div className="contact-details">
            <SectionHeading
              eyebrow="Get in Touch"
              title="Start Your Guidance Journey Today."
              description="Reach our advisory desk directly or send us your details. A senior education counsellor will connect with you for a personalized session."
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
                  <MessageCircle size={20} />
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
