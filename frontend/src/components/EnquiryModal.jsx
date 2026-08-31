import { GraduationCap, X } from 'lucide-react'
import { useEffect } from 'react'
import EnquiryForm from './EnquiryForm'

function EnquiryModal({
  isOpen,
  onClose,
  initialCourse,
  initialLocation,
  contextName,
}) {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="enquiry-modal"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="enquiry-modal__backdrop"
        aria-hidden="true"
      />

      <section
        className="enquiry-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="enquiry-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close enquiry form"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="enquiry-modal__header">
          <span className="eyebrow enquiry-modal__eyebrow">
            <GraduationCap size={15} aria-hidden="true" />
            Start with a conversation
          </span>
          <h2 id="enquiry-modal-title" className="enquiry-modal__title">
            Let’s find your right next step.
          </h2>

          {contextName && (
            <div className="enquiry-modal__context-badge">
              <span>Enquiring for: <strong>{contextName}</strong></span>
            </div>
          )}
        </div>

        <div className="enquiry-modal__body">
          <EnquiryForm
            initialCourse={initialCourse}
            initialLocation={initialLocation}
            onSuccess={() => {
              // Optional callback on success
            }}
          />
        </div>
      </section>
    </div>
  )
}

export default EnquiryModal
