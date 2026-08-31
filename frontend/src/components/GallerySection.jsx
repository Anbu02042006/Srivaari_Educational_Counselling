import { ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import LightboxModal from './LightboxModal'

const galleryImages = [
  {
    id: 'g1',
    src: '/images/indian-mentorship.jpg',
    slides: [
      '/images/indian-mentorship.jpg',
      '/images/indian-student-collaboration.jpg',
      '/images/indian-business-seminar.jpg',
    ],
    title: 'Student Mentorship & Counselling',
    category: 'Mentorship',
    heightType: 'short',
  },
  {
    id: 'g2',
    src: '/images/indian-campus.jpg',
    slides: [
      '/images/indian-campus.jpg',
      '/images/indian-convocation.jpg',
      '/images/indian-mentorship.jpg',
    ],
    title: 'Northbridge Institute Campus',
    category: 'Campus',
    heightType: 'tall',
  },
  {
    id: 'g3',
    src: '/images/indian-computer-lab.jpg',
    slides: [
      '/images/indian-computer-lab.jpg',
      '/images/indian-business-seminar.jpg',
      '/images/indian-student-collaboration.jpg',
    ],
    title: 'Technology & Computing Labs',
    category: 'Academics',
    heightType: 'short',
  },
  {
    id: 'g4',
    src: '/images/indian-convocation.jpg',
    slides: [
      '/images/indian-convocation.jpg',
      '/images/indian-campus.jpg',
      '/images/indian-computer-lab.jpg',
    ],
    title: 'Harbor School of Design Studio',
    category: 'Campus',
    heightType: 'tall',
  },
  {
    id: 'g5',
    src: '/images/indian-business-seminar.jpg',
    slides: [
      '/images/indian-business-seminar.jpg',
      '/images/indian-mentorship.jpg',
      '/images/indian-campus.jpg',
    ],
    title: 'Business & Management Seminars',
    category: 'Academics',
    heightType: 'short',
  },
  {
    id: 'g6',
    src: '/images/indian-student-collaboration.jpg',
    slides: [
      '/images/indian-student-collaboration.jpg',
      '/images/indian-computer-lab.jpg',
      '/images/indian-convocation.jpg',
    ],
    title: 'Collaborative Group Discussions',
    category: 'Mentorship',
    heightType: 'tall',
  },
]

const categories = ['All', 'Mentorship', 'Campus', 'Academics']

function GalleryCard({ image, onOpenLightbox }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  const slides = image.slides && image.slides.length > 0 ? image.slides : [image.src]
  const totalSlides = slides.length

  const handleNext = (e) => {
    e?.stopPropagation()
    if (totalSlides <= 1) return
    setActiveSlide((prev) => (prev + 1) % totalSlides)
  }

  const handlePrev = (e) => {
    e?.stopPropagation()
    if (totalSlides <= 1) return
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 35) {
      e.stopPropagation()
      handleNext()
    } else if (diff < -35) {
      e.stopPropagation()
      handlePrev()
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div
      className={`gallery-image-card gallery-image-card--${image.heightType || 'short'}`}
      onClick={() => onOpenLightbox(activeSlide)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpenLightbox(activeSlide)
        }
      }}
      aria-label={`View photo: ${image.title}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sliding Image Background Track */}
      <div
        className="gallery-image-card__track"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        {slides.map((slideSrc, idx) => (
          <div key={idx} className="gallery-image-card__slide">
            <img
              src={slideSrc}
              alt={image.title}
              loading="lazy"
              className="gallery-image-card__img"
            />
          </div>
        ))}
      </div>

      {/* Subtle Dark Gradient Overlay with Text over Image */}
      <div className="gallery-image-card__overlay">
        <div className="gallery-image-card__content">
          <span className="gallery-image-card__category">{image.category}</span>
          <h3 className="gallery-image-card__title">{image.title}</h3>
        </div>
      </div>

      {/* Left/Right Subtle Click Hit Zones for Slide Navigation */}
      {totalSlides > 1 && (
        <>
          <div
            className="gallery-image-card__hit-zone gallery-image-card__hit-zone--prev"
            onClick={handlePrev}
            aria-label="Previous slide"
          />
          <div
            className="gallery-image-card__hit-zone gallery-image-card__hit-zone--next"
            onClick={handleNext}
            aria-label="Next slide"
          />
        </>
      )}
    </div>
  )
}

function GallerySection({ className = '', showViewAll = false, showHeading = true }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const filteredImages = galleryImages.filter((img) =>
    activeCategory === 'All' ? true : img.category === activeCategory
  )

  const handleOpenLightbox = (cardIndex) => {
    setLightboxIndex(cardIndex)
  }

  const handlePrevLightbox = () => {
    setLightboxIndex((curr) => (curr > 0 ? curr - 1 : filteredImages.length - 1))
  }

  const handleNextLightbox = () => {
    setLightboxIndex((curr) => (curr < filteredImages.length - 1 ? curr + 1 : 0))
  }

  return (
    <section className={`home-section gallery-section ${className}`.trim()} aria-label="Photo Gallery">
      <div className="container gallery-container">
        {/* Compact Header */}
        <div className="gallery-section-header">
          {showHeading && (
            <div className="gallery-section-header__text">
              <h2 className="gallery-section-header__title">Gallery</h2>
              <p className="gallery-section-header__desc">Explore our educational experiences.</p>
            </div>
          )}

          {/* Compact Category Filters */}
          <div className="gallery-filters" role="tablist" aria-label="Gallery category filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`gallery-filter-pill ${activeCategory === cat ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GALLERY GRID: Clean 3-Col Equal Rows on Desktop | 2-Col Staggered Masonry on Mobile */}
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <GalleryCard
              key={image.id}
              image={image}
              onOpenLightbox={() => handleOpenLightbox(index)}
            />
          ))}
        </div>

        {showViewAll && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Link to="/gallery" className="button button--secondary">
              <span>View Full Gallery</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
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
