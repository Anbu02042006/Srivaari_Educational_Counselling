import { useEffect } from 'react'

/**
 * useBlobButtons
 * Injects the 4-blob gooey wavy animation structure into all action buttons
 * across desktop and mobile viewports.
 * Does not mutate text size, button colors, or mobile layout.
 */
export default function useBlobButtons() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    function injectBlobs() {
      const selector =
        '.button, .btn, .blob-btn, .nav__enquiry-btn, .abroad-promo-btn, .enquiry-modal__submit-btn, .form-submit-btn'
      const buttons = document.querySelectorAll(selector)

      buttons.forEach((btn) => {
        // Skip non-action elements like close icon buttons or filter pills
        if (
          btn.classList.contains('gallery-filter-pill') ||
          btn.classList.contains('colleges-stream-btn') ||
          btn.classList.contains('colleges-subnav-btn') ||
          btn.classList.contains('modal-close') ||
          btn.classList.contains('mobile-drawer__close-btn') ||
          btn.classList.contains('lightbox-btn') ||
          btn.classList.contains('whatsapp-button') ||
          btn.classList.contains('custom-select-trigger') ||
          btn.classList.contains('benefit-slider__dot') ||
          btn.classList.contains('hero-image-card__menu-btn') ||
          btn.classList.contains('hero-image-card__notch-btn')
        ) {
          return
        }

        // Skip if already equipped with blob animation container
        if (btn.querySelector('.blob-btn__inner')) {
          if (!btn.classList.contains('has-blob-animation')) {
            btn.classList.add('has-blob-animation')
          }
          return
        }

        const inner = document.createElement('span')
        inner.className = 'blob-btn__inner'
        inner.setAttribute('aria-hidden', 'true')

        const blobs = document.createElement('span')
        blobs.className = 'blob-btn__blobs'

        for (let i = 0; i < 4; i++) {
          const blob = document.createElement('span')
          blob.className = 'blob-btn__blob'
          blobs.appendChild(blob)
        }

        inner.appendChild(blobs)
        btn.appendChild(inner)
        btn.classList.add('has-blob-animation')
      })
    }

    // Initial pass
    injectBlobs()

    // Observe future DOM changes (route navigations, modals, accordions)
    const observer = new MutationObserver(() => {
      injectBlobs()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])
}

