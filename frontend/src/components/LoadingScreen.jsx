import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const location = useLocation()
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      // Initial page load: smooth display to allow assets to settle
      const timer = setTimeout(() => {
        setIsLoading(false)
        const hideTimer = setTimeout(() => setIsVisible(false), 350)
        return () => clearTimeout(hideTimer)
      }, 650)
      return () => clearTimeout(timer)
    }

    // Subsequent route navigation transition
    setIsVisible(true)
    setIsLoading(true)

    const timer = setTimeout(() => {
      setIsLoading(false)
      const hideTimer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(hideTimer)
    }, 320)

    return () => clearTimeout(timer)
  }, [location.pathname])

  if (!isVisible) return null

  return (
    <div
      className={`app-page-loader ${!isLoading ? 'app-page-loader--fading' : ''}`}
      aria-label="Loading page"
      role="status"
      aria-live="polite"
    >
      <div className="app-page-loader__content">
        <div className="app-page-loader__logo-wrap">
          <div className="app-page-loader__ring" aria-hidden="true" />
          <img
            src="/sri_vaari_emblem.svg"
            alt="Sri Vaari Educational Groups Logo"
            className="app-page-loader__logo"
            onError={(e) => {
              e.currentTarget.src = '/logo.png'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
