import { useEffect } from 'react'

/**
 * useScrollReveal
 * High-performance IntersectionObserver hook for viewport-triggered reveals.
 * Automatically reveals elements with `.reveal-on-scroll`, `.reveal-fade-up`,
 * `.reveal-scale-in`, or `.reveal-stagger-group`.
 *
 * - Unobserves each element as soon as it enters the viewport (zero lingering listeners).
 * - Applies staggered transition delays to `.reveal-stagger-item` children (70ms steps).
 * - Bypasses immediately when user has `prefers-reduced-motion: reduce`.
 */
export default function useScrollReveal(dependencies = []) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      document
        .querySelectorAll('.reveal-on-scroll, .reveal-fade-up, .reveal-scale-in, .reveal-stagger-group')
        .forEach((el) => {
          el.classList.add('is-revealed')
        })
      return
    }

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target

          // If this is a staggered group, apply sequential delays to its direct child items
          if (target.classList.contains('reveal-stagger-group') || target.classList.contains('study-cards-grid')) {
            const items = target.querySelectorAll('.reveal-stagger-item, .study-card-item')
            items.forEach((item, index) => {
              const delay = Math.min(index * 115, 950) // Calm, graceful stagger wave
              item.style.transitionDelay = `${delay}ms`
              requestAnimationFrame(() => {
                item.classList.add('is-revealed')
              })
            })
          }

          requestAnimationFrame(() => {
            target.classList.add('is-revealed')
          })

          observer.unobserve(target)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -30px 0px', // Trigger slightly before hitting viewport bottom
      threshold: 0.08,
    })

    const attachElements = () => {
      const targets = document.querySelectorAll(
        '.reveal-on-scroll:not(.is-revealed), .reveal-fade-up:not(.is-revealed), .reveal-scale-in:not(.is-revealed), .reveal-stagger-group:not(.is-revealed), .study-cards-grid:not(.is-revealed)'
      )
      targets.forEach((el) => observer.observe(el))
    }

    // Defer initial attach by one frame so browser finishes styling initial unrevealed states
    const rafId = requestAnimationFrame(() => {
      attachElements()
    })

    // Watch for dynamic DOM updates (route changes, filter changes)
    const mutationObserver = new MutationObserver(() => {
      attachElements()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, dependencies)
}
