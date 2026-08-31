import { Quote, Star } from 'lucide-react'
import { useRef, useState } from 'react'
import { testimonials } from '../data/homeData'

function TestimonialSlider({ className = '' }) {
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  const viewportRef = useRef(null)

  const handleScroll = () => {
    if (!viewportRef.current) return
    const { scrollLeft, offsetWidth } = viewportRef.current
    if (offsetWidth > 0) {
      const newIndex = Math.round(scrollLeft / offsetWidth)
      if (newIndex !== mobileActiveIndex && newIndex >= 0 && newIndex < testimonials.length) {
        setMobileActiveIndex(newIndex)
      }
    }
  }

  const scrollToIndex = (index) => {
    if (viewportRef.current) {
      const width = viewportRef.current.offsetWidth
      viewportRef.current.scrollTo({
        left: index * width,
        behavior: 'smooth',
      })
    }
    setMobileActiveIndex(index)
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

      {/* 2. Mobile View: Smooth Hardware-Accelerated Slideshow matching ServicesPage */}
      <div
        className="testimonial-slider testimonial-slider--mobile"
        role="region"
        aria-label="Student testimonials carousel"
      >
        <div
          ref={viewportRef}
          className="testimonial-slider__viewport"
          onScroll={handleScroll}
        >
          <div className="testimonial-slider__track">
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
                aria-selected={mobileActiveIndex === index}
                aria-label={`Go to slide ${index + 1} (${item.name})`}
                className={`testimonial-slider__dot ${mobileActiveIndex === index ? 'is-active' : ''}`}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSlider
