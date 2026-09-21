import { Link } from 'react-router-dom'

function StudyCard({
  title,
  tagline,
  image,
  badge,
  badgeAlt = '',
  to,
  onClick,
  className = '',
}) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e)
    }
  }

  const cardInner = (
    <>
      {/* 1. Inset Image Frame with Centered Overlapping Badge */}
      <div className="study-card-media-box">
        <div className="study-card-image-wrap">
          <img
            src={image}
            alt={title}
            className="study-card-image"
            loading="lazy"
            onError={(e) => {
              if (!e.currentTarget.dataset.fallback) {
                e.currentTarget.dataset.fallback = 'true'
                e.currentTarget.src = '/logo.png'
              }
            }}
          />
        </div>

        {/* Centered Circular Badge / Avatar */}
        {badge && (
          <div className="study-card-badge" aria-hidden="true">
            <img
              src={badge}
              alt={badgeAlt || `${title} badge`}
              className="study-card-badge-img"
              loading="eager"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}
      </div>

      {/* 2. Card Content Area (Title & Description, button removed) */}
      <div className="study-card-body">
        <h3 className="study-card-title">{title}</h3>

        {tagline && (
          <p className="study-card-desc">{tagline}</p>
        )}
      </div>
    </>
  )

  return (
    <article className={`study-card-item ${className}`.trim()}>
      {to ? (
        <Link
          to={to}
          onClick={handleClick}
          className="study-card-link"
          aria-label={`Explore ${title}`}
        >
          {cardInner}
        </Link>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleClick(e)
            }
          }}
          className="study-card-link"
          aria-label={`Explore ${title}`}
        >
          {cardInner}
        </div>
      )}
    </article>
  )
}

export default StudyCard
