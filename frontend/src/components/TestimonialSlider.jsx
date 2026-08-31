import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  Star,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { testimonials } from '../data/homeData'

function TestimonialSlider({ className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  const handlePrev = () => {
    setActiveIndex((curr) => (curr > 0 ? curr - 1 : testimonials.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((curr) => (curr < testimonials.length - 1 ? curr + 1 : 0))
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 50) handleNext()
    else if (diff < -50) handlePrev()
    touchStartX.current = null
    touchEndX.current = null
  }

  const current = testimonials[activeIndex]

  return (
    <div
      className={`testimonial-slider ${className}`.trim()}
      role="region"
      aria-label="Student testimonials carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Featured Highlight Card */}
      <div className="testimonial-slider__card">
        <div className="testimonial-slider__header">
          <div className="testimonial-slider__stars" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={18} fill="currentColor" aria-hidden="true" />
            ))}
          </div>
          <Quote className="testimonial-slider__quote-icon" size={32} aria-hidden="true" />
        </div>

        <blockquote className="testimonial-slider__quote">
          “{current.quote}”
        </blockquote>

        <footer className="testimonial-slider__person">
          <div className="avatar-placeholder avatar-placeholder--large" aria-hidden="true">
            {current.name.slice(0, 1)}
          </div>
          <div className="testimonial-slider__meta">
            <strong className="testimonial-slider__name">{current.name}</strong>
            <span className="testimonial-slider__detail">{current.detail}</span>
          </div>
        </footer>
      </div>

      {/* Slider Controls */}
      <div className="testimonial-slider__controls">
        <div className="testimonial-slider__dots" role="tablist" aria-label="Testimonial slides">
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Go to slide ${index + 1} (${item.name})`}
              className={`testimonial-slider__dot ${activeIndex === index ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div className="testimonial-slider__nav-btns">
          <button
            type="button"
            className="button button--secondary testimonial-slider__nav-btn"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="button button--secondary testimonial-slider__nav-btn"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSlider
