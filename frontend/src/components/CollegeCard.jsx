import { Building2 } from 'lucide-react'

function CollegeCard({
  name,
  image,
  className = '',
  onClick,
}) {
  return (
    <article
      className={`college-grid-card ${onClick ? 'college-grid-card--interactive' : ''} ${className}`.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick(e)
              }
            }
          : undefined
      }
    >
      {/* Circle Logo Frame */}
      <div className="college-grid-card__circle-wrap">
        <div className="college-grid-card__circle">
          {image ? (
            <img
              className="college-grid-card__img"
              src={image}
              alt={`${name} logo`}
              loading="lazy"
            />
          ) : (
            <div className="college-grid-card__placeholder">
              <Building2 size={36} aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      {/* Body Content - College Name Only */}
      <div className="college-grid-card__body college-grid-card__body--minimal">
        <h3 className="college-grid-card__title">
          {name}
        </h3>
      </div>
    </article>
  )
}

export default CollegeCard
