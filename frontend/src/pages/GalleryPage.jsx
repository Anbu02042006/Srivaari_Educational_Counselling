import { Camera } from 'lucide-react'
import GallerySection from '../components/GallerySection'

function GalleryPage() {
  return (
    <main className="gallery-page">
      {/* 1. HERO HEADER */}
      <header className="page-hero about-hero">
        <div className="container about-hero__container">
          <div className="about-hero__eyebrow">
            <span className="about-hero__eyebrow-line" aria-hidden="true" />
            <span>CAMPUS LIFE &amp; MENTORSHIP</span>
          </div>

          <h1 className="page-hero__title about-hero__title">
            Explore Our <span className="text-highlight">Educational Journey &amp; Gallery:</span>
          </h1>

          <p className="page-hero__lead about-hero__lead">
            Take a visual tour through our student mentorship sessions, university delegation visits, and campus experiences across India and abroad.
          </p>
        </div>
      </header>

      {/* 2. GALLERY COMPONENT */}
      <GallerySection showHeading={false} />
    </main>
  )
}

export default GalleryPage
