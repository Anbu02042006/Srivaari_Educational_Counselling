import { useEffect, useRef, useState } from 'react'
import { scrollToContact } from '../utils/scrollToContact'
import SriVaariEmblem from './SriVaariEmblem'

const heroSlides = [
  {
    src: '/images/home-hero-slide-1.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
    alt: 'Welcome to Sri Vaari Educational Groups - A Brighter Tomorrow Begins Here',
    title: 'WELCOME TO SRI VAARI EDUCATIONAL GROUPS',
    lines: ['WELCOME TO SRI VAARI', 'EDUCATIONAL GROUPS'],
    bgClass: 'hero-image-card__slide--bg-1',
  },
  {
    src: '/images/home-hero-slide-2.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    alt: 'Domestic and abroad educational counselling and university admissions',
    title: 'WE PROVIDE DOMESTIC & INTERNATIONAL SERVICES',
    lines: ['WE PROVIDE DOMESTIC &', 'INTERNATIONAL SERVICES'],
    bgClass: 'hero-image-card__slide--bg-2',
  },
  {
    src: '/images/home-hero-slide-3.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80',
    alt: 'Scholarships and financial aid guidance from 5000 to 1 lakh rupees',
    title: 'WE PROVIDE SCHOLARSHIP FROM 5000 TO 1 LAKH RUPEES',
    lines: ['WE PROVIDE SCHOLARSHIP', 'FROM 5000 TO 1 LAKH RUPEES'],
    bgClass: 'hero-image-card__slide--bg-3',
  },
  {
    src: '/images/home-hero-slide-4.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80',
    alt: 'Top accredited partner universities and student degree graduation success',
    title: 'GET ADMISSIONS IN TOP COLLEGES & UNIVERSITIES',
    lines: ['GET ADMISSIONS IN TOP', 'COLLEGES & UNIVERSITIES'],
    bgClass: 'hero-image-card__slide--bg-4',
  },
]

function HeroImageCard({ onContactClick, onEnquire }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Preload all slides into browser cache immediately for instant seamless transitions
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image()
      img.src = slide.src
    })
  }, [])

  // Continuous Auto-Slideshow: advances every 2 seconds
  // Resets timer smoothly on any user interaction (slide click or swipe)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 2000)

    return () => clearInterval(timer)
  }, [currentSlide])

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  // Keyboard navigation for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      goToPrev()
    } else if (e.key === 'ArrowRight') {
      goToNext()
    }
  }

  // Touch Swipe Support for Mobile Screens
  const handleTouchStart = (e) => {
    if (e.targetTouches && e.targetTouches.length > 0) {
      touchStartX.current = e.targetTouches[0].clientX
      touchEndX.current = e.targetTouches[0].clientX
    }
  }

  const handleTouchMove = (e) => {
    if (e.targetTouches && e.targetTouches.length > 0) {
      touchEndX.current = e.targetTouches[0].clientX
    }
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrev()
      }
    }
    touchStartX.current = 0
    touchEndX.current = 0
  }

  const handleContact = (e) => {
    if (onContactClick) {
      onContactClick(e)
      return
    }
    scrollToContact(e)
  }

  return (
    <div
      className="hero-image-card hero-entrance-media"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label="Campus guidance and student counselling slideshow"
    >
      {/* SVG ClipPaths: Circular Fitted Notches for Mobile and Desktop */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          {/* Mobile ClipPath (Clean organic corners with bottom-right Contact Us notch) */}
          <clipPath id="hero-organic-clip-mobile" clipPathUnits="objectBoundingBox">
            <path d="M 0.08,0
                     L 0.90,0
                     C 0.96,0 1,0.04 1,0.10
                     L 1,0.835
                     C 1,0.852 0.98,0.858 0.94,0.858
                     L 0.76,0.858
                     C 0.73,0.858 0.71,0.878 0.71,0.915
                     L 0.71,0.945
                     C 0.71,0.982 0.69,1 0.65,1
                     L 0.10,1
                     C 0.04,1 0,0.96 0,0.90
                     L 0,0.08
                     C 0,0.03 0.03,0 0.08,0
                     Z" />
          </clipPath>

          {/* Desktop ClipPath (Clean organic corners with bottom-right Contact Us notch) */}
          <clipPath id="hero-organic-clip-desktop" clipPathUnits="objectBoundingBox">
            <path d="M 0.08,0
                     L 0.92,0
                     C 0.97,0 1,0.03 1,0.08
                     L 1,0.85
                     C 1,0.865 0.985,0.875 0.96,0.875
                     L 0.80,0.875
                     C 0.775,0.875 0.76,0.895 0.76,0.925
                     L 0.76,0.95
                     C 0.76,0.985 0.735,1 0.70,1
                     L 0.08,1
                     C 0.03,1 0,0.97 0,0.92
                     L 0,0.08
                     C 0,0.03 0.03,0 0.08,0
                     Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Top-Left Notch (Enlarged Circular Emblem Seal with Center Logo) */}
      <div className="hero-image-card__notch hero-image-card__notch--tl hero-entrance-badge">
        <SriVaariEmblem className="hero-image-card__logo--emblem" />
      </div>

      {/* Bottom-Right Notch (Contact Us Button) */}
      <div className="hero-image-card__notch hero-image-card__notch--br">
        <button
          type="button"
          className="hero-image-card__notch-btn"
          onClick={handleContact}
          aria-label="Contact Us"
        >
          <span>Contact Us</span>
        </button>
      </div>

      <div className="hero-image-card__container">
        {/* Top Slide Text Header: Dynamically synchronized with each slide */}
        <div className="hero-image-card__top-content" aria-live="polite">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-image-card__text-slide ${index === currentSlide ? 'hero-image-card__text-slide--active' : ''
                }`}
            >
              <h2 className="hero-image-card__slide-title">{slide.title}</h2>
            </div>
          ))}
        </div>

        {/* Main Hero Photograph Slideshow (4 Curated Slides) */}
        <div
          className="hero-image-card__image-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {heroSlides.map((slide, index) => (
            <div
              key={slide.src}
              className={`hero-image-card__slide-layer ${slide.bgClass} ${index === currentSlide ? 'hero-image-card__slide-layer--active' : ''
                }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="hero-image-card__img hero-image-card__slide-img"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  if (e.target.src !== slide.fallbackSrc) {
                    e.target.src = slide.fallbackSrc
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroImageCard
