import { Outlet } from 'react-router-dom'
import EnquiryModal from '../components/EnquiryModal'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import FloatingSocialBar from '../components/FloatingSocialBar'
import { useEnquiry } from '../context/EnquiryContext'
import useBlobButtons from '../hooks/useBlobButtons'

function PageLayout() {
  useBlobButtons()
  const { isOpen, closeEnquiry, enquiryContext } = useEnquiry()

  return (
    <div id="top" className="app-shell">
      <Navbar />
      <div className="app-shell__main">
        <Outlet />
      </div>
      <Footer />
      
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
    </div>
  )
}

export default PageLayout
