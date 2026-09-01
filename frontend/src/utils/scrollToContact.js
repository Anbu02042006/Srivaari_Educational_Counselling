export function scrollToContact(e) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault()
  }

  const contactEl = document.getElementById('contact') || document.getElementById('enquire')
  if (contactEl) {
    contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    try {
      sessionStorage.setItem('scroll_to_contact', '1')
    } catch {
      // ignore
    }
    window.location.href = '/'
  }
}
