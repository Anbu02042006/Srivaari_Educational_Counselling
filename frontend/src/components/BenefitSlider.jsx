import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { benefits } from '../data/homeData'

function BenefitSlider({ className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const handlePrev = () => {
    setActiveIndex((curr) => (curr > 0 ? curr - 1 : benefits.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((curr) => (curr < benefits.length - 1 ? curr + 1 : 0))
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
      (activeIndex === benefits.length - 1 && diff < 0)
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

    if (diff < -threshold && activeIndex < benefits.length - 1) {
      setActiveIndex((curr) => curr + 1)
    } else if (diff > threshold && activeIndex > 0) {
      setActiveIndex((curr) => curr - 1)
    }
    setDragOffset(0)
  }

  return (
    <div className={`benefit-section-wrapper ${className}`.trim()}>
      {/* Desktop / Tablet: Clean Grid */}
      <div className="benefit-grid benefit-grid--desktop">
        {benefits.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={item.title}
              className="card-link"
              to="/services"
              aria-label={`Learn more: ${item.title}`}
            >
              <article className="service-card service-card--compact">
                <div className="service-card__top">
                  <span className="service-card__icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span className="service-card__number">0{index + 1}</span>
                </div>
                <h3 className="service-card__title">{item.title}</h3>
                <p className="service-card__desc">{item.text}</p>
                <div className="service-card__bottom">
                  <span className="text-link">
                    <span>Learn more</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </article>
            </Link>
          )
        })}
      </div>

      {/* Mobile Only: Slideshow with smooth gesture drag */}
      <div
        className="benefit-slider benefit-slider--mobile"
        role="region"
        aria-label="Why Choose Sri Vaari slideshow"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none' }}
      >
        <div className="benefit-slider__viewport">
          <div
            className="benefit-slider__track"
            style={{
              transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
              transition: isDragging ? 'none' : 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {benefits.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="benefit-slider__slide">
                  <Link
                    className="card-link"
                    to="/services"
                    aria-label={`Learn more: ${item.title}`}
                  >
                    <article className="service-card service-card--compact">
                      <div className="service-card__top">
                        <span className="service-card__icon" aria-hidden="true">
                          <Icon size={20} />
                        </span>
                        <span className="service-card__number">0{index + 1}</span>
                      </div>
                      <h3 className="service-card__title">{item.title}</h3>
                      <p className="service-card__desc">{item.text}</p>
                      <div className="service-card__bottom">
                        <span className="text-link">
                          <span>Learn more</span>
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="benefit-slider__controls">
          <div className="benefit-slider__dots" role="tablist" aria-label="Benefit slides">
            {benefits.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-label={`Go to slide ${index + 1} (${item.title})`}
                className={`benefit-slider__dot ${activeIndex === index ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BenefitSlider
