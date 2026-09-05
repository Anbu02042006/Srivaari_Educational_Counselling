import { useRef, useState } from 'react'
import {
  CheckCircle2,
  Compass,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import StatCounter from '../components/StatCounter'

const values = [
  {
    icon: Compass,
    title: 'Clarity Over Jargon',
    text: 'We explain cut-offs, seat matrices, and college fees in simple language that students and parents easily understand.',
  },
  {
    icon: HeartHandshake,
    title: 'People Before Profits',
    text: 'Every student’s career is guided with the same care and responsibility we would give to our own family.',
  },
  {
    icon: ShieldCheck,
    title: 'Unfiltered Honesty',
    text: 'If a course or college does not match your career goals or budget, we tell you openly and show you better options.',
  },
  {
    icon: Lightbulb,
    title: 'Step-by-Step Handholding',
    text: 'We stay right beside you through counselling dates, document verification, and final campus admission.',
  },
]

const stats = [
  { value: '10K+', label: 'Happy Students Guided', icon: GraduationCap },
  { value: '100+', label: 'Verified Partner Campuses', icon: Target },
  { value: '8+', label: 'Academic Streams', icon: Compass },
  { value: '98%', label: 'Parent Satisfaction Rate', icon: HeartHandshake },
]

const journey = [
  {
    year: '2021',
    title: 'Sri Vaari is Born',
    text: 'Started with a passionate group of mentors in Tamil Nadu to protect students from misleading admission brokers.',
  },
  {
    year: '2023',
    title: 'Expanding Healthcare & Tech',
    text: 'Broadened trusted counselling networks across Engineering, Medical, Allied Health, and Creative design institutions.',
  },
  {
    year: 'Today',
    title: '10,000+ Dreams Nurtured',
    text: 'Proud to have helped thousands of students from across Tamil Nadu and South India enter top accredited colleges.',
  },
]

function AboutPage() {
  const [mobileValueIndex, setMobileValueIndex] = useState(0)
  const valuesViewportRef = useRef(null)

  const handleValueScroll = () => {
    if (!valuesViewportRef.current) return
    const { scrollLeft, offsetWidth } = valuesViewportRef.current
    if (offsetWidth > 0) {
      const newIndex = Math.round(scrollLeft / offsetWidth)
      if (newIndex !== mobileValueIndex && newIndex >= 0 && newIndex < values.length) {
        setMobileValueIndex(newIndex)
      }
    }
  }

  const scrollToValueIndex = (index) => {
    if (valuesViewportRef.current) {
      const width = valuesViewportRef.current.offsetWidth
      valuesViewportRef.current.scrollTo({
        left: index * width,
        behavior: 'smooth',
      })
    }
    setMobileValueIndex(index)
  }

  return (
    <main className="about-page">
      {/* 1. HERO */}
      <header className="page-hero about-hero">
        <div className="container about-hero__container">
          <div className="about-hero__eyebrow">
            <span className="about-hero__eyebrow-line" aria-hidden="true" />
            <span>ABOUT SRI VAARI</span>
          </div>

          <h1 className="page-hero__title about-hero__title">
            Education Guidance With <span className="text-highlight">Genuine Care & Empathy.</span>
          </h1>

          <p className="page-hero__lead about-hero__lead">
            Empower students and parents with honest college recommendations, verified placement data, transparent fees, and compassionate lifelong academic mentorship.
          </p>

          <div className="about-hero__features">
            <div className="about-hero__feature-item">
              <div className="about-hero__feature-icon">
                <GraduationCap size={16} aria-hidden="true" />
              </div>
              <span className="about-hero__feature-text">Verified<br />Information</span>
            </div>

            <div className="about-hero__feature-divider" aria-hidden="true" />

            <div className="about-hero__feature-item">
              <div className="about-hero__feature-icon">
                <ShieldCheck size={16} aria-hidden="true" />
              </div>
              <span className="about-hero__feature-text">Honest<br />Guidance</span>
            </div>

            <div className="about-hero__feature-divider" aria-hidden="true" />

            <div className="about-hero__feature-item">
              <div className="about-hero__feature-icon">
                <Users size={16} aria-hidden="true" />
              </div>
              <span className="about-hero__feature-text">Student-First<br />Approach</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. OUR STORY (Editorial Split) */}
      <section className="home-section">
        <div className="container about-story-grid">
          <div className="about-story-media">
            <img
              src="/images/indian-counselling-story.jpg"
              alt="Indian education counsellor guiding student and parent with honesty"
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
              eyebrow="Why We Started"
              title="No High Pressure. No Fake Rankings. Just Honest Help."
              description="We have seen how stressful and confusing college admissions can be for families. We built Sri Vaari to be the trusted mentor parents and students can turn to with open hearts."
            />

            <p className="about-story-text">
              We sit down with you, understand your academic marks and financial comfort, and guide you through real college environments, branch scopes, and career realities with complete transparency.
            </p>

            <div className="about-story-points">
              <div className="about-story-point">
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>Honest insights on actual campus placements, faculty strength, and lab facilities.</span>
              </div>
              <div className="about-story-point">
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>Zero sales bias — we recommend only what is genuinely best for your future.</span>
              </div>
              <div className="about-story-point">
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>End-to-end handholding from cut-off calculation to final college admission.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (Dual Bento Cards) */}
      <section className="home-section home-section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="Our Promise"
            title="Our Guiding Principles."
            description="The core commitments that inspire our counselling team every single day."
            align="center"
          />

          <div className="mission-vision-grid">
            <div className="mission-card-primary">
              <span className="eyebrow mission-card__eyebrow">Our Mission</span>
              <h2 className="mission-card__heading">
                Make quality higher education accessible, transparent, and stress-free for every family.
              </h2>
              <p className="mission-card__desc">
                We guide students towards accredited colleges and high-growth careers through dedicated, patient 1-on-1 mentorship.
              </p>
            </div>

            <div className="vision-card-surface">
              <span className="eyebrow vision-card__eyebrow">Our Vision</span>
              <h2 className="vision-card__heading">
                A world where every student finds a rewarding career path with dignity and clarity.
              </h2>
              <p className="vision-card__desc">
                Building an ecosystem where no learner is misled or left behind due to a lack of genuine academic guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES (Desktop Grid | Mobile Slider) */}
      <section className="home-section">
        <div className="container">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Values That Shape Every Conversation."
            description="The four cornerstones of how we counsel, communicate, and support every family."
          />

          {/* Desktop Grid (Hidden on Mobile) - 4 Cards in Single Row */}
          <div className="values-grid values-grid--desktop">
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

          {/* Mobile Only: Smooth Hardware-Accelerated Swipe Slider */}
          <div
            className="benefit-slider benefit-slider--mobile"
            role="region"
            aria-label="Core values carousel"
          >
            <div
              ref={valuesViewportRef}
              className="benefit-slider__viewport"
              onScroll={handleValueScroll}
            >
              <div className="benefit-slider__track">
                {values.map((val, index) => (
                  <div key={val.title} className="benefit-slider__slide">
                    <ServiceCard
                      title={val.title}
                      description={val.text}
                      icon={val.icon}
                      number={`0${index + 1}`}
                      actionLabel="Learn more"
                      to="/services"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Centered Pagination Indicator Dots */}
            <div className="benefit-slider__controls">
              <div className="benefit-slider__dots" role="tablist" aria-label="Core values slides">
                {values.map((val, index) => (
                  <button
                    key={val.title}
                    type="button"
                    role="tab"
                    aria-selected={mobileValueIndex === index}
                    aria-label={`Go to value ${index + 1} (${val.title})`}
                    className={`benefit-slider__dot ${mobileValueIndex === index ? 'is-active' : ''}`}
                    onClick={() => scrollToValueIndex(index)}
                  />
                ))}
              </div>
            </div>
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
    </main>
  )
}

export default AboutPage
