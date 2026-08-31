import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop Component
 * Automatically resets scroll position to the top of the page on route changes.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    // Instantly reset viewport scroll to starting top position
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
