import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function ServiceCard({
  icon: Icon,
  number,
  title,
  description,
  actionLabel = 'Learn more',
  to,
  onClick,
  className = '',
}) {
  const content = (
    <article className={`service-card ${className}`.trim()}>
      <div className="service-card__top">
        <span className="service-card__icon" aria-hidden="true">
          {Icon && <Icon size={22} />}
        </span>
        {number && <span className="service-card__number">{number}</span>}
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{description}</p>
      <div className="service-card__bottom">
        <span className="text-link">
          {actionLabel}
          <ArrowUpRight size={17} aria-hidden="true" />
        </span>
      </div>
    </article>
  )

  if (to) {
    return (
      <Link className="card-link" to={to} aria-label={`${actionLabel}: ${title}`}>
        {content}
      </Link>
    )
  }

  if (onClick) {
    return (
      <div className="card-link" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } }}>
        {content}
      </div>
    )
  }

  return content
}

export default ServiceCard
