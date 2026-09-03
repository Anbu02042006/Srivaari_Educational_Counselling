import { Link, useLocation } from 'react-router-dom'

function Logo({ onNavigate, isDark = false }) {
  const location = useLocation()

  const handleClick = (e) => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (onNavigate) {
      onNavigate(e)
    }
  }

  return (
    <Link 
      className={`brand ${isDark ? 'brand--dark' : ''}`.trim()} 
      to="/" 
      onClick={handleClick} 
      aria-label="Sri Vaari home"
    >
      <img
        src="/logo.png"
        alt="Sri Vaari Logo"
        className="brand__img"
        width="44"
        height="44"
      />
      <span className="brand__text">Sri Vaari</span>
    </Link>
  )
}

export default Logo
