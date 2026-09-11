import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import ScrollToTop from './components/ScrollToTop'
import { EnquiryProvider } from './context/EnquiryContext'
import PageLayout from './layouts/PageLayout'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import AbroadStudyPage from './pages/AbroadStudyPage'
import CollegesPage from './pages/CollegesPage'
import ContactPage from './pages/ContactPage'
import DomesticStudyPage from './pages/DomesticStudyPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <EnquiryProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/colleges" element={<CollegesPage />} />
            <Route path="/domestic-studies" element={<DomesticStudyPage />} />
            <Route path="/domestic-studies/:slug" element={<DomesticStudyPage />} />
            <Route path="/abroad-studies" element={<AbroadStudyPage />} />
            <Route path="/abroad-studies/:slug" element={<AbroadStudyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </EnquiryProvider>
    </BrowserRouter>
  )
}

export default App
