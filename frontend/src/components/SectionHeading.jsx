function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  action = null,
  isDark = false,
}) {
  return (
    <div
      className={`section-heading section-heading--${align} ${isDark ? 'section-heading--dark' : ''} ${className}`.trim()}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2>{title}</h2>}
      {description && <p className="section-heading__description">{description}</p>}
      {action && <div className="section-heading__action">{action}</div>}
    </div>
  )
}

export default SectionHeading
