import { Quote, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { testimonials } from '../data/homeData'

function TestimonialSlider({ className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  const handlePrev = () => {
    setActiveIndex((curr) => (curr > 0 ? curr - 1 : testimonials.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((curr) => (curr < testimonials.length - 1 ? curr + 1 : 0))
  }

  // Mobile slideshow autoplay
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      handleNext()
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused, activeIndex])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 40) handleNext()
    else if (diff < -40) handlePrev()
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div className={`testimonial-section-wrapper ${className}`.trim()}>
      {/* 1. Desktop System View: 2 Cards per Row Grid */}
      <div className="testimonial-grid testimonial-grid--desktop">
        {testimonials.map((item) => (
          <div key={item.name} className="testimonial-slider__card">
            <div className="testimonial-slider__header">
              <div className="testimonial-slider__stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <Quote className="testimonial-slider__quote-icon" size={24} aria-hidden="true" />
            </div>

            <blockquote className="testimonial-slider__quote">
              “{item.quote}”
            </blockquote>

            <footer className="testimonial-slider__person">
              <div className="avatar-placeholder" aria-hidden="true">
                {item.name.slice(0, 1)}
              </div>
              <div className="testimonial-slider__meta">
                <strong className="testimonial-slider__name">{item.name}</strong>
                <span className="testimonial-slider__detail">{item.detail}</span>
              </div>
            </footer>
          </div>
        ))}
      </div>

      {/* 2. Mobile View: Slideshow (No buttons, touch swipe + dots) */}
      <div
        className="testimonial-slider testimonial-slider--mobile"
        role="region"
        aria-label="Student testimonials carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="testimonial-slider__viewport">
          <div
            className="testimonial-slider__track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((item) => (
              <div key={item.name} className="testimonial-slider__slide">
                <div className="testimonial-slider__card">
                  <div className="testimonial-slider__header">
                    <div className="testimonial-slider__stars" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} size={16} fill="currentColor" aria-hidden="true" />
                      ))}
                    </div>
                    <Quote className="testimonial-slider__quote-icon" size={24} aria-hidden="true" />
                  </div>

                  <blockquote className="testimonial-slider__quote">
                    “{item.quote}”
                  </blockquote>

                  <footer className="testimonial-slider__person">
                    <div className="avatar-placeholder" aria-hidden="true">
                      {item.name.slice(0, 1)}
                    </div>
                    <div className="testimonial-slider__meta">
                      <strong className="testimonial-slider__name">{item.name}</strong>
                      <span className="testimonial-slider__detail">{item.detail}</span>
                    </div>
                  </footer>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Pagination Indicator Dots */}
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
        </div>
      </div>
    </div>
  )
}

export default TestimonialSlider
