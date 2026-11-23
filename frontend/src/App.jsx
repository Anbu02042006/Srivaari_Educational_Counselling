import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import ScrollToTop from './components/ScrollToTop'
import { EnquiryProvider } from './context/EnquiryContext'
import PageLayout from './layouts/PageLayout'
import AboutPage from './pages/AboutPage'
import AbroadStudyPage from './pages/AbroadStudyPage'
import CollegesPage from './pages/CollegesPage'
import ContactPage from './pages/ContactPage'
import DistanceCollegeCoursesPage from './pages/DistanceCollegeCoursesPage'
import DistanceEducationPage from './pages/DistanceEducationPage'
import DomesticStudyPage from './pages/DomesticStudyPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import SchoolCoursesPage from './pages/SchoolCoursesPage'
import TermsConditionsPage from './pages/TermsConditionsPage'

function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <EnquiryProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<HomePage />} />
            {/* Colleges, Domestic & Abroad pages (routes removed per request, code preserved) */}
            {/* <Route path="/colleges" element={<CollegesPage />} /> */}
            {/* <Route path="/domestic-studies" element={<DomesticStudyPage />} /> */}
            {/* <Route path="/domestic-studies/:slug" element={<DomesticStudyPage />} /> */}
            {/* <Route path="/abroad-studies" element={<AbroadStudyPage />} /> */}
            {/* <Route path="/abroad-studies/:slug" element={<AbroadStudyPage />} /> */}
            <Route path="/distance-education" element={<DistanceEducationPage />} />
            <Route path="/distance-education/:slug" element={<DistanceCollegeCoursesPage />} />
            <Route path="/distance-courses/:slug?" element={<DistanceCollegeCoursesPage />} />
            <Route path="/school-courses" element={<SchoolCoursesPage />} />
            <Route path="/courses-for-10th-11th-12th" element={<SchoolCoursesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
            <Route path="/terms" element={<TermsConditionsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </EnquiryProvider>
    </BrowserRouter>
  )
}

export default App
