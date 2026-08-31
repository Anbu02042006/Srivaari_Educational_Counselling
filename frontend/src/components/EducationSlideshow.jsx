import { ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'

const educationSlides = [
  {
    src: '/images/counselling-slide-1.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
    alt: 'Friendly 1-on-1 education counselling session',
    title: 'Personalized Career Counselling',
  },
  {
    src: '/images/counselling-slide-2.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80',
    alt: 'Premier college campus environment and infrastructure',
    title: 'Top Partner Campuses',
  },
  {
    src: '/images/counselling-slide-3.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    alt: 'College students collaborating and studying together',
    title: 'Student Growth & Community',
  },
  {
    src: '/images/counselling-slide-4.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    alt: 'Advanced technology and computing laboratories',
    title: 'State-of-the-Art Labs & Infrastructure',
  },
  {
    src: '/images/counselling-slide-5.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=80',
    alt: 'Proud graduation ceremony and academic achievement',
    title: 'Celebrating Graduation Success',
  },
]

// Add clone of first slide for a seamless, continuous infinite loop without rewind
const extendedSlides = [...educationSlides, educationSlides[0]]

function EducationSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [withTransition, setWithTransition] = useState(true)

  // Auto-advance slideshow towards the left every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setWithTransition(true)
      setCurrentIndex((prev) => prev + 1)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  // Seamless jump from clone back to initial index without reverse animation
  const handleTransitionEnd = () => {
    if (currentIndex >= educationSlides.length) {
      setWithTransition(false)
      setCurrentIndex(0)
    }
  }

  const activeDotIndex = currentIndex % educationSlides.length

  const handleDotClick = (idx) => {
    setWithTransition(true)
    setCurrentIndex(idx)
  }

  return (
    <div
      className="education-slideshow"
      aria-roledescription="carousel"
      aria-label="Education and counselling gallery slideshow"
    >
      <div className="education-slideshow__viewport">
        {/* Horizontal sliding track */}
        <div
          className="education-slideshow__track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: withTransition ? 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((slide, index) => (
            <div
              key={`${slide.src}-${index}`}
              className="education-slideshow__slide"
              aria-hidden={index !== currentIndex}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  if (e.target.src !== slide.fallbackSrc) {
                    e.target.src = slide.fallbackSrc
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* Floating Trust Badge */}
        <div className="about-split__floating-card">
          <ShieldCheck size={24} className="about-split__floating-icon" aria-hidden="true" />
          <div>
            <strong>100% Honest Guidance</strong>
            <span>Treating every student like family</span>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="education-slideshow__dots" role="tablist">
          {educationSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={index === activeDotIndex}
              aria-label={`Slide ${index + 1}: ${slide.title}`}
              className={`education-slideshow__dot ${
                index === activeDotIndex ? 'education-slideshow__dot--active' : ''
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EducationSlideshow
