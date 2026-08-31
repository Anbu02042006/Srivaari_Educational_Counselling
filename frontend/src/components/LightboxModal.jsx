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
  const viewportRef = useRef(null)

  // Synchronize scroll position to current index
  useEffect(() => {
    if (!isOpen || !viewportRef.current) return
    const el = viewportRef.current
    const width = el.offsetWidth
    el.scrollTo({ left: currentIndex * width, behavior: 'auto' })
  }, [isOpen, currentIndex])

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

  const handleScroll = () => {
    if (!viewportRef.current) return
    const { scrollLeft, offsetWidth } = viewportRef.current
    if (offsetWidth > 0) {
      const newIndex = Math.round(scrollLeft / offsetWidth)
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
        if (newIndex > currentIndex) {
          onNext?.()
        } else if (newIndex < currentIndex) {
          onPrev?.()
        }
      }
    }
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

      {/* Floating Close Button (X icon) */}
      <button
        type="button"
        className="lightbox-btn lightbox-btn--close"
        onClick={(e) => {
          e.stopPropagation()
          onClose?.()
        }}
        aria-label="Close image preview"
      >
        <X size={24} aria-hidden="true" />
      </button>

      {/* Desktop Previous Button (Left side of screen) */}
      {images.length > 1 && (
        <button
          type="button"
          className="lightbox-btn lightbox-btn--nav lightbox-btn--prev"
          onClick={(e) => {
            e.stopPropagation()
            onPrev?.()
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={30} aria-hidden="true" />
        </button>
      )}

      {/* Desktop Next Button (Right side of screen) */}
      {images.length > 1 && (
        <button
          type="button"
          className="lightbox-btn lightbox-btn--nav lightbox-btn--next"
          onClick={(e) => {
            e.stopPropagation()
            onNext?.()
          }}
          aria-label="Next image"
        >
          <ChevronRight size={30} aria-hidden="true" />
        </button>
      )}

      {/* Touch-Swipeable / Scrollable Slide Viewport */}
      <div
        className="lightbox-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={viewportRef}
          className="lightbox-viewport"
          onScroll={handleScroll}
        >
          <div className="lightbox-track">
            {images.map((img, idx) => (
              <div key={img.id || idx} className="lightbox-slide">
                <div className="lightbox-media-wrapper">
                  <img
                    src={img.src || img.image || img}
                    alt={img.alt || img.title || `Gallery photo ${idx + 1}`}
                    className="lightbox-image"
                    loading={Math.abs(idx - currentIndex) <= 1 ? 'eager' : 'lazy'}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Counter indicator */}
        <div className="lightbox-counter">
          <span>{currentIndex + 1}</span> / <span>{images.length}</span>
        </div>
      </div>
    </div>
  )
}

export default LightboxModal
