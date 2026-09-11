import { useState, useEffect } from 'react'
import { X, CheckCircle2, LoaderCircle } from 'lucide-react'

const initialForm = {
  name: '',
  email: '',
  mobile: '',
  message: '',
}

function EnquiryModal({
  isOpen,
  onClose,
  initialCourse,
  initialLocation,
  contextName,
}) {
  const [values, setValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Reset or prefill when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setValues({
        name: '',
        email: '',
        mobile: '',
        message: contextName
          ? `I am enquiring about ${contextName}${initialCourse ? ` (${initialCourse})` : ''}.`
          : '',
      })
      setErrors({})
      setIsSuccess(false)
      setIsSubmitting(false)
    }
  }, [isOpen, contextName, initialCourse])

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const errs = {}
    if (!values.name.trim()) {
      errs.name = 'Please enter your full name.'
    }
    if (!values.email.trim()) {
      errs.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!values.mobile.trim()) {
      errs.mobile = 'Please enter your phone number.'
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(values.mobile.trim())) {
      errs.mobile = 'Enter a valid phone number (8-15 digits).'
    }
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setIsSubmitting(true)
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('pathwayEnquiries') || '[]')
        localStorage.setItem(
          'pathwayEnquiries',
          JSON.stringify([
            ...existing,
            {
              ...values,
              contextName: contextName || null,
              initialCourse: initialCourse || null,
              initialLocation: initialLocation || null,
              submittedAt: new Date().toISOString(),
            },
          ])
        )
      } catch (err) {
        console.error('Failed to save enquiry to local storage', err)
      }
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 450)
  }

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

      <div
        className="enquiry-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="enquiry-modal__header">
          <h2 id="enquiry-modal-title" className="enquiry-modal__title">
            ENQUIRY FORM
          </h2>
          <button
            className="enquiry-modal__close-btn"
            type="button"
            onClick={onClose}
            aria-label="Close enquiry form"
          >
            <X size={16} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        {isSuccess ? (
          <div className="enquiry-modal__success" aria-live="polite">
            <div className="enquiry-modal__success-icon">
              <CheckCircle2 size={42} aria-hidden="true" />
            </div>
            <h3 className="enquiry-modal__success-title">Thank you, {values.name}!</h3>
            <p className="enquiry-modal__success-desc">
              Your enquiry has been successfully submitted. Our expert educational counsellors will contact you shortly.
            </p>
            <button
              type="button"
              className="button button--secondary enquiry-modal__submit-btn"
              onClick={onClose}
              style={{ marginTop: '1rem' }}
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form className="enquiry-modal__form" onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="enquiry-modal__field">
              <input
                id="modal-enquiry-name"
                name="name"
                type="text"
                placeholder="Full Name"
                className={`enquiry-modal__input ${errors.name ? 'enquiry-modal__input--error' : ''}`}
                value={values.name}
                onChange={handleChange}
                autoComplete="name"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <span className="enquiry-modal__error-text">{errors.name}</span>
              )}
            </div>

            {/* Email Address */}
            <div className="enquiry-modal__field">
              <input
                id="modal-enquiry-email"
                name="email"
                type="email"
                placeholder="Email Address"
                className={`enquiry-modal__input ${errors.email ? 'enquiry-modal__input--error' : ''}`}
                value={values.email}
                onChange={handleChange}
                autoComplete="email"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <span className="enquiry-modal__error-text">{errors.email}</span>
              )}
            </div>

            {/* Phone Number */}
            <div className="enquiry-modal__field">
              <input
                id="modal-enquiry-mobile"
                name="mobile"
                type="tel"
                placeholder="Phone Number"
                className={`enquiry-modal__input ${errors.mobile ? 'enquiry-modal__input--error' : ''}`}
                value={values.mobile}
                onChange={handleChange}
                autoComplete="tel"
                aria-invalid={!!errors.mobile}
              />
              {errors.mobile && (
                <span className="enquiry-modal__error-text">{errors.mobile}</span>
              )}
            </div>

            {/* Message */}
            <div className="enquiry-modal__field">
              <textarea
                id="modal-enquiry-message"
                name="message"
                rows={4}
                placeholder="Message"
                className="enquiry-modal__textarea"
                value={values.message}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="button button--primary enquiry-modal__submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="enquiry-modal__btn-content">
                  <LoaderCircle className="spin-icon" size={18} aria-hidden="true" />
                  <span>SUBMITTING...</span>
                </span>
              ) : (
                <span>SUBMIT</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default EnquiryModal
