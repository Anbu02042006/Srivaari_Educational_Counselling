import { ArrowRight, Maximize2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LightboxModal from './LightboxModal'
import SectionHeading from './SectionHeading'

const galleryImages = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
    title: 'Student Mentorship & Counselling',
    category: 'Mentorship',
    caption: '1-on-1 personalized academic guidance session at our counselling hub.',
    span: 'featured',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80',
    title: 'Northbridge Institute Campus',
    category: 'Campus',
    caption: 'Modern lecture halls and collaborative learning spaces.',
    span: 'standard',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    title: 'Technology & Computing Labs',
    category: 'Academics',
    caption: 'State-of-the-art software systems and digital development hubs.',
    span: 'standard',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80',
    title: 'Harbor School of Design Studio',
    category: 'Campus',
    caption: 'Creative design architecture and spatial modeling workshop.',
    span: 'standard',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
    title: 'Business & Management Seminars',
    category: 'Academics',
    caption: 'Executive case study workshops and corporate presentations.',
    span: 'standard',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
    title: 'Collaborative Group Discussions',
    category: 'Mentorship',
    caption: 'Peer learning and admissions guidance masterclasses.',
    span: 'wide',
  },
]

const categories = ['All', 'Mentorship', 'Campus', 'Academics']

function GallerySection({ className = '', showViewAll = false }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filteredImages = galleryImages.filter((img) =>
    activeCategory === 'All' ? true : img.category === activeCategory
  )

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index)
  }

  const handlePrev = () => {
    setLightboxIndex((curr) => (curr > 0 ? curr - 1 : filteredImages.length - 1))
  }

  const handleNext = () => {
    setLightboxIndex((curr) => (curr < filteredImages.length - 1 ? curr + 1 : 0))
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
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Gallery Grid */}
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-item gallery-item--${image.span}`}
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

        {showViewAll && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/gallery" className="button button--secondary">
              <span>View Full Gallery</span>
              <ArrowRight size={17} aria-hidden="true" />
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
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  )
}

export default GallerySection
