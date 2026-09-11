import {
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
  Users,
} from 'lucide-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BenefitSlider from '../components/BenefitSlider'
import HeroImageCard from '../components/HeroImageCard'
import EnquiryForm from '../components/EnquiryForm'
import { useEnquiry } from '../context/EnquiryContext'
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
  const { openEnquiry } = useEnquiry()
  const location = useLocation()

  useEffect(() => {
    const doScrollToContact = () => {
      const el = document.getElementById('contact') || document.getElementById('enquire')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    try {
      const shouldScroll = sessionStorage.getItem('scroll_to_contact')
      if (shouldScroll || window.location.hash === '#contact' || window.location.hash === '#enquire') {
        sessionStorage.removeItem('scroll_to_contact')
        setTimeout(doScrollToContact, 80)
        setTimeout(doScrollToContact, 350)
      }
    } catch {
      // ignore
    }

    if (window.location.hash && window.location.hash !== '#contact' && window.location.hash !== '#enquire') {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [location])

  return (
    <main className="home-page">
      {/* 1. MERGED HERO & WHY CHOOSE SECTION (Unified Card on Desktop & Mobile) */}
      <section className="home-hero-merged-section" aria-label="Welcome and Why Choose Sri Vaari Educational Groups">
        <div className="home-hero-merged-container">
          <div className="home-hero-merged-card">
            {/* Part 1: Top Welcome Split (Left: Hero Image Card, Right: Welcome Text) */}
            <div className="home-hero-split__grid">
              {/* Left: Hero Image Card */}
              <div className="home-hero-split__media">
                <HeroImageCard onEnquire={() => openEnquiry()} />
              </div>

              {/* Hero Content (Right on Desktop, Downside on Mobile) */}
              <div className="home-hero-split__content">
                <h1 className="home-hero-split__title-clean">
                  WELCOME TO SRI VAARI EDUCATIONAL GROUPS
                </h1>

                <div className="hero__check-paragraphs">
                  <p className="hero__check-para-text">
                    With over 27 years of experience, Sri Vaari Educational Groups has been a trusted guide for students aspiring to achieve academic excellence. Since our inception in 1997, we have proudly assisted more than 10,000 students in securing admissions to their dream colleges and top universities across the nation and abroad.
                  </p>

                  <p className="hero__check-para-text">
                    Our success is built on the foundation of an experienced and dedicated team passionate about transforming student aspirations into tangible achievements. By offering personalized career counselling, comprehensive aptitude assessments, and individual career roadmaps, we have established ourselves as a beacon of guidance for students seeking a brighter future.
                  </p>

                  <p className="hero__check-para-text">
                    From identifying the ideal career pathway in Medical, Engineering, Allied Health Sciences, or Management to navigating entrance cut-offs, state quota counselling, and transparent institutional admissions, our advisors provide end-to-end guidance tailored to each student's goals.
                  </p>

                  <p className="hero__check-para-text">
                    Join the thousands of successful doctors, engineers, and professionals who have trusted Sri Vaari Educational Groups to turn their ambitions into reality. Let us guide you on your journey toward enduring academic and career success.
                  </p>
                </div>

                <div className="hero__note">
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>Your initial counselling consultation is completely free of charge.</span>
                </div>
              </div>
            </div>

            {/* Part 2: Why Choose Us (Left: Text & 4 Pillars, Right: Visual Image) */}
            <div className="why-choose-banner__card-body">
              {/* Left Side: Text & Features */}
              <div className="why-choose-banner__text">
                <h2 className="why-choose-banner__title">
                  WHY CHOOSE SRI VAARI EDUCATIONAL GROUPS?
                </h2>

                <p className="why-choose-banner__desc">
                  Choosing Sri Vaari Educational Groups means partnering with dedicated educational advisors committed to your future. With over <strong>27 years of expertise</strong> and direct relationships with premier institutions, we transform confusing cut-offs and stressful admission procedures into a clear, confident path to your dream college.
                </p>

                {/* 4 Core Pillars */}
                <div className="why-choose-banner__grid">
                  <div className="why-choose-banner__feature">
                    <div className="why-choose-banner__feature-icon">
                      <Users size={18} aria-hidden="true" />
                    </div>
                    <div className="why-choose-banner__feature-content">
                      <h3 className="why-choose-banner__feature-title">Personalized 1-on-1 Mentorship</h3>
                      <p className="why-choose-banner__feature-desc">
                        Tailored course &amp; college shortlisting matching your 12th/UG cut-offs, aptitude, and budget.
                      </p>
                    </div>
                  </div>

                  <div className="why-choose-banner__feature">
                    <div className="why-choose-banner__feature-icon">
                      <Award size={18} aria-hidden="true" />
                    </div>
                    <div className="why-choose-banner__feature-content">
                      <h3 className="why-choose-banner__feature-title">100+ Verified Top Institutions</h3>
                      <p className="why-choose-banner__feature-desc">
                        Direct tie-ups with leading NAAC A++ &amp; NBA accredited Engineering, Medical &amp; Management colleges.
                      </p>
                    </div>
                  </div>

                  <div className="why-choose-banner__feature">
                    <div className="why-choose-banner__feature-icon">
                      <CheckCircle2 size={18} aria-hidden="true" />
                    </div>
                    <div className="why-choose-banner__feature-content">
                      <h3 className="why-choose-banner__feature-title">End-to-End Admission Support</h3>
                      <p className="why-choose-banner__feature-desc">
                        Complete guidance on TNEA/NEET counselling, application paperwork, quota seats, and enrollment.
                      </p>
                    </div>
                  </div>

                  <div className="why-choose-banner__feature">
                    <div className="why-choose-banner__feature-icon">
                      <ShieldCheck size={18} aria-hidden="true" />
                    </div>
                    <div className="why-choose-banner__feature-content">
                      <h3 className="why-choose-banner__feature-title">100% Ethical &amp; Transparent</h3>
                      <p className="why-choose-banner__feature-desc">
                        Zero hidden fees, transparent fee structures, and dedicated scholarship &amp; education loan support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Visual Image with Badges */}
              <div className="why-choose-banner__visual hero__visual">
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
                    <strong>27+ Years &amp; 10,000+ Students</strong>
                    <span>Securing admissions across the nation</span>
                  </div>
                </div>
                <div className="hero__accent" aria-hidden="true" />
              </div>
            </div>
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


      {/* 4b. BENEFITS & CORE STRENGTHS SLIDER */}
      <section className="home-section home-section--tint">
        <div className="container home-benefit-container">
          <SectionHeading
            eyebrow="Key Advantages"
            title="Guidance Built with Care & Integrity."
            description="We don't believe in one-size-fits-all advice. We tailor every recommendation to your individual strengths, career ambitions, and family budget."
          />

          <BenefitSlider />
        </div>
      </section>

      {/* 5. PHOTO GALLERY (Layered PhotoStack Section) */}
      <div id="gallery">
        <GallerySection />
      </div>

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
    </main>
  )
}

export default HomePage
