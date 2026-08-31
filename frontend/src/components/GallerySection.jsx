import { ArrowRight, Maximize2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import LightboxModal from './LightboxModal'
import SectionHeading from './SectionHeading'

const galleryImages = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
    title: 'Student Mentorship & Counselling',
    category: 'Mentorship',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80',
    title: 'Northbridge Institute Campus',
    category: 'Campus',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    title: 'Technology & Computing Labs',
    category: 'Academics',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80',
    title: 'Harbor School of Design Studio',
    category: 'Campus',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
    title: 'Business & Management Seminars',
    category: 'Academics',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
    title: 'Collaborative Group Discussions',
    category: 'Mentorship',
  },
]

const categories = ['All', 'Mentorship', 'Campus', 'Academics']

function GallerySection({ className = '', showViewAll = false }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  const filteredImages = galleryImages.filter((img) =>
    activeCategory === 'All' ? true : img.category === activeCategory
  )

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index)
  }

  const handlePrevLightbox = () => {
    setLightboxIndex((curr) => (curr > 0 ? curr - 1 : filteredImages.length - 1))
  }

  const handleNextLightbox = () => {
    setLightboxIndex((curr) => (curr < filteredImages.length - 1 ? curr + 1 : 0))
  }

  // Mobile slideshow next/prev
  const handleMobileNext = () => {
    setMobileActiveIndex((curr) => (curr < filteredImages.length - 1 ? curr + 1 : 0))
  }

  const handleMobilePrev = () => {
    setMobileActiveIndex((curr) => (curr > 0 ? curr - 1 : filteredImages.length - 1))
  }

  // Mobile slideshow autoplay
  useEffect(() => {
    if (isPaused || filteredImages.length <= 1) return
    const timer = setInterval(() => {
      handleMobileNext()
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused, mobileActiveIndex, filteredImages.length])

  // Touch gestures for mobile slider
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 40) handleMobileNext()
    else if (diff < -40) handleMobilePrev()
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section className={`home-section gallery-section ${className}`.trim()} aria-label="Photo Gallery">
      <div className="container">
        <div className="gallery-header">
          <SectionHeading
            eyebrow="Campus Life & Mentorship"
            title="Moments That Matter."
            description="Explore glimpses of counselling sessions, partner campuses, state-of-the-art facilities, and student community life."
          />

          {/* Category Filter Pills */}
          <div className="category-filter" role="tablist" aria-label="Gallery category filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`category-filter__pill ${activeCategory === cat ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat)
                  setMobileActiveIndex(0)
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Desktop Gallery Grid: All images same uniform size (Hidden on Mobile) */}
        <div className="gallery-grid gallery-grid--desktop">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => handleOpenLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleOpenLightbox(index)
                }
              }}
              aria-label={`View full photo: ${image.title}`}
            >
              <img
                src={image.src}
                alt={image.title}
                loading="lazy"
                className="gallery-item__img"
              />

              <div className="gallery-item__overlay">
                <span className="gallery-item__badge">{image.category}</span>
                <div className="gallery-item__info">
                  <strong className="gallery-item__title">{image.title}</strong>
                  <span className="gallery-item__action">
                    <Maximize2 size={16} aria-hidden="true" />
                    <span>View photo</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Mobile Gallery Slideshow: No buttons, autoplay + touch swipe (Visible on Mobile only) */}
        <div
          className="gallery-slider gallery-slider--mobile"
          role="region"
          aria-label="Gallery slideshow"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="gallery-slider__viewport">
            <div
              className="gallery-slider__track"
              style={{ transform: `translateX(-${mobileActiveIndex * 100}%)` }}
            >
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="gallery-slider__slide"
                  onClick={() => handleOpenLightbox(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo ${index + 1}`}
                >
                  <div className="gallery-item">
                    <img
                      src={image.src}
                      alt={image.title}
                      loading="lazy"
                      className="gallery-item__img"
                    />
                    <div className="gallery-item__overlay">
                      <span className="gallery-item__badge">{image.category}</span>
                      <div className="gallery-item__info">
                        <strong className="gallery-item__title">{image.title}</strong>
                        <span className="gallery-item__action">
                          <Maximize2 size={16} aria-hidden="true" />
                          <span>View</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Centered Pagination Dots for Mobile Slideshow */}
          <div className="gallery-slider__controls">
            <div className="gallery-slider__dots" role="tablist" aria-label="Gallery slides">
              {filteredImages.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  role="tab"
                  aria-selected={mobileActiveIndex === index}
                  aria-label={`Go to photo ${index + 1}`}
                  className={`gallery-slider__dot ${mobileActiveIndex === index ? 'is-active' : ''}`}
                  onClick={() => setMobileActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {showViewAll && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/gallery" className="button button--secondary">
              <span>View Full Gallery</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Dialog (Displays ONLY the image, no text overlays) */}
      <LightboxModal
        isOpen={lightboxIndex >= 0}
        images={filteredImages}
        currentIndex={lightboxIndex >= 0 ? lightboxIndex : 0}
        onClose={() => setLightboxIndex(-1)}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />
    </section>
  )
}

export default GallerySection
