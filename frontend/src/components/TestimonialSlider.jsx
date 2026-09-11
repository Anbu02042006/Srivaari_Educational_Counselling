import { BarChart3, GraduationCap, HeartPulse, Users } from 'lucide-react'
import { testimonials } from '../data/homeData'

const disciplineIconMap = {
  engineering: GraduationCap,
  datascience: BarChart3,
  healthcare: HeartPulse,
  management: Users,
}

function TestimonialCard({ item }) {
  const IconComponent = disciplineIconMap[item.discipline] || GraduationCap

  return (
    <div className="testimonial-slider__card">
      <header className="testimonial-slider__person">
        <div className="testimonial-slider__person-info">
          <img
            src={item.avatar}
            alt={item.name}
            className="testimonial-slider__avatar"
            loading="lazy"
          />
          <div className="testimonial-slider__meta">
            <strong className="testimonial-slider__name">{item.name}</strong>
            <span className="testimonial-slider__course">{item.course}</span>
            <span className="testimonial-slider__city">{item.city}</span>
          </div>
        </div>

        <div className="testimonial-slider__discipline-icon" aria-hidden="true">
          <IconComponent size={28} strokeWidth={1.75} />
        </div>
      </header>

      <blockquote className="testimonial-slider__quote">
        “{item.quote}”
      </blockquote>
    </div>
  )
}

function TestimonialSlider({ className = '' }) {
  return (
    <div
      className={`testimonial-slideshow-container ${className}`.trim()}
      role="region"
      aria-label="Continuous student testimonials slideshow"
    >
      <div className="testimonial-slideshow-track">
        {/* Set 1: Primary cards */}
        <div className="testimonial-slideshow-group">
          {testimonials.map((item) => (
            <div key={`primary-${item.name}`} className="testimonial-slideshow-item">
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>

        {/* Set 2: Seamless loop clone */}
        <div className="testimonial-slideshow-group" aria-hidden="true">
          {testimonials.map((item) => (
            <div key={`clone-${item.name}`} className="testimonial-slideshow-item">
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialSlider
