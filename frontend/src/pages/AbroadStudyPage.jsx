import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AbroadCountryDetail from '../components/AbroadCountryDetail'
import { useEnquiry } from '../context/EnquiryContext'
import { abroadStudiesBySlug, abroadStudiesList } from '../data/abroadStudiesData'

function AbroadStudyPage() {
  const { slug } = useParams()
  const { openEnquiry } = useEnquiry()

  const country = slug ? abroadStudiesBySlug[slug] : null

  // Dynamic SEO meta titles
  useEffect(() => {
    if (slug && country) {
      document.title = `${country.courseTitle} | Sri Vaari Educational Counselling`
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `Complete guide to ${country.courseTitle} admissions, eligibility, top universities, duration, fees, salary, and career opportunities.`
        )
      }
    } else {
      document.title = 'Abroad Studies - Choose Your Favourite Destination | Sri Vaari Educational Counselling'
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Explore top global study destinations across Europe, Americas, Asia, and Oceania with Sri Vaari Educational Counselling. Discover NMC/WHO-recognized MBBS and global degree programs.'
        )
      }
    }
  }, [slug, country])

  const handleContactClick = (selectedCountry) => {
    const c = selectedCountry || country
    openEnquiry({
      initialCourse: c?.courseTitle || 'Abroad Studies',
      initialStream: 'Medical (MBBS Abroad)',
      source: `Abroad Studies: ${c?.name || 'General Inquiry'}`,
    })
  }

  // Individual Country Detail View (when slug is present in URL)
  if (slug) {
    if (!country) {
      return (
        <div className="abroad-study-page">
          <div className="container abroad-study-container abroad-not-found">
            <h2>Destination Not Found</h2>
            <p>We couldn't find a study guide for "{slug}".</p>
            <Link to="/abroad-studies" className="button button--primary">
              <ArrowLeft size={16} />
              <span>Back to All Destinations</span>
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div className="abroad-study-page">
        <div className="container abroad-study-container">
          {/* Exact Reference UI Component */}
          <AbroadCountryDetail
            country={country}
            onContact={handleContactClick}
          />
        </div>
      </div>
    )
  }

  // Landing Page View (when on /abroad-studies without slug)
  return (
    <div className="abroad-landing-page">
      <div className="container abroad-study-container">
        {/* 1. Header Section matching reference theme */}
        <header className="abroad-landing__header">
          <h1 className="abroad-landing__title">
            Choose Your Favourite Study Abroad Destination!
          </h1>
          <p className="abroad-landing__subtitle">
            Explore prestigious international universities offering globally recognized degrees across Medical (MBBS), Healthcare, Engineering, Sciences, and Management. Backed by <strong>27+ years of trusted counselling</strong>, Sri Vaari Educational Groups provides comprehensive guidance on NMC &amp; WHO accreditations, direct admissions, visa processing, transparent fee structures, and rewarding global career opportunities.
          </p>
          {/* Dual-tone decorative accent bar */}
          <div className="abroad-landing__divider" aria-hidden="true">
            <span className="abroad-landing__divider-dark" />
            <span className="abroad-landing__divider-blue" />
          </div>
        </header>

        {/* 2. Destination Cards Grid */}
        <div className="colleges-cards-grid">
          {abroadStudiesList.map((item) => (
            <article key={item.slug} className="college-grid-card college-grid-card--interactive">
              <Link
                to={`/abroad-studies/${item.slug}`}
                className="college-grid-card__link"
                aria-label={`Learn more about studying in ${item.name}`}
              >
                <div className="college-grid-card__circle-wrap">
                  <div className="college-grid-card__circle-relative">
                    <div className="college-grid-card__circle">
                      <img
                        className="college-grid-card__img"
                        alt={`${item.name} landmark`}
                        loading="lazy"
                        src={item.image}
                        onError={(e) => {
                          if (!e.currentTarget.dataset.fallback) {
                            e.currentTarget.dataset.fallback = 'true'
                            e.currentTarget.src = item.flag || '/logo.png'
                          }
                        }}
                      />
                    </div>
                    {item.flag && (
                      <div className="college-grid-card__badge-flag" title={`${item.name} flag`}>
                        <img
                          src={item.flag}
                          alt={`${item.name} flag`}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="college-grid-card__body college-grid-card__body--minimal">
                  <h3 className="college-grid-card__title">{item.name}</h3>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AbroadStudyPage
