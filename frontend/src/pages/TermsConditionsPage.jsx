import {
  Building2,
  CheckCircle2,
  GraduationCap,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Scale,
  ShieldCheck,
} from 'lucide-react'
import { useEffect } from 'react'
import { useEnquiry } from '../context/EnquiryContext'
import { contactInfo } from '../data/contactInfo'
import WhatsAppIcon from '../components/WhatsAppIcon'

const termsCards = [
  {
    number: '01',
    icon: GraduationCap,
    title: 'Advisory Scope',
    badge: 'Mentorship',
    points: [
      'Free career mentorship, cut-off insights, and course selection across Engineering, Medical & Abroad.',
      'We operate strictly as admissions advisors and mentors, not as an examining body or university.',
    ],
  },
  {
    number: '02',
    icon: Landmark,
    title: 'Institutional Discretion',
    badge: 'Admissions',
    points: [
      'Final admissions and seat allotments are determined solely by colleges and official boards (MCC/TNEA).',
      'Guidance is benchmarked against verified historic cut-offs; no unauthorized seat guarantees.',
    ],
  },
  {
    number: '03',
    icon: Building2,
    title: 'Direct College Fees',
    badge: '100% Direct',
    points: [
      'All tuition, exam, and hostel fees must be paid directly to the official bank account of the college.',
      'Sri Vaari never accepts or collects cash tuition fees, donations, or capitation deposits.',
    ],
  },
  {
    number: '04',
    icon: Scale,
    title: 'Compliance & Legal',
    badge: 'Confidential',
    points: [
      'Authentic academic records required. Overseas admissions follow NMC and foreign embassy guidelines.',
      'Student data is kept strictly confidential. Governed by Indian law under Tamil Nadu jurisdiction.',
    ],
  },
]

function TermsConditionsPage() {
  const { openEnquiry } = useEnquiry()

  useEffect(() => {
    document.title = 'Terms & Conditions | Sri Vaari Educational Counselling'
  }, [])

  return (
    <main className="terms-page">
      <div className="terms-container">
        {/* 1. Ultra-compact Header */}
        <header className="terms-header-compact">
          <div className="terms-header-compact__eyebrow">
            <ShieldCheck size={12} aria-hidden="true" />
            <span>TRANSPARENCY &amp; OPERATIONAL STANDARDS</span>
          </div>

          <h1 className="terms-header-compact__title">
            Terms &amp; <span className="terms-header-compact__title-highlight">Conditions</span>
          </h1>

          <p className="terms-header-compact__subtitle">
            Essential operational standards, advisory scope, and direct payment guidelines for students and guardians.
          </p>

          <div className="terms-header-compact__badges">
            <span className="terms-header-badge-item">
              <CheckCircle2 size={12} aria-hidden="true" />
              100% Ethical Advisory
            </span>
            <span className="terms-header-badge-dot" aria-hidden="true">•</span>
            <span className="terms-header-badge-item">
              <CheckCircle2 size={12} aria-hidden="true" />
              Direct College Payments
            </span>
            <span className="terms-header-badge-dot" aria-hidden="true">•</span>
            <span className="terms-header-badge-item">
              <CheckCircle2 size={12} aria-hidden="true" />
              No Capitation Fees
            </span>
            <span className="terms-header-badge-dot" aria-hidden="true">•</span>
            <span className="terms-header-badge-item">
              <CheckCircle2 size={12} aria-hidden="true" />
              Tamil Nadu Jurisdiction
            </span>
          </div>
        </header>

        {/* 2. Compact 2x2 Bento Grid (4 Core Pillars) */}
        <div className="terms-bento-grid">
          {termsCards.map((card) => {
            const Icon = card.icon
            return (
              <section key={card.number} className="terms-card" aria-labelledby={`card-title-${card.number}`}>
                <div className="terms-card__header">
                  <div className="terms-card__header-left">
                    <div className="terms-card__icon-wrap">
                      <Icon size={16} aria-hidden="true" />
                    </div>
                    <h2 id={`card-title-${card.number}`} className="terms-card__title">
                      {card.title}
                    </h2>
                  </div>
                  <span className="terms-card__badge">{card.badge}</span>
                </div>

                <ul className="terms-card__points">
                  {card.points.map((pt, idx) => (
                    <li key={idx} className="terms-card__point">
                      {pt}
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>

        {/* 3. Compact Bottom Trust & Help Bar */}
        <footer className="terms-bottom-bar">
          <div className="terms-bottom-bar__info">
            <span className="terms-bottom-bar__tag">
              <ShieldCheck size={13} aria-hidden="true" />
              Certified Mentorship
            </span>
            <div className="terms-bottom-bar__contacts">
              <a href={contactInfo.phoneHref} className="terms-bottom-bar__link">
                <Phone size={12} aria-hidden="true" />
                <span>{contactInfo.phoneDisplay}</span>
              </a>
              <span className="terms-bottom-bar__dot" aria-hidden="true">•</span>
              <a href={contactInfo.emailHref} className="terms-bottom-bar__link">
                <Mail size={12} aria-hidden="true" />
                <span>{contactInfo.email}</span>
              </a>
              <span className="terms-bottom-bar__dot" aria-hidden="true">•</span>
              <span className="terms-bottom-bar__text">
                <MapPin size={12} aria-hidden="true" />
                <span>Tamil Nadu, India</span>
              </span>
            </div>
          </div>

          <div className="terms-bottom-bar__actions">
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="button button--primary terms-bottom-bar__btn"
            >
              <span>Free Counselling</span>
            </button>
            <a
              href={contactInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="terms-bottom-bar__whatsapp"
            >
              <WhatsAppIcon size={14} color="#ffffff" />
              <span>WhatsApp</span>
            </a>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default TermsConditionsPage
