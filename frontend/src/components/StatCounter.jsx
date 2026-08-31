function StatCounter({
  value,
  label,
  icon: Icon,
  className = '',
}) {
  return (
    <div className={`stat-card ${className}`.trim()}>
      {Icon && (
        <span className="stat-card__icon" aria-hidden="true">
          <Icon size={20} />
        </span>
      )}
      <strong className="stat-card__value">{value}</strong>
      <span className="stat-card__label">{label}</span>
    </div>
  )
}

export default StatCounter
