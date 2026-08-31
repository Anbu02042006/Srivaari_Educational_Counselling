import {
  Camera,
  Compass,
  Home,
  PhoneCall,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="container not-found-container">
        <div className="not-found-card">
          <span className="not-found-code" aria-hidden="true">
            404
          </span>

          <span className="eyebrow not-found-eyebrow">
            <Compass size={14} aria-hidden="true" />
            Page Not Found
          </span>

          <h1 className="not-found-title">
            Looks like this path took a different turn.
          </h1>

          <p className="not-found-lead">
            The page you are looking for might have been moved, updated, or is no longer available. Let’s get you back on track to exploring your education choices.
          </p>

          <div className="hero__actions not-found-actions">
            <Link className="button button--primary" to="/">
              <Home size={17} aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
            <Link className="button button--secondary" to="/services">
              <Compass size={17} aria-hidden="true" />
              <span>Explore Services</span>
            </Link>
          </div>

          <div className="not-found-links">
            <span className="not-found-links__title">Popular destinations:</span>
            <div className="not-found-links__grid">
              <Link to="/about" className="not-found-link-item">
                <Sparkles size={16} aria-hidden="true" />
                <span>About Us</span>
              </Link>
              <Link to="/services" className="not-found-link-item">
                <Compass size={16} aria-hidden="true" />
                <span>Advisory Services</span>
              </Link>
              <Link to="/gallery" className="not-found-link-item">
                <Camera size={16} aria-hidden="true" />
                <span>Photo Gallery</span>
              </Link>
              <Link to="/contact" className="not-found-link-item">
                <PhoneCall size={16} aria-hidden="true" />
                <span>Contact Advisory</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
