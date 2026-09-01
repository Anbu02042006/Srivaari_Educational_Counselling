import { useEffect, useRef, useState } from 'react'

function parseValue(valueStr) {
  if (typeof valueStr !== 'string') {
    return { prefix: '', target: Number(valueStr) || 0, suffix: '', hasDecimals: false, decimalPlaces: 0 }
  }

  // Matches prefix, integer/decimal number, and suffix (e.g. "500+", "10K+", "95%")
  const match = valueStr.match(/^([^\d.]*)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) {
    return { prefix: '', target: 0, suffix: valueStr, hasDecimals: false, decimalPlaces: 0 }
  }

  const prefix = match[1] || ''
  const numStr = match[2]
  const target = parseFloat(numStr)
  const suffix = match[3] || ''
  const hasDecimals = numStr.includes('.')
  const decimalPlaces = hasDecimals ? (numStr.split('.')[1]?.length || 0) : 0

  return { prefix, target, suffix, hasDecimals, decimalPlaces }
}

function StatCounter({
  value,
  label,
  icon: Icon,
  className = '',
  duration = 1800,
}) {
  const [displayCount, setDisplayCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const cardRef = useRef(null)

  const { prefix, target, suffix, hasDecimals, decimalPlaces } = parseValue(value)

  useEffect(() => {
    if (target === 0 || hasAnimated) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true)
          observer.disconnect()

          let startTime = null
          const startValue = 0

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Ease-out cubic: fast start, soft gentle landing at target value
            const easeOutProgress = 1 - Math.pow(1 - progress, 3)
            const current = startValue + (target - startValue) * easeOutProgress

            setDisplayCount(current)

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setDisplayCount(target)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -20px 0px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [target, duration, hasAnimated])

  const formattedNumber = hasAnimated
    ? hasDecimals
      ? displayCount.toFixed(decimalPlaces)
      : Math.floor(displayCount).toLocaleString()
    : '0'

  return (
    <div ref={cardRef} className={`stat-card ${className}`.trim()}>
      <div className="stat-card__header">
        {Icon && (
          <span className="stat-card__icon" aria-hidden="true">
            <Icon size={20} />
          </span>
        )}
        <strong className="stat-card__value">
          {hasAnimated ? `${prefix}${formattedNumber}${suffix}` : `${prefix}0${suffix}`}
        </strong>
      </div>
      <span className="stat-card__label">{label}</span>
    </div>
  )
}

export default StatCounter
