import {
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'

const faqItems = [
  [
    'Courses',
    'How do I choose a course?',
    'Start with your personal interests, career goals, eligibility, and preferred learning format (online, on-campus, or hybrid). Our counsellors can help you compare syllabus structures and future employment possibilities.',
  ],
  [
    'Admissions',
    'Can you help with applications and document submissions?',
    'Yes. We assist you through each step of the admission workflow, including application deadlines, statement of purpose guidelines, required transcripts, and institutional entrance criteria.',
  ],
  [
    'Counselling',
    'What happens during a counselling session?',
    'A counselling session is a focused, 1-on-1 discussion assessing your academic background, career interests, and practical constraints. We provide structured course and college recommendations with zero sales pressure.',
  ],
  [
    'Colleges',
    'How do you shortlist colleges and universities?',
    'We evaluate recognized autonomous institutions based on accreditation, faculty pedigree, campus infrastructure, fee structures, location preferences, and historical placement records.',
  ],
  [
    'Study Abroad',
    'Can you guide me on international study opportunities?',
    'Yes. We help students explore global university prerequisites, country-specific visa processes, scholarship avenues, and international credential equivalencies.',
  ],
  [
    'Courses',
    'Do you offer guidance for online and hybrid degrees?',
    'Yes. We provide thorough comparisons between accredited online degree programs, executive diplomas, and traditional on-campus degrees to help you choose the right balance of flexibility and prestige.',
  ],
]

const categories = ['All', 'Courses', 'Admissions', 'Counselling', 'Colleges', 'Study Abroad']

function FaqPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState(0)

  const filteredFaqs = useMemo(() => {
    return faqItems.filter(([kind, question, answer]) => {
      const matchesCat = category === 'All' || kind === category
      const matchesSearch = `${question} ${answer} ${kind}`
        .toLowerCase()
        .includes(search.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [search, category])

  return (
    <main className="faq-page">
      {/* 1. HERO */}
      <header className="page-hero">
        <div className="container">
          <span className="eyebrow page-hero__eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            Frequently Asked Questions
          </span>
          <h1 className="page-hero__title">Helpful Answers for Your Next Step.</h1>
          <p className="page-hero__lead">
            Search by keyword or select a topic to find immediate answers regarding counselling, courses, college selections, and admissions.
          </p>
        </div>
      </header>

      {/* 2. FAQ INTERACTIVE SECTION */}
      <section className="home-section">
        <div className="container faq-page-layout">
          {/* Search & Category Filter Toolbar */}
          <div className="faq-toolbar">
            <div className="search-field faq-search-field">
              <Search size={20} aria-hidden="true" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions or topics (e.g. admission, syllabus)..."
                aria-label="Search questions"
              />
              {search && (
                <button
                  type="button"
                  className="search-field__clear"
                  onClick={() => setSearch('')}
                  aria-label="Clear FAQ search"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="category-filter" role="tablist" aria-label="FAQ category filter">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={category === cat}
                  className={`category-filter__pill ${category === cat ? 'is-active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="faq-list faq-list--page" role="region" aria-label="Questions and Answers">
            {filteredFaqs.map(([kind, question, answer], index) => {
              const isOpen = openIndex === index
              return (
                <article
                  key={question}
                  className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-item-ans-${index}`}
                      id={`faq-item-q-${index}`}
                    >
                      <span className="faq-item__question-group">
                        <span className="faq-item__category-badge">{kind}</span>
                        <span className="faq-item__question-text">{question}</span>
                      </span>
                      <ChevronDown size={20} aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    id={`faq-item-ans-${index}`}
                    className="faq-item__answer"
                    role="region"
                    aria-labelledby={`faq-item-q-${index}`}
                    hidden={!isOpen}
                  >
                    <p>{answer}</p>
                  </div>
                </article>
              )
            })}

            {filteredFaqs.length === 0 && (
              <div className="faq-empty-state">
                <HelpCircle size={40} className="faq-empty-state__icon" aria-hidden="true" />
                <h3>No matching questions found</h3>
                <p>Try searching with different terms or reset your category filter.</p>
                <button
                  type="button"
                  className="button button--secondary"
                  onClick={() => {
                    setSearch('')
                    setCategory('All')
                  }}
                >
                  Reset FAQ Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <CTASection
        eyebrow="Still Have Questions?"
        title="Speak Directly With an Education Advisor."
        description="Our counsellors are available to provide clear, personalized answers regarding your education choices."
        primaryLabel="Book Free Counselling"
        primaryTo="/counselling"
        secondaryLabel="Contact Support"
        secondaryTo="/contact"
      />
    </main>
  )
}

export default FaqPage
