import {
  CheckCircle2,
  Compass,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import SectionHeading from '../components/SectionHeading'

const counsellingFeatures = [
  {
    icon: Compass,
    title: 'Personalized Mentorship',
    desc: 'Advice shaped strictly around your academic strengths, budget, and long-term ambitions.',
  },
  {
    icon: Lightbulb,
    title: 'Curriculum & Course Fit',
    desc: 'Deep comparison of syllabus modules, specializations, and real-world career trajectories.',
  },
  {
    icon: GraduationCap,
    title: 'Institution Shortlisting',
    desc: 'Unbiased evaluation of autonomous colleges, design schools, and accredited universities.',
  },
  {
    icon: ShieldCheck,
    title: 'Application & Visa Help',
    desc: 'Clear guidance on timelines, eligibility requirements, and application portfolios.',
  },
]

function CounsellingPage() {
  return (
    <main className="counselling-page">
      {/* 1. HERO */}
      <section className="counselling-hero">
        <div className="container">
          <span className="eyebrow counselling-hero__eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            Personal Education Guidance
          </span>
          <h1 className="counselling-hero__title">
            Find the Right Course for Your Future.
          </h1>
          <p className="counselling-hero__lead">
            Tell us about your background and career aspirations. Our senior education advisors will help you build a confident, step-by-step roadmap.
          </p>

          <div className="counselling-hero__points">
            <span className="counselling-hero__point">
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>Focused 1-on-1 Guidance</span>
            </span>
            <span className="counselling-hero__point">
              <ShieldCheck size={18} aria-hidden="true" />
              <span>100% No-Pressure Conversation</span>
            </span>
            <span className="counselling-hero__point">
              <MessageCircle size={18} aria-hidden="true" />
              <span>Flexible Online & In-Person Sessions</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION */}
      <section className="home-section home-section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="What to Expect"
            title="How Our Counselling Transforms Decision Making."
            description="We replace uncertainty and fragmented information with structured, student-first clarity."
            align="center"
          />

          <div className="benefit-grid">
            {counsellingFeatures.map(({ icon: Icon, title, desc }, index) => (
              <div key={title} className="service-card">
                <div className="service-card__top">
                  <span className="service-card__icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <span className="service-card__number">0{index + 1}</span>
                </div>
                <h3 className="service-card__title">{title}</h3>
                <p className="service-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TWO-COLUMN FORM SECTION */}
      <section className="home-section counselling-form-section">
        <div className="container counselling-form-layout">
          {/* Left Column: Context & Guarantees */}
          <div className="counselling-context">
            <SectionHeading
              eyebrow="Tell Us About Your Goals"
              title="Let’s Make Your Options Clearer."
              description="Share a few initial details and our counselling team will prepare a structured consultation suited specifically to you."
            />

            <div className="counselling-guarantees">
              <div className="counselling-guarantee-item">
                <span className="counselling-guarantee-icon">
                  <HeartHandshake size={20} aria-hidden="true" />
                </span>
                <div>
                  <strong>Complimentary First Discussion</strong>
                  <p>Your initial consultation is free of charge to understand what matters most to you.</p>
                </div>
              </div>

              <div className="counselling-guarantee-item">
                <span className="counselling-guarantee-icon">
                  <ShieldCheck size={20} aria-hidden="true" />
                </span>
                <div>
                  <strong>Privacy & Integrity</strong>
                  <p>Your details are kept strictly confidential and only used to prepare your guidance report.</p>
                </div>
              </div>

              <div className="counselling-guarantee-item">
                <span className="counselling-guarantee-icon">
                  <Users size={20} aria-hidden="true" />
                </span>
                <div>
                  <strong>10,000+ Students Advised</strong>
                  <p>Benefit from proven insights, real placement trends, and verified institution networks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Panel */}
          <div className="enquiry-panel">
            <div className="enquiry-panel__header">
              <span className="eyebrow">Request Free Counselling</span>
              <h2 className="enquiry-panel__title">Fill in your preferences</h2>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </main>
  )
}

export default CounsellingPage
