import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import SectionHeading from '../components/SectionHeading'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { contactInfo } from '../data/contactInfo'

function ContactPage() {
  return (
    <main className="contact-page">
      {/* 1. HERO */}
      <header className="page-hero contact-hero">
        <div className="container contact-hero__container">
          <div className="contact-hero__eyebrow">
            <span className="contact-hero__eyebrow-line" aria-hidden="true" />
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="contact-hero__title">
            Let’s Sit Down and Talk About <span className="text-highlight">Your Future</span>.
          </h1>
          <p className="contact-hero__lead">
            Have questions about cut-offs, college fees, seats, or courses? Give us a call or drop us a message anytime for honest, caring guidance.
          </p>

          <div className="contact-hero__features">
            <div className="contact-hero__feature-item">
              <div className="contact-hero__feature-icon">
                <Phone size={16} aria-hidden="true" />
              </div>
              <span className="contact-hero__feature-text">
                Direct Call &
                <br />
                WhatsApp Support
              </span>
            </div>

            <div className="contact-hero__feature-divider" aria-hidden="true" />

            <div className="contact-hero__feature-item">
              <div className="contact-hero__feature-icon">
                <Clock3 size={16} aria-hidden="true" />
              </div>
              <span className="contact-hero__feature-text">
                Quick 15-Min
                <br />
                Response Time
              </span>
            </div>

            <div className="contact-hero__feature-divider" aria-hidden="true" />

            <div className="contact-hero__feature-item">
              <div className="contact-hero__feature-icon">
                <Sparkles size={16} aria-hidden="true" />
              </div>
              <span className="contact-hero__feature-text">
                100% Free
                <br />
                Consultation
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CONTACT CONTENT */}
      <section className="home-section">
        <div className="container contact-layout">
          {/* Left Column: Direct Contact Details & Location */}
          <div className="contact-details">
            <SectionHeading
              eyebrow="Direct Contact"
              title="Reach Out Whenever You Need Us."
              description="Speak directly with a caring counsellor who will listen attentively to your goals and worries."
            />

            <div className="contact-cards-grid">
              {/* Phone */}
              <a href={contactInfo.phoneHref} className="contact-card">
                <span className="contact-card__icon" aria-hidden="true">
                  <Phone size={20} />
                </span>
                <div className="contact-card__info">
                  <small className="contact-card__label">Direct Call</small>
                  <strong className="contact-card__value">{contactInfo.phoneDisplay}</strong>
                </div>
              </a>

              {/* Email */}
              <a href={contactInfo.emailHref} className="contact-card">
                <span className="contact-card__icon" aria-hidden="true">
                  <Mail size={20} />
                </span>
                <div className="contact-card__info">
                  <small className="contact-card__label">Email Support</small>
                  <strong className="contact-card__value">{contactInfo.email}</strong>
                </div>
              </a>

              {/* WhatsApp */}
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
                  <small className="contact-card__label">WhatsApp Chat</small>
                  <strong className="contact-card__value">Chat with a Counsellor</strong>
                </div>
              </a>

              {/* Office Hours */}
              <div className="contact-card contact-card--static">
                <span className="contact-card__icon" aria-hidden="true">
                  <Clock3 size={20} />
                </span>
                <div className="contact-card__info">
                  <small className="contact-card__label">Office Hours</small>
                  <strong className="contact-card__value">{contactInfo.officeHours}</strong>
                </div>
              </div>

              {/* Location */}
              <div className="contact-card contact-card--static">
                <span className="contact-card__icon" aria-hidden="true">
                  <MapPin size={20} />
                </span>
                <div className="contact-card__info">
                  <small className="contact-card__label">Headquarters</small>
                  <strong className="contact-card__value">{contactInfo.officeLocation}</strong>
                </div>
              </div>
            </div>

            {/* Map Placeholder Card */}
            <div className="map-placeholder">
              <div className="map-placeholder__icon-wrapper">
                <MapPin size={28} aria-hidden="true" />
              </div>
              <strong className="map-placeholder__title">Sri Vaari Advisory Center</strong>
              <span className="map-placeholder__address">{contactInfo.officeLocation}</span>
              <span className="map-placeholder__note">In-person counselling sessions available by appointment</span>
            </div>
          </div>

          {/* Right Column: Contact Form Panel */}
          <div className="enquiry-panel">
            <div className="enquiry-panel__header">
              <span className="eyebrow">Direct Counselling Enquiry</span>
              <h2 className="enquiry-panel__title">Request a Free 1-on-1 Callback.</h2>
              <p className="enquiry-panel__desc">
                Leave your details below and a senior counsellor will personally connect with you to guide you through your options.
              </p>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
