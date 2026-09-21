import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop Component
 * Automatically resets scroll position to the top of the page on route changes.
 */
function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    try {
      if (sessionStorage.getItem('scroll_to_contact')) {
        return
      }
    } catch {
      // ignore
    }

    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    // Instantly reset viewport scroll to starting top position
    window.scrollTo(0, 0)
  }, [pathname, search, hash])

  return null
}

export default ScrollToTop
