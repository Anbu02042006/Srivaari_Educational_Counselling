import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

function Logo({ onNavigate, isDark = false }) {
  return (
    <Link 
      className={`brand ${isDark ? 'brand--dark' : ''}`.trim()} 
      to="/" 
      onClick={onNavigate} 
      aria-label="Pathway Education home"
    >
      <span className="brand__mark" aria-hidden="true">
        <GraduationCap size={20} strokeWidth={2.25} />
      </span>
      <span className="brand__text">
        Pathway<span className="brand__sub">Education</span>
      </span>
    </Link>
  )
}

export default Logo
