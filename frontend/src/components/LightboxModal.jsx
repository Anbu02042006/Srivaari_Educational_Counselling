import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react'
import { useEffect, useRef } from 'react'

function LightboxModal({
  isOpen,
  images = [],
  currentIndex = 0,
  onClose,
  onPrev,
  onNext,
}) {
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      } else if (e.key === 'ArrowLeft') {
        onPrev?.()
      } else if (e.key === 'ArrowRight') {
        onNext?.()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, onPrev, onNext])

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex] || images[0]

  // Touch swipe handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (diff > minSwipeDistance) {
      // Swiped left -> next
      onNext?.()
    } else if (diff < -minSwipeDistance) {
      // Swiped right -> prev
      onPrev?.()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      onClick={onClose}
    >
      <div className="lightbox-backdrop" aria-hidden="true" />

      <div
        className="lightbox-container"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top bar with counter and close button */}
        <div className="lightbox-topbar">
          <div className="lightbox-counter">
            <span>{currentIndex + 1} / {images.length}</span>
            {currentImage.caption && (
              <span className="lightbox-caption">{currentImage.caption}</span>
            )}
          </div>

          <button
            type="button"
            className="lightbox-btn lightbox-btn--close"
            onClick={onClose}
            aria-label="Close image gallery"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        {/* Center image view */}
        <div className="lightbox-stage">
          {images.length > 1 && (
            <button
              type="button"
              className="lightbox-btn lightbox-btn--nav lightbox-btn--prev"
              onClick={onPrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} aria-hidden="true" />
            </button>
          )}

          <div className="lightbox-media-wrapper">
            <img
              src={currentImage.src || currentImage.image || currentImage}
              alt={currentImage.alt || currentImage.title || `Gallery photo ${currentIndex + 1}`}
              className="lightbox-image"
            />
            {currentImage.title && (
              <div className="lightbox-title-badge">
                <strong>{currentImage.title}</strong>
                {currentImage.category && <span>{currentImage.category}</span>}
              </div>
            )}
          </div>

          {images.length > 1 && (
            <button
              type="button"
              className="lightbox-btn lightbox-btn--nav lightbox-btn--next"
              onClick={onNext}
              aria-label="Next image"
            >
              <ChevronRight size={28} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LightboxModal
