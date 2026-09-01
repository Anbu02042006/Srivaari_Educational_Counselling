import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function EducationSlideshow({ onEnquire }) {
  // HIDDEN COMPONENT: This component is now only used for Desktop/Tablet layout reference
  // and is kept to protect existing non-mobile structures as per instructions.
  return (
    <div className="education-slideshow">
      <div className="education-slideshow__viewport">
        <img
          src="/images/counselling-partnership.jpg"
          alt="Education counselling partnership"
          className="education-slideshow__img"
        />
      </div>
    </div>
  )
}

export default EducationSlideshow

