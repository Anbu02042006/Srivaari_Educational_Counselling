import { ArrowUpRight, Clock3, Monitor, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

function CourseCard({
  title,
  category,
  duration,
  mode,
  eligibility,
  fee,
  description,
  image,
  to,
  actionLabel = 'View details',
  className = '',
}) {
  const cardContent = (
    <article className={`content-card course-card ${className}`.trim()}>
      <div className="content-card__media">
        {image && (
          <img
            className="content-card__image"
            src={image}
            alt={`${title} course`}
            loading="lazy"
          />
        )}
        {category && <span className="content-card__badge">{category}</span>}
      </div>

      <div className="content-card__body">
        <h3 className="course-card__title">{title}</h3>
        {description && <p className="course-card__desc">{description}</p>}

        {(duration || mode) && (
          <div className="course-card__meta">
            {duration && (
              <span className="card-meta">
                <Clock3 size={15} aria-hidden="true" />
                <span>{duration}</span>
              </span>
            )}
            {mode && (
              <span className="card-meta">
                <Monitor size={15} aria-hidden="true" />
                <span>{mode}</span>
              </span>
            )}
          </div>
        )}

        {(eligibility || fee) && (
          <div className="course-card__facts">
            {eligibility && (
              <div className="course-card__fact-item">
                <span className="course-card__fact-label">Eligibility</span>
                <span className="course-card__fact-value">{eligibility}</span>
              </div>
            )}
            {fee && (
              <div className="course-card__fact-item">
                <span className="course-card__fact-label">Starting Fee</span>
                <span className="course-card__fact-value course-card__fact-value--fee">{fee}</span>
              </div>
            )}
          </div>
        )}

        <div className="course-card__footer">
          <span className="text-link">
            <span>{actionLabel}</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  )

  return to ? (
    <Link className="card-link" to={to} aria-label={`${actionLabel}: ${title}`}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  )
}

export default CourseCard
