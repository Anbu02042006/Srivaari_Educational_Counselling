import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const EnquiryContext = createContext({
  isOpen: false,
  openEnquiry: () => {},
  closeEnquiry: () => {},
  enquiryContext: null,
})

export function EnquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [enquiryContext, setEnquiryContext] = useState(null)

  const openEnquiry = useCallback((context = null) => {
    setEnquiryContext(context)
    setIsOpen(true)
  }, [])

  const closeEnquiry = useCallback(() => {
    setIsOpen(false)
    setEnquiryContext(null)
  }, [])

  // Listen to global custom events so non-React or deeply nested triggers can easily open the modal
  useEffect(() => {
    const handleOpen = (e) => {
      openEnquiry(e.detail || null)
    }
    const handleClose = () => {
      closeEnquiry()
    }

    window.addEventListener('open-enquiry-modal', handleOpen)
    window.addEventListener('close-enquiry-modal', handleClose)

    return () => {
      window.removeEventListener('open-enquiry-modal', handleOpen)
      window.removeEventListener('close-enquiry-modal', handleClose)
    }
  }, [openEnquiry, closeEnquiry])

  return (
    <EnquiryContext.Provider value={{ isOpen, openEnquiry, closeEnquiry, enquiryContext }}>
      {children}
    </EnquiryContext.Provider>
  )
}

export function useEnquiry() {
  const context = useContext(EnquiryContext)
  if (!context) {
    return {
      isOpen: false,
      openEnquiry: () => {
        window.dispatchEvent(new CustomEvent('open-enquiry-modal'))
      },
      closeEnquiry: () => {
        window.dispatchEvent(new CustomEvent('close-enquiry-modal'))
      },
      enquiryContext: null,
    }
  }
  return context
}
