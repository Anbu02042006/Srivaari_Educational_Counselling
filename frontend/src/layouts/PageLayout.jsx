import { Outlet, useLocation } from 'react-router-dom'
import AdmissionsPopup from '../components/AdmissionsPopup'
import EnquiryModal from '../components/EnquiryModal'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import FloatingSocialBar from '../components/FloatingSocialBar'
import { useEnquiry } from '../context/EnquiryContext'
import useBlobButtons from '../hooks/useBlobButtons'
import useScrollReveal from '../hooks/useScrollReveal'

function PageLayout() {
  const location = useLocation()
  useBlobButtons()
  useScrollReveal([location.pathname])
  const { isOpen, closeEnquiry, enquiryContext } = useEnquiry()

  const isTermsPage = location.pathname === '/terms-and-conditions' || location.pathname === '/terms'

  return (
    <div id="top" className="app-shell">
      <Navbar />
      <div className="app-shell__main">
        <div key={location.pathname} className="page-route-transition">
          <Outlet />
        </div>
      </div>
      {!isTermsPage && <Footer />}
      
      {/* Floating Right-Side Social Bar and Scroll-to-Top Card */}
      <FloatingSocialBar />

      {/* Global Enquiry Popup Modal */}
      <EnquiryModal
        isOpen={isOpen}
        onClose={closeEnquiry}
        contextName={enquiryContext?.title || enquiryContext?.name}
        initialCourse={enquiryContext?.course}
        initialLocation={enquiryContext?.location}
      />

      {/* Sri Vaari Admissions 2026-27 Announcement Popup (temporarily disabled) */}
      {/* <AdmissionsPopup /> */}
    </div>
  )
}

export default PageLayout

