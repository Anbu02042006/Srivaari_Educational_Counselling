import { Link } from 'react-router-dom'

function Logo({ onNavigate, isDark = false }) {
  return (
    <Link 
      className={`brand ${isDark ? 'brand--dark' : ''}`.trim()} 
      to="/" 
      onClick={onNavigate} 
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
