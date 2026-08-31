import { Quote, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { testimonials } from '../data/homeData'

function TestimonialSlider({ className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const handlePrev = () => {
    setActiveIndex((curr) => (curr > 0 ? curr - 1 : testimonials.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((curr) => (curr < testimonials.length - 1 ? curr + 1 : 0))
  }

  // Mobile smooth touch gesture
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const touchStartX = useRef(0)
  const touchCurrentX = useRef(0)

  const handleTouchStart = (e) => {
    setIsDragging(true)
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX
    touchCurrentX.current = touchStartX.current
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    touchCurrentX.current = e.touches ? e.touches[0].clientX : e.clientX
    const diff = touchCurrentX.current - touchStartX.current
    if (
      (activeIndex === 0 && diff > 0) ||
      (activeIndex === testimonials.length - 1 && diff < 0)
    ) {
      setDragOffset(diff * 0.3)
    } else {
      setDragOffset(diff)
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const diff = touchCurrentX.current - touchStartX.current
    const threshold = 35

    if (diff < -threshold && activeIndex < testimonials.length - 1) {
      setActiveIndex((curr) => curr + 1)
    } else if (diff > threshold && activeIndex > 0) {
      setActiveIndex((curr) => curr - 1)
    }
    setDragOffset(0)
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

      {/* 2. Mobile View: Slideshow with smooth gesture drag */}
      <div
        className="testimonial-slider testimonial-slider--mobile"
        role="region"
        aria-label="Student testimonials carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none' }}
      >
        <div className="testimonial-slider__viewport">
          <div
            className="testimonial-slider__track"
            style={{
              transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
              transition: isDragging ? 'none' : 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
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
