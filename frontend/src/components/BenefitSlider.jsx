import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { benefits } from '../data/homeData'

function BenefitSlider({ className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  const handlePrev = () => {
    setActiveIndex((curr) => (curr > 0 ? curr - 1 : benefits.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((curr) => (curr < benefits.length - 1 ? curr + 1 : 0))
  }

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      handleNext()
    }, 4000)
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

      {/* Mobile Only: Slideshow without arrow buttons */}
      <div
        className="benefit-slider benefit-slider--mobile"
        role="region"
        aria-label="Why Choose Sri Vaari slideshow"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="benefit-slider__viewport">
          <div
            className="benefit-slider__track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
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
