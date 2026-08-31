import {
  ArrowRight,
  CheckCircle2,
  Compass,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import StatCounter from '../components/StatCounter'

const values = [
  {
    icon: Compass,
    title: 'Clarity First',
    text: 'We make complex education choices easier to understand without overwhelming jargon.',
  },
  {
    icon: HeartHandshake,
    title: 'People Before Process',
    text: 'Every student deserves respectful, individual attention shaped around their unique circumstances.',
  },
  {
    icon: ShieldCheck,
    title: 'Honest Guidance',
    text: 'We explain trade-offs openly so decisions remain authentic, informed, and truly yours.',
  },
  {
    icon: Lightbulb,
    title: 'Practical Optimism',
    text: 'We focus on the next useful step and realistic milestones, avoiding empty guarantees.',
  },
]

const stats = [
  { value: '10K+', label: 'Students Guided', icon: GraduationCap },
  { value: '100+', label: 'Institution Connections', icon: Target },
  { value: '8+', label: 'Education Streams', icon: Compass },
  { value: '95%', label: 'Positive Outcomes', icon: HeartHandshake },
]

const journey = [
  {
    year: '2021',
    title: 'Sri Vaari Begins',
    text: 'Founded with a small, dedicated team focused entirely on student-first education counselling.',
  },
  {
    year: '2023',
    title: 'Expanded Learning Horizons',
    text: 'Broadened counselling networks across professional, hybrid, and specialized creative disciplines.',
  },
  {
    year: 'Today',
    title: 'Human-First Guidance',
    text: 'Continuing to bring transparency, calm support, and actionable clarity to thousands of learners.',
  },
]

function AboutPage() {
  return (
    <main className="about-page">
      {/* 1. HERO */}
      <header className="page-hero">
        <div className="container">
          <span className="eyebrow page-hero__eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            About Sri Vaari
          </span>
          <h1 className="page-hero__title">
            Education Guidance With a Human Point of View.
          </h1>
          <p className="page-hero__lead">
            We help students turn possibility into a thoughtful, practical plan for what comes next — combining academic insight with genuine empathy.
          </p>

          <div className="hero__actions" style={{ marginTop: 'var(--space-4)' }}>
            <Link className="button button--primary" to="/contact">
              <span>Book Free Counselling</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className="button button--secondary" to="/services">
              <span>Explore Our Services</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. OUR STORY (Editorial Split) */}
      <section className="home-section">
        <div className="container about-story-grid">
          <div className="about-story-media">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
              alt="Education counselling mentors"
              loading="lazy"
            />
            <div className="about-story-badge">
              <GraduationCap size={22} className="about-story-badge__icon" aria-hidden="true" />
              <div>
                <strong>Student-Centric Since 2021</strong>
                <span>Empowering confident decisions</span>
              </div>
            </div>
          </div>

          <div className="about-story-content">
            <SectionHeading
              eyebrow="Our Story"
              title="A Clearer, Calmer Way to Choose."
              description="Sri Vaari was founded around a simple belief: students make better career decisions when they have enough context, kind support, and room to ask honest questions."
            />

            <p className="about-story-text">
              We bring course discovery, college selection, and long-term career planning into one grounded, supportive conversation — eliminating stress and replacing guesswork with real clarity.
            </p>

            <div className="about-story-points">
              <div className="about-story-point">
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>Transparent insights into eligibility, campus cultures, and actual outcomes.</span>
              </div>
              <div className="about-story-point">
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>Zero sales pressure — only objective, student-first guidance.</span>
              </div>
              <div className="about-story-point">
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>End-to-end assistance from application shortlisting to final admission.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (Dual Bento Cards) */}
      <section className="home-section home-section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="Purpose & Direction"
            title="Our Guiding Principles."
            description="The core commitments that inspire our counselling team every single day."
            align="center"
          />

          <div className="mission-vision-grid">
            <div className="mission-card-primary">
              <span className="eyebrow mission-card__eyebrow">Our Mission</span>
              <h2 className="mission-card__heading">
                Make quality education choices feel possible, practical, and personal.
              </h2>
              <p className="mission-card__desc">
                We bridge the gap between student aspirations and institutional reality through dedicated 1-on-1 mentorship.
              </p>
            </div>

            <div className="vision-card-surface">
              <span className="eyebrow vision-card__eyebrow">Our Vision</span>
              <h2 className="vision-card__heading">
                Every learner can see a route forward that respects their ambition and reality.
              </h2>
              <p className="vision-card__desc">
                Building an ecosystem where no student is left behind due to lack of transparent education guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="home-section">
        <div className="container">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Values That Shape Every Conversation."
            description="The four cornerstones of how we counsel, communicate, and support every family."
          />

          <div className="benefit-grid">
            {values.map((val, index) => (
              <ServiceCard
                key={val.title}
                title={val.title}
                description={val.text}
                icon={val.icon}
                number={`0${index + 1}`}
                actionLabel="Learn more"
                to="/services"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. IMPACT / STATS */}
      <section className="home-section home-section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="A Growing Impact"
            title="Small Conversations, Meaningful Direction."
            description="Milestones achieved together with students and education partners across the country."
            align="center"
          />

          <div className="about-stats-grid">
            {stats.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                className="stat-card--about"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR JOURNEY TIMELINE */}
      <section className="home-section">
        <div className="container">
          <SectionHeading
            eyebrow="Our Journey"
            title="Built One Helpful Step at a Time."
            description="A quick look at how Sri Vaari has evolved to serve students better each year."
            align="center"
          />

          <ol className="process-list">
            {journey.map((step) => (
              <li key={step.year} className="process-list__item">
                <span className="process-list__number">{step.year}</span>
                <div className="process-list__body">
                  <h3 className="process-list__title">{step.title}</h3>
                  <p className="process-list__text">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. ABOUT CTA */}
      <CTASection
        eyebrow="Start Your Journey"
        title="Let’s Find a Direction That Feels Right."
        description="Speak with an experienced education counsellor today and receive actionable, personalized advice."
        primaryLabel="Schedule Free Counselling"
        primaryTo="/contact"
        secondaryLabel="Contact Support"
        secondaryTo="/contact"
      />
    </main>
  )
}

export default AboutPage
