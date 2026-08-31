import { Clock3, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { contactInfo } from '../data/contactInfo'
import Logo from './Logo'
import WhatsAppIcon from './WhatsAppIcon'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        {/* Brand Column */}
        <div className="site-footer__brand">
          <Logo isDark />
          <p className="site-footer__tagline">
            Dedicated to helping students and parents navigate college admissions with complete honesty, personal care, and zero stress.
          </p>
          <div className="site-footer__trust-badge">
            <span>◆ 10,000+ Families Supported</span>
            <span>◆ 100+ Verified Partner Campuses</span>
          </div>
        </div>

        {/* Column 1: Explore */}
        <div className="site-footer__col">
          <h3 className="site-footer__heading">Explore</h3>
          <ul className="site-footer__nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Photo Gallery</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 2: Contact & Office */}
        <div className="site-footer__col site-footer__contact">
          <h3 className="site-footer__heading">Get in Touch</h3>
          <address className="site-footer__address">
            <a href={contactInfo.phoneHref} className="site-footer__contact-item">
              <Phone size={16} aria-hidden="true" />
              <span>{contactInfo.phoneDisplay}</span>
            </a>
            <a href={contactInfo.emailHref} className="site-footer__contact-item">
              <Mail size={16} aria-hidden="true" />
              <span>{contactInfo.email}</span>
            </a>
            <a
              href={contactInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="site-footer__contact-link"
            >
              <WhatsAppIcon size={16} aria-hidden="true" />
              <span>WhatsApp Advisory</span>
            </a>
            <div className="site-footer__contact-item">
              <MapPin size={16} aria-hidden="true" />
              <span>{contactInfo.officeLocation}</span>
            </div>
            <div className="site-footer__contact-item">
              <Clock3 size={16} aria-hidden="true" />
              <span>{contactInfo.officeHours}</span>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container site-footer__bottom">
        <p className="site-footer__copyright">
          © {currentYear} Sri Vaari Educational Counselling. All rights reserved. Built for student success.
        </p>
      </div>
    </footer>
  )
}

export default Footer
