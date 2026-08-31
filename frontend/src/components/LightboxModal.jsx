import {
  ChevronLeft,
  ChevronRight,
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
    const minSwipeDistance = 40

    if (diff > minSwipeDistance) {
      onNext?.()
    } else if (diff < -minSwipeDistance) {
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
      aria-label="Image preview"
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
        {/* Floating Close Button Only */}
        <button
          type="button"
          className="lightbox-btn lightbox-btn--close"
          onClick={onClose}
          aria-label="Close image preview"
        >
          <X size={24} aria-hidden="true" />
        </button>

        {/* Pure Image Display (No text overlays) */}
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
