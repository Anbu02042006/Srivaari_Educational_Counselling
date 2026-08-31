import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsAppButton'

function PageLayout() {
  return (
    <div id="top" className="app-shell">
      <Navbar />
      <div className="app-shell__main">
        <Outlet />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default PageLayout
