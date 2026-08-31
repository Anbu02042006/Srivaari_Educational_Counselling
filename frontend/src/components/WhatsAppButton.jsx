import WhatsAppIcon from './WhatsAppIcon'
import { contactInfo } from '../data/contactInfo'

function WhatsAppButton() {
  return (
    <aside className="whatsapp-widget" aria-label="WhatsApp quick chat">
      <a
        className="whatsapp-button"
        href={contactInfo.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with education counsellor on WhatsApp (opens in new tab)"
      >
        <div className="whatsapp-button__icon-wrapper">
          <WhatsAppIcon size={24} aria-hidden="true" />
        </div>
        <span className="whatsapp-button__tooltip">Chat with us</span>
      </a>
    </aside>
  )
}

export default WhatsAppButton
