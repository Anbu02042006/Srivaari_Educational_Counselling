import {
  FileCheck2,
  GraduationCap,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react'
import { useEffect } from 'react'
import CollegeCard from '../components/CollegeCard'
import { useEnquiry } from '../context/EnquiryContext'
import { schoolBoards } from '../data/schoolCoursesData'

function SchoolCoursesPage() {
  const { openEnquiry } = useEnquiry()

  useEffect(() => {
    document.title = 'Courses for 10th, 11th & 12th | NIOS & Open Schooling | Sri Vaari'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Direct admission, Transfer of Credit (TOC), and coaching guidance for 10th, 11th, and 12th standards through NIOS and recognized Open Boards at Sri Vaari Educational Counselling.'
      )
    }
  }, [])

  const handleEnquireClick = (boardName) => {
    openEnquiry({
      initialCourse: boardName || '10th / 11th / 12th Courses',
      initialStream: 'School Education & Open Boards',
      source: `School Courses: ${boardName || 'General Inquiry'}`,
    })
  }

  return (
    <main className="school-page">
      {/* 1. HERO SECTION */}
      <header className="page-hero school-hero">
        <div className="container school-hero__container">
          <div className="school-hero__eyebrow page-hero-eyebrow">
            <span className="school-hero__eyebrow-line" aria-hidden="true" />
            <span>SECONDARY &amp; HIGHER SECONDARY PATHWAYS</span>
          </div>

          <h1 className="page-hero__title school-hero__title page-hero-title">
            Courses for <br />
            <span className="text-highlight">10th, 11th &amp; 12th</span> Standards
          </h1>

          <p className="page-hero__lead school-hero__lead page-hero-lead">
            Govt.-recognized Secondary (SSLC) and Senior Secondary (+2) open schooling with <strong>NIOS Open School Board</strong>, <strong>Sikkim Open School Board</strong>, <strong>Jamia Urdu Aligarh</strong>, and <strong>Atal Bihari Vajpayee Secondary &amp; Higher Secondary Education</strong>. Academic recovery (TOC) and coaching with 100% academic continuity.
          </p>

          <div className="school-hero__features page-hero-features">
            <div className="school-hero__feature-item">
              <div className="school-hero__feature-icon">
                <ShieldCheck size={16} aria-hidden="true" />
              </div>
              <span className="school-hero__feature-text">
                Central &amp; State
                <br />
                Govt. Recognized
              </span>
            </div>

            <div className="school-hero__feature-divider" aria-hidden="true" />

            <div className="school-hero__feature-item">
              <div className="school-hero__feature-icon">
                <RotateCcw size={16} aria-hidden="true" />
              </div>
              <span className="school-hero__feature-text">
                Save Your
                <br />
                Academic Year
              </span>
            </div>

            <div className="school-hero__feature-divider" aria-hidden="true" />

            <div className="school-hero__feature-item">
              <div className="school-hero__feature-icon">
                <GraduationCap size={16} aria-hidden="true" />
              </div>
              <span className="school-hero__feature-text">
                Eligible For All
                <br />
                Colleges &amp; Exams
              </span>
            </div>

            <div className="school-hero__feature-divider" aria-hidden="true" />

            <div className="school-hero__feature-item">
              <div className="school-hero__feature-icon">
                <FileCheck2 size={16} aria-hidden="true" />
              </div>
              <span className="school-hero__feature-text">
                English &amp; Tamil
                <br />
                Medium Options
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. RECOGNIZED SCHOOL BOARDS SHOWCASE */}
      <div className="colleges-content-section">
        <div className="container">
          <div className="colleges-stream-content">
            <section className="colleges-stream-section" aria-labelledby="heading-school-boards">
              <div className="colleges-stream-section__header reveal-fade-up">
                <div className="colleges-stream-section__title-group">
                  <div className="colleges-stream-section__icon-wrap colleges-stream-section__icon-wrap--engineering">
                    <GraduationCap size={20} aria-hidden="true" />
                  </div>
                  <div className="colleges-stream-section__text-col">
                    <h2 id="heading-school-boards" className="colleges-stream-section__title">
                      <span>Recognized School Boards</span>
                      <span className="colleges-stream-section__count-badge">
                        {schoolBoards.length} Boards
                      </span>
                    </h2>
                  </div>
                </div>
              </div>

              {/* Exact Colleges Cards Grid */}
              <div className="colleges-cards-grid reveal-stagger-group">
                {schoolBoards.map((board) => (
                  <CollegeCard
                    key={board.id}
                    name={board.name}
                    image={board.image}
                    onClick={() => handleEnquireClick(`${board.name} Admission`)}
                    className="reveal-stagger-item"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SchoolCoursesPage
