import { ArrowUpRight, Award, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

function CollegeCard({
  name,
  location,
  city,
  state,
  type,
  accreditation,
  popularCourses = [],
  description,
  image,
  to,
  actionLabel = 'View Details',
  className = '',
}) {
  const displayLocation = location || (city && state ? `${city}, ${state}` : city || state || '')

  const cardContent = (
    <article className={`content-card college-card ${className}`.trim()}>
      <div className="content-card__media">
        {image && (
          <img
            className="content-card__image"
            src={image}
            alt={`${name} campus`}
            loading="lazy"
          />
        )}
        {type && <span className="content-card__badge">{type}</span>}
      </div>

      <div className="content-card__body">
        <div className="college-card__header">
          <h3 className="college-card__title">{name}</h3>
          {displayLocation && (
            <span className="card-meta">
              <MapPin size={15} aria-hidden="true" />
              <span>{displayLocation}</span>
            </span>
          )}
        </div>

        {accreditation && (
          <div className="college-card__accreditation">
            <Award size={15} aria-hidden="true" />
            <span>{accreditation}</span>
          </div>
        )}

        {description && <p className="college-card__desc">{description}</p>}

        {popularCourses && popularCourses.length > 0 && (
          <div className="college-card__courses">
            <span className="college-card__courses-label">Popular Programs:</span>
            <div className="college-card__pills">
              {popularCourses.map((course) => (
                <span key={course} className="college-card__pill">
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="college-card__footer">
          <span className="text-link">
            <span>{actionLabel}</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  )

  return to ? (
    <Link className="card-link" to={to} aria-label={`${actionLabel}: ${name}`}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  )
}

export default CollegeCard
