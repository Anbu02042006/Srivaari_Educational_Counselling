import {
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import CollegeCard from '../components/CollegeCard'
import EmptyState from '../components/EmptyState'
import SectionHeading from '../components/SectionHeading'
import { collegeFilterOptions, colleges } from '../data/collegesData'

const initialFilters = {
  city: 'All',
  state: 'All',
  category: 'All',
  type: 'All',
  accreditation: 'All',
  sort: 'recommended',
}

function CollegesPage() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(initialFilters)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Body scroll lock and Escape key listener for mobile filter sheet
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileFilterOpen) {
        setIsMobileFilterOpen(false)
      }
    }

    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileFilterOpen])

  const results = useMemo(() => {
    return colleges
      .filter((college) => {
        const matchesSearch = `${college.name} ${college.city} ${college.state} ${college.type} ${college.description} ${college.popularCourses.join(' ')}`
          .toLowerCase()
          .includes(search.toLowerCase().trim())

        const matchCity = filters.city === 'All' || college.city === filters.city
        const matchState = filters.state === 'All' || college.state === filters.state
        const matchCategory = filters.category === 'All' || college.categories.includes(filters.category)
        const matchType = filters.type === 'All' || college.type === filters.type
        const matchAccreditation = filters.accreditation === 'All' || college.accreditation === filters.accreditation

        return matchesSearch && matchCity && matchState && matchCategory && matchType && matchAccreditation
      })
      .sort((a, b) => {
        if (filters.sort === 'name') return a.name.localeCompare(b.name)
        if (filters.sort === 'city') return a.city.localeCompare(b.city)
        return 0
      })
  }, [search, filters])

  const setFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const clearFilters = () => {
    setSearch('')
    setFilters(initialFilters)
    setIsMobileFilterOpen(false)
  }

  // Count active non-default filters
  const activeFilterCount = [
    search.trim() !== '',
    filters.city !== 'All',
    filters.state !== 'All',
    filters.category !== 'All',
    filters.type !== 'All',
    filters.accreditation !== 'All',
  ].filter(Boolean).length

  return (
    <main className="colleges-page">
      {/* 1. HERO HEADER */}
      <header className="page-hero">
        <div className="container">
          <span className="eyebrow page-hero__eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            Find Your Campus
          </span>
          <h1 className="page-hero__title">Find a College Where You Can Thrive.</h1>
          <p className="page-hero__lead">
            Compare campus environments, state locations, accreditations, and program specializations to make an informed higher education decision.
          </p>
        </div>
      </header>

      {/* 2. CATALOG & FILTERS */}
      <section className="college-results">
        <div className="container">
          {/* Main Toolbar */}
          <div className="catalog-toolbar">
            {/* Search Input */}
            <div className="search-field catalog-toolbar__search">
              <Search size={20} aria-hidden="true" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search colleges, cities, or courses…"
                aria-label="Search colleges"
              />
              {search && (
                <button
                  type="button"
                  className="search-field__clear"
                  onClick={() => setSearch('')}
                  aria-label="Clear search text"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Mobile Filter Trigger Button */}
            <button
              type="button"
              className="button button--secondary catalog-toolbar__mobile-trigger"
              onClick={() => setIsMobileFilterOpen(true)}
              aria-expanded={isMobileFilterOpen}
              aria-label="Open filter options"
            >
              <SlidersHorizontal size={18} aria-hidden="true" />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>

            {/* Desktop Structured Filters Grid */}
            <div className="catalog-toolbar__desktop-filters catalog-toolbar__desktop-filters--colleges">
              <label className="toolbar-select">
                <span className="toolbar-select__label">City</span>
                <select
                  value={filters.city}
                  onChange={(e) => setFilter('city', e.target.value)}
                  aria-label="Filter by city"
                >
                  <option value="All">All Cities</option>
                  {collegeFilterOptions.cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </label>

              <label className="toolbar-select">
                <span className="toolbar-select__label">State</span>
                <select
                  value={filters.state}
                  onChange={(e) => setFilter('state', e.target.value)}
                  aria-label="Filter by state"
                >
                  <option value="All">All States</option>
                  {collegeFilterOptions.states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </label>

              <label className="toolbar-select">
                <span className="toolbar-select__label">Category</span>
                <select
                  value={filters.category}
                  onChange={(e) => setFilter('category', e.target.value)}
                  aria-label="Filter by category"
                >
                  <option value="All">All Categories</option>
                  {collegeFilterOptions.categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </label>

              <label className="toolbar-select">
                <span className="toolbar-select__label">Type</span>
                <select
                  value={filters.type}
                  onChange={(e) => setFilter('type', e.target.value)}
                  aria-label="Filter by type"
                >
                  <option value="All">All Types</option>
                  {collegeFilterOptions.types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>

              <label className="toolbar-select">
                <span className="toolbar-select__label">Accreditation</span>
                <select
                  value={filters.accreditation}
                  onChange={(e) => setFilter('accreditation', e.target.value)}
                  aria-label="Filter by accreditation"
                >
                  <option value="All">All Accreditations</option>
                  {collegeFilterOptions.accreditations.map((acc) => (
                    <option key={acc} value={acc}>{acc}</option>
                  ))}
                </select>
              </label>

              <label className="toolbar-select">
                <span className="toolbar-select__label">Sort By</span>
                <select
                  value={filters.sort}
                  onChange={(e) => setFilter('sort', e.target.value)}
                  aria-label="Sort colleges"
                >
                  <option value="recommended">Recommended</option>
                  <option value="name">Name (A–Z)</option>
                  <option value="city">City (A–Z)</option>
                </select>
              </label>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="active-chips-bar" aria-label="Active filters">
              <span className="active-chips-bar__title">Active filters:</span>
              <div className="active-chips-bar__list">
                {search.trim() && (
                  <span className="filter-chip">
                    <span>Search: "{search}"</span>
                    <button type="button" onClick={() => setSearch('')} aria-label="Remove search filter">
                      <X size={14} aria-hidden="true" />
                    </button>
                  </span>
                )}
                {filters.city !== 'All' && (
                  <span className="filter-chip">
                    <span>City: {filters.city}</span>
                    <button type="button" onClick={() => setFilter('city', 'All')} aria-label="Remove city filter">
                      <X size={14} aria-hidden="true" />
                    </button>
                  </span>
                )}
                {filters.state !== 'All' && (
                  <span className="filter-chip">
                    <span>State: {filters.state}</span>
                    <button type="button" onClick={() => setFilter('state', 'All')} aria-label="Remove state filter">
                      <X size={14} aria-hidden="true" />
                    </button>
                  </span>
                )}
                {filters.category !== 'All' && (
                  <span className="filter-chip">
                    <span>Category: {filters.category}</span>
                    <button type="button" onClick={() => setFilter('category', 'All')} aria-label="Remove category filter">
                      <X size={14} aria-hidden="true" />
                    </button>
                  </span>
                )}
                {filters.type !== 'All' && (
                  <span className="filter-chip">
                    <span>Type: {filters.type}</span>
                    <button type="button" onClick={() => setFilter('type', 'All')} aria-label="Remove type filter">
                      <X size={14} aria-hidden="true" />
                    </button>
                  </span>
                )}
                {filters.accreditation !== 'All' && (
                  <span className="filter-chip">
                    <span>Accreditation: {filters.accreditation}</span>
                    <button type="button" onClick={() => setFilter('accreditation', 'All')} aria-label="Remove accreditation filter">
                      <X size={14} aria-hidden="true" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  className="active-chips-bar__reset"
                  onClick={clearFilters}
                >
                  <RotateCcw size={14} aria-hidden="true" />
                  <span>Reset all</span>
                </button>
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="catalog-results-header">
            <SectionHeading
              eyebrow="Available Campuses"
              title={`${results.length} institution${results.length === 1 ? '' : 's'} to consider`}
              description="Explore options matching your preferred location and academic focus."
            />
          </div>

          {/* Colleges Grid / Empty State */}
          {results.length > 0 ? (
            <div className="college-results-grid">
              {results.map((college) => (
                <CollegeCard
                  key={college.id}
                  {...college}
                  to={`/colleges/${college.id}`}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No institutions match those filters"
              description="Try adjusting your filter options or clearing selections to see all available colleges."
              actionLabel="Clear all filters"
              onAction={clearFilters}
            />
          )}
        </div>
      </section>

      {/* 3. MOBILE FILTER BOTTOM SHEET */}
      {isMobileFilterOpen && (
        <div className="filter-sheet" role="presentation">
          <div
            className="filter-sheet__backdrop"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />
          <section
            className="filter-sheet__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="college-filter-sheet-title"
          >
            <div className="filter-sheet__header">
              <div className="filter-sheet__title-row">
                <SlidersHorizontal size={20} aria-hidden="true" />
                <h2 id="college-filter-sheet-title">Filter Institutions</h2>
              </div>
              <button
                type="button"
                className="filter-sheet__close"
                onClick={() => setIsMobileFilterOpen(false)}
                aria-label="Close filter sheet"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="filter-sheet__body">
              {/* City */}
              <div className="filter-sheet__group">
                <label htmlFor="mobile-college-city" className="form-label">City</label>
                <select
                  id="mobile-college-city"
                  className="form-select"
                  value={filters.city}
                  onChange={(e) => setFilter('city', e.target.value)}
                >
                  <option value="All">All Cities</option>
                  {collegeFilterOptions.cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div className="filter-sheet__group">
                <label htmlFor="mobile-college-state" className="form-label">State</label>
                <select
                  id="mobile-college-state"
                  className="form-select"
                  value={filters.state}
                  onChange={(e) => setFilter('state', e.target.value)}
                >
                  <option value="All">All States</option>
                  {collegeFilterOptions.states.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Course Category */}
              <div className="filter-sheet__group">
                <label htmlFor="mobile-college-category" className="form-label">Course Category</label>
                <select
                  id="mobile-college-category"
                  className="form-select"
                  value={filters.category}
                  onChange={(e) => setFilter('category', e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {collegeFilterOptions.categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div className="filter-sheet__group">
                <label htmlFor="mobile-college-type" className="form-label">Institution Type</label>
                <select
                  id="mobile-college-type"
                  className="form-select"
                  value={filters.type}
                  onChange={(e) => setFilter('type', e.target.value)}
                >
                  <option value="All">All Types</option>
                  {collegeFilterOptions.types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Accreditation */}
              <div className="filter-sheet__group">
                <label htmlFor="mobile-college-accreditation" className="form-label">Accreditation</label>
                <select
                  id="mobile-college-accreditation"
                  className="form-select"
                  value={filters.accreditation}
                  onChange={(e) => setFilter('accreditation', e.target.value)}
                >
                  <option value="All">All Accreditations</option>
                  {collegeFilterOptions.accreditations.map((acc) => (
                    <option key={acc} value={acc}>{acc}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="filter-sheet__group">
                <label htmlFor="mobile-college-sort" className="form-label">Sort By</label>
                <select
                  id="mobile-college-sort"
                  className="form-select"
                  value={filters.sort}
                  onChange={(e) => setFilter('sort', e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="name">Name (A–Z)</option>
                  <option value="city">City (A–Z)</option>
                </select>
              </div>
            </div>

            <div className="filter-sheet__footer">
              <button
                type="button"
                className="button button--secondary filter-sheet__reset-btn"
                onClick={clearFilters}
              >
                Reset
              </button>
              <button
                type="button"
                className="button button--primary filter-sheet__apply-btn"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Show {results.length} Institutions
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default CollegesPage
