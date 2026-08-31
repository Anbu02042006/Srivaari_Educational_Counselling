import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import SectionHeading from '../components/SectionHeading'
import { contactInfo } from '../data/contactInfo'

function ContactPage() {
  return (
    <main className="contact-page">
      {/* 1. HERO */}
      <header className="page-hero">
        <div className="container">
          <span className="eyebrow page-hero__eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            Contact Pathway Education
          </span>
          <h1 className="page-hero__title">Let’s Start a Conversation.</h1>
          <p className="page-hero__lead">
            Reach out with any questions, arrange a consultation, or submit an enquiry and our team will get back to you promptly.
          </p>
        </div>
      </header>

      {/* 2. CONTACT CONTENT */}
      <section className="home-section">
        <div className="container contact-layout">
          {/* Left Column: Direct Contact Details & Location */}
          <div className="contact-details">
            <SectionHeading
              eyebrow="Get in Touch"
              title="We Are Here to Help."
              description="Reach our advisory desk through phone, email, WhatsApp, or visit our education office."
            />

            <div className="contact-cards-grid">
              {/* Phone */}
              <a href={contactInfo.phoneHref} className="contact-card">
                <span className="contact-card__icon" aria-hidden="true">
                  <Phone size={20} />
                </span>
                <div className="contact-card__info">
                  <small className="contact-card__label">Phone Support</small>
                  <strong className="contact-card__value">{contactInfo.phoneDisplay}</strong>
                </div>
              </a>

              {/* Email */}
              <a href={contactInfo.emailHref} className="contact-card">
                <span className="contact-card__icon" aria-hidden="true">
                  <Mail size={20} />
                </span>
                <div className="contact-card__info">
                  <small className="contact-card__label">Email Address</small>
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
                  <MessageCircle size={20} />
                </span>
                <div className="contact-card__info">
                  <small className="contact-card__label">WhatsApp Chat</small>
                  <strong className="contact-card__value">Message our counsellor</strong>
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
              <strong className="map-placeholder__title">Pathway Advisory Center</strong>
              <span className="map-placeholder__address">{contactInfo.officeLocation}</span>
              <span className="map-placeholder__note">In-person consultations available by appointment</span>
            </div>
          </div>

          {/* Right Column: Contact Form Panel */}
          <div className="enquiry-panel">
            <div className="enquiry-panel__header">
              <span className="eyebrow">Send an Enquiry</span>
              <h2 className="enquiry-panel__title">We would love to hear from you.</h2>
              <p className="enquiry-panel__desc">
                Fill in your contact details and message below; an education counsellor will respond within 24 hours.
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
