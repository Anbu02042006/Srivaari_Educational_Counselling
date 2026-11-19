import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

// Set to true to re-enable the admissions announcement popup modal
const ENABLE_ADMISSIONS_POPUP = false

// Track dismissal in-memory per session:
// Navigating between React routes will NOT re-open the popup.
let hasBeenDismissedThisSession = false

function AdmissionsPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (!ENABLE_ADMISSIONS_POPUP || hasBeenDismissedThisSession) return

    // Allow page layout and initial loading transition to settle smoothly
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = useCallback(() => {
    if (isClosing) return
    setIsClosing(true)
    setTimeout(() => {
      hasBeenDismissedThisSession = true
      setIsOpen(false)
      setIsClosing(false)
    }, 240)
  }, [isClosing])

  // Manage body scroll lock and keyboard dismissal while popup is open
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    const prevBodyOverflow = document.body.style.overflow
    const prevDocOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevDocOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleClose])

  if (!ENABLE_ADMISSIONS_POPUP || !isOpen) return null

  return (
    <div
      className={`admissions-popup ${isClosing ? 'admissions-popup--closing' : ''}`}
      role="presentation"
      onClick={handleClose}
    >
      <div className="admissions-popup__backdrop" aria-hidden="true" />

      <div
        className="admissions-popup__dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Sri Vaari 2026–27 Admissions Announcement"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="admissions-popup__close-btn"
          onClick={handleClose}
          aria-label="Close admissions announcement"
          title="Close announcement"
        >
          <X size={20} strokeWidth={2.6} color="#0a1128" aria-hidden="true" />
        </button>

        <div className="admissions-popup__image-card">
          <img
            src="/images/sri-vaari-admissions-2026.png"
            alt="Sri Vaari Educational Group of Institutions - 2026–27 Admissions Open"
            className="admissions-popup__image"
          />
        </div>
      </div>
    </div>
  )
}

export default AdmissionsPopup
