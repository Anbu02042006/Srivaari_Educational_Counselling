import { ArrowUpRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { benefits } from '../data/homeData'

const gradVariants = [
  'service-card--grad-1',
  'service-card--grad-2',
  'service-card--grad-3',
  'service-card--grad-4',
  'service-card--grad-5',
  'service-card--grad-6',
]

function BenefitSlider({ className = '' }) {
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  const viewportRef = useRef(null)

  const handleScroll = () => {
    if (!viewportRef.current) return
    const { scrollLeft, offsetWidth } = viewportRef.current
    if (offsetWidth > 0) {
      const newIndex = Math.round(scrollLeft / offsetWidth)
      if (newIndex !== mobileActiveIndex && newIndex >= 0 && newIndex < benefits.length) {
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
    <div className={`benefit-section-wrapper ${className}`.trim()}>
      {/* Desktop / Tablet: Clean Grid */}
      <div className="benefit-grid benefit-grid--desktop">
        {benefits.map((item, index) => {
          const Icon = item.icon
          const gradClass = gradVariants[index % gradVariants.length]
          return (
            <Link
              key={item.title}
              className="card-link"
              to="/services"
              aria-label={`Learn more: ${item.title}`}
            >
              <article className={`service-card ${gradClass} service-card--compact`}>
                <div className="service-card__top">
                  <span className="service-card__icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span className="service-card__number">0{index + 1}</span>
                </div>
                <h3 className="service-card__title">{item.title}</h3>
                <p className="service-card__desc">{item.text}</p>
                <div className="service-card__bottom">
                  <span className="text-link text-link--light">
                    <span>Learn more</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </article>
            </Link>
          )
        })}
      </div>

      {/* Mobile Only: Smooth Hardware-Accelerated Slideshow matching ServicesPage */}
      <div
        className="benefit-slider benefit-slider--mobile"
        role="region"
        aria-label="Why Choose Sri Vaari slideshow"
      >
        <div
          ref={viewportRef}
          className="benefit-slider__viewport"
          onScroll={handleScroll}
        >
          <div className="benefit-slider__track">
            {benefits.map((item, index) => {
              const Icon = item.icon
              const gradClass = gradVariants[index % gradVariants.length]
              return (
                <div key={item.title} className="benefit-slider__slide">
                  <Link
                    className="card-link"
                    to="/services"
                    aria-label={`Learn more: ${item.title}`}
                  >
                    <article className={`service-card ${gradClass} service-card--compact`}>
                      <div className="service-card__top">
                        <span className="service-card__icon" aria-hidden="true">
                          <Icon size={20} />
                        </span>
                        <span className="service-card__number">0{index + 1}</span>
                      </div>
                      <h3 className="service-card__title">{item.title}</h3>
                      <p className="service-card__desc">{item.text}</p>
                      <div className="service-card__bottom">
                        <span className="text-link text-link--light">
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
                aria-selected={mobileActiveIndex === index}
                aria-label={`Go to slide ${index + 1} (${item.title})`}
                className={`benefit-slider__dot ${mobileActiveIndex === index ? 'is-active' : ''}`}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BenefitSlider
