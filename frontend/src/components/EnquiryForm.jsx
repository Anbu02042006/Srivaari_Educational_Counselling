import { CheckCircle2, ChevronRight, LoaderCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { courses } from '../data/coursesData'

const initialValues = {
  name: '',
  mobile: '',
  email: '',
  qualification: '',
  course: '',
  mode: '',
  location: '',
  goal: '',
  message: '',
}

const courseNames = courses.map((course) => course.title)

function EnquiryForm({ initialCourse = '', initialLocation = '', onSuccess }) {
  const [values, setValues] = useState({
    ...initialValues,
    course: initialCourse,
    location: initialLocation,
  })
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
    if (!values.qualification) next.qualification = 'Please select your qualification.'
    if (!values.course) next.course = 'Please select an interested course.'
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
          Your counselling enquiry for <strong>{values.course}</strong>
          {values.location && <> in <strong>{values.location}</strong></>} has been securely received.
        </p>
        <p className="enquiry-success__note">
          Our education counsellor will review your profile and reach out within 24 hours.
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

        {/* Mobile Number */}
        <div className="form-group">
          <label htmlFor="enquiry-mobile" className="form-label">
            Mobile Number <span className="form-required">*</span>
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
        <div className="form-group">
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

        {/* Current Qualification */}
        <div className="form-group">
          <label htmlFor="enquiry-qualification" className="form-label">
            Current Qualification <span className="form-required">*</span>
          </label>
          <select
            id="enquiry-qualification"
            className={`form-select ${errors.qualification ? 'form-input--error' : ''}`}
            name="qualification"
            value={values.qualification}
            onChange={change}
            aria-invalid={!!errors.qualification}
            aria-describedby={errors.qualification ? 'enquiry-qualification-error' : undefined}
          >
            <option value="">Select your qualification</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 12">Class 12</option>
            <option value="Undergraduate degree">Undergraduate degree</option>
            <option value="Postgraduate degree">Postgraduate degree</option>
            <option value="Working professional">Working professional</option>
          </select>
          {errors.qualification && (
            <small id="enquiry-qualification-error" className="form-error-msg">
              {errors.qualification}
            </small>
          )}
        </div>

        {/* Interested Course */}
        <div className="form-group">
          <label htmlFor="enquiry-course" className="form-label">
            Interested Course <span className="form-required">*</span>
          </label>
          <select
            id="enquiry-course"
            className={`form-select ${errors.course ? 'form-input--error' : ''}`}
            name="course"
            value={values.course}
            onChange={change}
            aria-invalid={!!errors.course}
            aria-describedby={errors.course ? 'enquiry-course-error' : undefined}
          >
            <option value="">Select a course</option>
            {courseNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          {errors.course && (
            <small id="enquiry-course-error" className="form-error-msg">
              {errors.course}
            </small>
          )}
        </div>

        {/* Preferred Study Mode */}
        <div className="form-group">
          <label htmlFor="enquiry-mode" className="form-label">
            Preferred Study Mode
          </label>
          <select
            id="enquiry-mode"
            className="form-select"
            name="mode"
            value={values.mode}
            onChange={change}
          >
            <option value="">Select mode</option>
            <option value="On campus">On campus</option>
            <option value="Online">Online</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Preferred Location */}
        <div className="form-group">
          <label htmlFor="enquiry-location" className="form-label">
            Preferred Location
          </label>
          <input
            id="enquiry-location"
            className="form-input"
            name="location"
            value={values.location}
            onChange={change}
            placeholder="e.g. Bengaluru, Chennai, or Abroad"
          />
        </div>

        {/* Career Goal */}
        <div className="form-group">
          <label htmlFor="enquiry-goal" className="form-label">
            Career Goal
          </label>
          <input
            id="enquiry-goal"
            className="form-input"
            name="goal"
            value={values.goal}
            onChange={change}
            placeholder="e.g. Software Engineer, Management Consultant"
          />
        </div>
      </div>

      {/* Message */}
      <div className="form-group form-group--full">
        <label htmlFor="enquiry-message" className="form-label">
          Additional Message (Optional)
        </label>
        <textarea
          id="enquiry-message"
          className="form-textarea"
          name="message"
          value={values.message}
          onChange={change}
          rows="4"
          placeholder="Tell us any specific preferences, budget expectations, or questions you have."
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
              <span>Request Free Counselling</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default EnquiryForm
