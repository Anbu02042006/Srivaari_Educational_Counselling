import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

function CTASection({
  eyebrow = 'Take the next step',
  title,
  description,
  primaryLabel = 'Talk to an expert',
  secondaryLabel = 'Explore services',
  primaryTo = '/contact',
  secondaryTo = '/services',
  onPrimaryClick,
  onSecondaryClick,
  className = '',
}) {
  return (
    <section className={`cta-section ${className}`.trim()}>
      <div className="container cta-section__content">
        <div className="cta-section__text">
          {eyebrow && (
            <span className="eyebrow cta-section__eyebrow">
              <Sparkles size={14} className="cta-section__icon" aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          {title && <h2 className="cta-section__title">{title}</h2>}
          {description && <p className="cta-section__desc">{description}</p>}
        </div>

        <div className="cta-section__actions">
          {primaryTo ? (
            <Link
              className="button button--primary cta-section__primary-btn"
              to={primaryTo}
              onClick={onPrimaryClick}
            >
              <span>{primaryLabel}</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          ) : (
            <button
              type="button"
              className="button button--primary cta-section__primary-btn"
              onClick={onPrimaryClick}
            >
              <span>{primaryLabel}</span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          )}

          {secondaryLabel && (
            secondaryTo ? (
              <Link
                className="button button--secondary cta-section__secondary-btn"
                to={secondaryTo}
                onClick={onSecondaryClick}
              >
                <span>{secondaryLabel}</span>
              </Link>
            ) : (
              <button
                type="button"
                className="button button--secondary cta-section__secondary-btn"
                onClick={onSecondaryClick}
              >
                <span>{secondaryLabel}</span>
              </button>
            )
          )}
        </div>
      </div>
    </section>
  )
}

export default CTASection
