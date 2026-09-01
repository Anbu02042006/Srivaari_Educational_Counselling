import { CheckCircle2, ChevronRight, LoaderCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialValues = {
  name: '',
  mobile: '',
  email: '',
  message: '',
}

function EnquiryForm({ onSuccess }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [storageError, setStorageError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function change(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function validate() {
    const next = {}
    if (!values.name.trim()) next.name = 'Please enter your full name.'
    if (!/^\+?[0-9\s-]{8,15}$/.test(values.mobile.trim())) {
      next.mobile = 'Enter a valid mobile number (8-15 digits).'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    return next
  }

  function submit(event) {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return

    setIsSubmitting(true)
    setStorageError('')

    window.setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('pathwayEnquiries') || '[]')
        localStorage.setItem(
          'pathwayEnquiries',
          JSON.stringify([...existing, { ...values, submittedAt: new Date().toISOString() }])
        )
        setSubmitted(true)
        onSuccess?.(values)
      } catch {
        setStorageError(
          'We could not save this request on this device. Please try again or contact us directly.'
        )
      } finally {
        setIsSubmitting(false)
      }
    }, 350)
  }

  if (submitted) {
    return (
      <section className="enquiry-success" aria-live="polite">
        <div className="enquiry-success__icon-wrapper">
          <CheckCircle2 size={36} aria-hidden="true" />
        </div>
        <span className="eyebrow enquiry-success__eyebrow">Request received</span>
        <h2 className="enquiry-success__title">Thank you, {values.name}!</h2>
        <p className="enquiry-success__desc">
          Your counselling enquiry has been securely received.
        </p>
        <p className="enquiry-success__note">
          Our education counsellor will review your details and reach out to you within 24 hours.
        </p>
        <div className="enquiry-success__actions">
          <Link className="button button--primary" to="/">
            <span>Back to Home</span>
          </Link>
          <Link className="button button--secondary" to="/services">
            <span>Explore Services</span>
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="enquiry-name" className="form-label">
            Full Name <span className="form-required">*</span>
          </label>
          <input
            id="enquiry-name"
            className={`form-input ${errors.name ? 'form-input--error' : ''}`}
            name="name"
            value={values.name}
            onChange={change}
            autoComplete="name"
            placeholder="e.g. Rahul Sharma"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
          />
          {errors.name && (
            <small id="enquiry-name-error" className="form-error-msg">
              {errors.name}
            </small>
          )}
        </div>

        {/* Mobile / Phone Number */}
        <div className="form-group">
          <label htmlFor="enquiry-mobile" className="form-label">
            Phone Number <span className="form-required">*</span>
          </label>
          <input
            id="enquiry-mobile"
            className={`form-input ${errors.mobile ? 'form-input--error' : ''}`}
            name="mobile"
            type="tel"
            value={values.mobile}
            onChange={change}
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={!!errors.mobile}
            aria-describedby={errors.mobile ? 'enquiry-mobile-error' : undefined}
          />
          {errors.mobile && (
            <small id="enquiry-mobile-error" className="form-error-msg">
              {errors.mobile}
            </small>
          )}
        </div>

        {/* Email Address */}
        <div className="form-group form-group--full">
          <label htmlFor="enquiry-email" className="form-label">
            Email Address <span className="form-required">*</span>
          </label>
          <input
            id="enquiry-email"
            className={`form-input ${errors.email ? 'form-input--error' : ''}`}
            name="email"
            type="email"
            value={values.email}
            onChange={change}
            autoComplete="email"
            placeholder="rahul@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'enquiry-email-error' : undefined}
          />
          {errors.email && (
            <small id="enquiry-email-error" className="form-error-msg">
              {errors.email}
            </small>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="form-group form-group--full">
        <label htmlFor="enquiry-message" className="form-label">
          Message
        </label>
        <textarea
          id="enquiry-message"
          className="form-textarea"
          name="message"
          value={values.message}
          onChange={change}
          rows="4"
          placeholder="Tell us about the courses, colleges, or questions you have."
        />
      </div>

      {storageError && (
        <p className="form-error-banner" role="alert">
          {storageError}
        </p>
      )}

      <div className="form-actions">
        <button
          className="button button--primary form-submit-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="spin-icon" size={18} aria-hidden="true" />
              <span>Submitting Details…</span>
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" />
              <span>Send Counselling Request</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default EnquiryForm
