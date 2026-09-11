import { ArrowRight, Award, Calendar, ShieldCheck, Users } from 'lucide-react'

function getLocationTag(country) {
  if (!country) return ''
  if (country.locationTag) return country.locationTag
  if (country.landmark) {
    const parts = country.landmark.split(',')
    const city = parts[parts.length - 1].trim()
    return `${city}, ${country.name}`
  }
  return country.name
}

function AbroadCountryDetail({ country, onContact }) {
  if (!country) return null

  const particulars = country.particulars || []
  const locationTag = getLocationTag(country)
  const bannerTitle =
    country.bannerTitle ||
    `TOP MEDICAL UNIVERSITIES IN ${country.name?.toUpperCase()} (MBBS / MD)`

  return (
    <section className="abroad-detail-view" aria-label={`${country.name} MBBS Information`}>
      {/* 1. TOP COURSE HEADER BANNER */}
      <div className="abroad-study-banner">
        <h2 className="abroad-study-banner__title">{bannerTitle}</h2>
      </div>

      {/* 2. OVERVIEW & QUICK FACTS CONTAINER */}
      <div className="abroad-overview-card">
        {/* Left: Destination Landmark Photo */}
        <div className="abroad-overview-media">
          <img
            src={country.skylineImage || country.bannerImage || country.image}
            alt={`${country.name} landmark - ${country.landmark || country.name}`}
            className="abroad-overview-photo"
            loading="eager"
            onError={(e) => {
              if (country.image && e.currentTarget.src !== country.image) {
                e.currentTarget.src = country.image
              }
            }}
          />
        </div>

        {/* Right: Overview & Quick Facts Content */}
        <div className="abroad-overview-info">
          {/* Overview Block */}
          <div className="abroad-overview-block">
            <h3 className="abroad-block-heading">Overview</h3>
            <p className="abroad-block-desc">
              {country.overview || country.description}
            </p>
          </div>

          {/* Quick Facts Block */}
          <div className="abroad-quickfacts-block">
            <h3 className="abroad-block-heading">Quick Facts</h3>
            <p className="abroad-block-desc">
              {country.quickFacts ||
                `${country.name} offers globally recognized medical curricula with modern teaching hospitals, optimal student-to-faculty ratios, and direct flights from India.`}
            </p>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: Particulars Table + Sidebar Card */}
      <div className="abroad-bottom-grid">
        {/* Left Column: 11-Point Course Particulars Table */}
        <div className="abroad-table-card">
          <table className="abroad-particulars-table" aria-label={`MBBS Course Details in ${country.name}`}>
            <thead>
              <tr>
                <th scope="col" className="abroad-table__th abroad-table__th--particulars">
                  Particulars
                </th>
                <th scope="col" className="abroad-table__th abroad-table__th--details">
                  MBBS Course Details
                </th>
              </tr>
            </thead>
            <tbody>
              {particulars.map((row, idx) => (
                <tr key={idx} className="abroad-table__tr">
                  <td className="abroad-table__td abroad-table__td--label">
                    {row.label}
                  </td>
                  <td className="abroad-table__td abroad-table__td--value">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Column: Sri Vaari Educational Groups Sidebar Card */}
        <aside className="abroad-sidebar-wrapper">
          <div className="abroad-promo-card">
            <span className="abroad-promo-card__eyebrow">
              SRI VAARI EDUCATIONAL GROUPS
            </span>

            <h3 className="abroad-promo-card__title">
              MBBS In {country.name} For Indian Students.
            </h3>

            <ul className="abroad-promo-card__features">
              <li className="abroad-promo-feature">
                <span className="abroad-promo-icon-wrap" aria-hidden="true">
                  <ShieldCheck size={19} />
                </span>
                <span className="abroad-promo-text">100% Trusted</span>
              </li>
              <li className="abroad-promo-feature">
                <span className="abroad-promo-icon-wrap" aria-hidden="true">
                  <Users size={19} />
                </span>
                <span className="abroad-promo-text">Professional Services</span>
              </li>
              <li className="abroad-promo-feature">
                <span className="abroad-promo-icon-wrap" aria-hidden="true">
                  <Calendar size={19} />
                </span>
                <span className="abroad-promo-text">Since 1997</span>
              </li>
              <li className="abroad-promo-feature">
                <span className="abroad-promo-icon-wrap" aria-hidden="true">
                  <Award size={19} />
                </span>
                <span className="abroad-promo-text">Certified Company</span>
              </li>
            </ul>

            <button
              type="button"
              className="button button--primary abroad-promo-btn"
              onClick={onContact}
              aria-label={`Contact Sri Vaari for MBBS in ${country.name}`}
            >
              <span>Contact Now</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Under-Card Cursive Watermark */}
          <div className="abroad-sidebar-watermark" aria-hidden="true">
            <span className="abroad-sidebar-script">Your Medical Dreams, Our Support.</span>
            <svg
              className="abroad-sidebar-swoosh"
              viewBox="0 0 200 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 14 C70 20, 150 17, 195 7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default AbroadCountryDetail
