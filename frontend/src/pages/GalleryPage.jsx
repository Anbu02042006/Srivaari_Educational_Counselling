import { BookOpen, GraduationCap, Star, Users } from 'lucide-react'
import GallerySection from '../components/GallerySection'

function GalleryPage() {
  return (
    <main className="gallery-page">
      {/* 1. HERO */}
      <header className="page-hero gallery-hero">
        <div className="container gallery-hero__container">
          <div className="gallery-hero__eyebrow">
            <span className="gallery-hero__eyebrow-line" aria-hidden="true" />
            <span>CAMPUS LIFE</span>
          </div>

          <h1 className="page-hero__title gallery-hero__title">
            Campus Life, Moments, and <span className="text-highlight">Mentorship in Action.</span>
          </h1>

          <p className="page-hero__lead gallery-hero__lead">
            Explore glimpses of personalized counselling sessions, partner college campuses, modern learning facilities, and vibrant student community events.
          </p>

          <div className="gallery-hero__features">
            <div className="gallery-hero__feature-item">
              <div className="gallery-hero__feature-icon">
                <Users size={16} aria-hidden="true" />
              </div>
              <span className="gallery-hero__feature-text">Real<br />Experiences</span>
            </div>

            <div className="gallery-hero__feature-divider" aria-hidden="true" />

            <div className="gallery-hero__feature-item">
              <div className="gallery-hero__feature-icon">
                <GraduationCap size={16} aria-hidden="true" />
              </div>
              <span className="gallery-hero__feature-text">Vibrant<br />Campuses</span>
            </div>

            <div className="gallery-hero__feature-divider" aria-hidden="true" />

            <div className="gallery-hero__feature-item">
              <div className="gallery-hero__feature-icon">
                <BookOpen size={16} aria-hidden="true" />
              </div>
              <span className="gallery-hero__feature-text">Student<br />Community</span>
            </div>

            <div className="gallery-hero__feature-divider" aria-hidden="true" />

            <div className="gallery-hero__feature-item">
              <div className="gallery-hero__feature-icon">
                <Star size={16} aria-hidden="true" />
              </div>
              <span className="gallery-hero__feature-text">Bright<br />Futures</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. GALLERY SECTION WITH FILTERS & LIGHTBOX */}
      <GallerySection showHeading={false} />
    </main>
  )
}

export default GalleryPage
