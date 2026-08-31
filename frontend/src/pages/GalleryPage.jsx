import { Sparkles } from 'lucide-react'
import CTASection from '../components/CTASection'
import GallerySection from '../components/GallerySection'

function GalleryPage() {
  return (
    <main className="gallery-page">
      {/* 1. HERO */}
      <header className="page-hero">
        <div className="container">
          <span className="eyebrow page-hero__eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            Campus Life & Mentorship
          </span>
          <h1 className="page-hero__title">
            Moments That Matter.
          </h1>
          <p className="page-hero__lead">
            Explore glimpses of 1-on-1 counselling sessions, partner institution campuses, modern learning facilities, and academic community moments.
          </p>
        </div>
      </header>

      {/* 2. GALLERY SECTION WITH FILTERS & LIGHTBOX */}
      <GallerySection showHeading={false} />

      {/* 3. CTA SECTION */}
      <CTASection
        eyebrow="Plan Your Visit"
        title="Experience Education Guidance in Person."
        description="Connect with a senior education advisor today to explore institutions, schedule counselling, and take the next step."
        primaryLabel="Contact Us Today"
        primaryTo="/contact"
        secondaryLabel="Explore Services"
        secondaryTo="/services"
      />
    </main>
  )
}

export default GalleryPage
