import { Quote, Star } from 'lucide-react'

function TestimonialCard({
  quote,
  name,
  detail,
  avatar,
  rating = 5,
  className = '',
}) {
  return (
    <article className={`testimonial-card ${className}`.trim()}>
      <div className="testimonial-card__header">
        <div className="testimonial-card__stars" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: rating }, (_, index) => (
            <Star key={index} size={16} fill="currentColor" aria-hidden="true" />
          ))}
        </div>
        <Quote className="testimonial-card__quote" size={26} aria-hidden="true" />
      </div>

      <blockquote className="testimonial-card__body">
        “{quote}”
      </blockquote>

      <footer className="testimonial-card__person">
        {avatar ? (
          <span className="avatar-placeholder" aria-hidden="true">
            {avatar}
          </span>
        ) : (
          <span className="avatar-placeholder" aria-hidden="true">
            {name ? name.charAt(0).toUpperCase() : 'S'}
          </span>
        )}
        <div className="testimonial-card__meta">
          <strong className="testimonial-card__name">{name}</strong>
          {detail && <span className="testimonial-card__detail">{detail}</span>}
        </div>
      </footer>
    </article>
  )
}

export default TestimonialCard
