import {
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Users,
} from 'lucide-react'
import StatCounter from '../components/StatCounter'

const stats = [
  { value: '500+', label: 'Courses & Programs', icon: BookOpen },
  { value: '100+', label: 'Partner Institutions', icon: Award },
  { value: '10K+', label: 'Students Guided', icon: Users },
  { value: '95%', label: 'Student Satisfaction', icon: HeartHandshake },
]

function AboutPage() {

  return (
    <main className="about-page">
      {/* 1. HERO HEADER */}
      <header className="page-hero about-hero">
        <div className="container about-hero__container">
          <div className="about-hero__eyebrow">
            <span className="about-hero__eyebrow-line" aria-hidden="true" />
            <span>DISCOVER YOUR TALENT</span>
          </div>

          <h1 className="page-hero__title about-hero__title">
            Discover Your Path With <span className="text-highlight">Expert Educational Counselling:</span>
          </h1>

          <p className="page-hero__lead about-hero__lead">
            Get one-on-one guidance to choose the right course, college, and country. Let’s turn your academic dreams into a clear, achievable plan.
          </p>

          <div className="about-hero__features">
            <div className="about-hero__feature-item">
              <div className="about-hero__feature-icon">
                <GraduationCap size={16} aria-hidden="true" />
              </div>
              <span className="about-hero__feature-text">10,000+<br />Students Guided</span>
            </div>

            <div className="about-hero__feature-divider" aria-hidden="true" />

            <div className="about-hero__feature-item">
              <div className="about-hero__feature-icon">
                <ShieldCheck size={16} aria-hidden="true" />
              </div>
              <span className="about-hero__feature-text">100+ Partner<br />Institutions</span>
            </div>

            <div className="about-hero__feature-divider" aria-hidden="true" />

            <div className="about-hero__feature-item">
              <div className="about-hero__feature-icon">
                <Users size={16} aria-hidden="true" />
              </div>
              <span className="about-hero__feature-text">1-on-1 Dedicated<br />Mentorship</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. OUR COUNSELLING SERVICES (Showcase Split Card) */}
      <section className="about-services-showcase" aria-label="Our Counselling Services">
        <div className="container">
          <div className="about-services-banner">
            {/* Left: Illustration */}
            <div className="about-services-banner__visual">
              <img
                src="/images/career-direction-signpost.png"
                alt="Career directions signpost pointing towards Arts, Health, Science, Technology, Business, and Engineering"
                className="about-services-banner__img"
                loading="eager"
              />
            </div>

            {/* Right: Content */}
            <div className="about-services-banner__content">
              <h2 className="about-services-banner__title">Our Counselling Services</h2>
              <p className="about-services-banner__lead">
                Confused about what to study or where to start? Our certified counsellors help you understand your interests, strengths, and the best-fit academic options.
              </p>

              <ul className="about-services-banner__list">
                <li className="about-services-banner__item">
                  <div className="about-services-banner__item-icon">
                    <CheckCircle2 size={20} aria-hidden="true" />
                  </div>
                  <div className="about-services-banner__item-body">
                    <strong>Career & Course Selection from 8th to 12th</strong>
                    <p>We work with 100+ global institutions. Based on your academic profile and preferences, we match you with programs that suit your career ambitions.</p>
                  </div>
                </li>

                <li className="about-services-banner__item">
                  <div className="about-services-banner__item-icon">
                    <CheckCircle2 size={20} aria-hidden="true" />
                  </div>
                  <div className="about-services-banner__item-body">
                    <strong>Country & University Guidance</strong>
                    <p>Explore top universities in countries like the USA, UK, Canada, Australia, Germany, and leading Indian universities. Get personalized advice on selecting the right course and destination.</p>
                  </div>
                </li>

                <li className="about-services-banner__item">
                  <div className="about-services-banner__item-icon">
                    <CheckCircle2 size={20} aria-hidden="true" />
                  </div>
                  <div className="about-services-banner__item-body">
                    <strong>Application Strategy</strong>
                    <p>From writing compelling Statements of Purpose (SOPs) to organizing documents and meeting deadlines — we ensure your applications are strong and complete.</p>
                  </div>
                </li>

                <li className="about-services-banner__item">
                  <div className="about-services-banner__item-icon">
                    <CheckCircle2 size={20} aria-hidden="true" />
                  </div>
                  <div className="about-services-banner__item-body">
                    <strong>Scholarship & Advice</strong>
                    <p>Don't let finances hold you back. Learn about scholarships, assistantships, and funding opportunities available for students.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DUAL COLUMNS: WHY CHOOSE US & WHAT WE PROVIDE */}
      <section className="about-dual-columns-section" aria-label="Why Choose Us and What We Provide">
        <div className="container">
          <div className="about-dual-grid">
            {/* Column 1: Why You Have To Choose Us */}
            <div className="about-dual-card">
              <h3 className="about-dual-card__title">Why You Have To Choose Us</h3>
              <ul className="about-checklist">
                <li className="about-checklist__item">
                  <span className="about-checklist__bullet" aria-hidden="true">•</span>
                  <span><strong>5000+ Students</strong> Counselled Successfully</span>
                </li>
                <li className="about-checklist__item">
                  <span className="about-checklist__bullet" aria-hidden="true">•</span>
                  <span><strong>100+ Partner Institutions</strong> Worldwide</span>
                </li>
                <li className="about-checklist__item">
                  <span className="about-checklist__bullet" aria-hidden="true">•</span>
                  <span><strong>98% Application Success Rate</strong></span>
                </li>
                <li className="about-checklist__item">
                  <span className="about-checklist__bullet" aria-hidden="true">•</span>
                  <span><strong>1-on-1 Dedicated Counselling Sessions</strong></span>
                </li>
                <li className="about-checklist__item">
                  <span className="about-checklist__bullet" aria-hidden="true">•</span>
                  <span><strong>Free Initial Consultation</strong></span>
                </li>
              </ul>
            </div>

            {/* Column 2: What We Provide */}
            <div className="about-dual-card">
              <h3 className="about-dual-card__title">What We Provide</h3>
              <ul className="about-checklist">
                <li className="about-checklist__item">
                  <span className="about-checklist__bullet" aria-hidden="true">•</span>
                  <span><strong>One to One counselling session</strong></span>
                </li>
                <li className="about-checklist__item">
                  <span className="about-checklist__bullet" aria-hidden="true">•</span>
                  <span><strong>Group Counselling session</strong> in schools, institutes and tuition center</span>
                </li>
                <li className="about-checklist__item">
                  <span className="about-checklist__bullet" aria-hidden="true">•</span>
                  <span><strong>Expert talk</strong> (Personalised Education Counselling Tailored to Your Goals)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY STATISTICS RIBBON */}
      <section className="stats-section" aria-label="Key statistics">
        <div className="container stats-grid">
          {stats.map(({ value, label, icon: Icon }) => (
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

      {/* 5. PROCESS: OUR COUNSELLING SERVICES */}
      <section className="about-process-section" aria-label="Our Counselling Process">
        <div className="container">
          <h2 className="about-process-section__title">OUR COUNSELLING SERVICES</h2>

          <div className="about-process-grid">
            <div className="about-process-card">
              <h3 className="about-process-card__title">Tell Us About You</h3>
              <p className="about-process-card__desc">
                Simply fill out our quick online form or contact us directly to get started on your journey. Fill out our quick online form or give us a call.
              </p>
            </div>

            <div className="about-process-card">
              <h3 className="about-process-card__title">Free Counselling Session</h3>
              <p className="about-process-card__desc">
                Connect with our expert counsellors online or in person to explore your goals and interests.
              </p>
            </div>

            <div className="about-process-card">
              <h3 className="about-process-card__title">Personalized Guidance</h3>
              <p className="about-process-card__desc">
                Receive a tailored plan with the best courses, countries, and universities suited for you. Get a plan for courses.
              </p>
            </div>

            <div className="about-process-card">
              <h3 className="about-process-card__title">Application Support</h3>
              <p className="about-process-card__desc">
                We guide you through the entire application process, from start to finish, with full support.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

export default AboutPage
