import {
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import EmptyState from '../components/EmptyState'
import SectionHeading from '../components/SectionHeading'
import { courseCategories, courses } from '../data/coursesData'

function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [mode, setMode] = useState('All')
  const [duration, setDuration] = useState('All')
  const [sort, setSort] = useState('recommended')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Sync category from searchParams if changed externally
  useEffect(() => {
    const paramCat = searchParams.get('category')
    if (paramCat) {
      setCategory(paramCat)
    }
  }, [searchParams])

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

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        const matchSearch = `${course.title} ${course.category} ${course.description}`
          .toLowerCase()
          .includes(search.toLowerCase().trim())
        const matchCategory = category === 'All' || course.category === category
        const matchMode = mode === 'All' || course.mode === mode
        const matchDuration =
          duration === 'All' ||
          (duration === 'Short'
            ? course.durationValue <= 6
            : duration === 'Medium'
            ? course.durationValue > 6 && course.durationValue <= 18
            : course.durationValue > 18)

        return matchSearch && matchCategory && matchMode && matchDuration
      })
      .sort((a, b) => {
        if (sort === 'duration-low') return a.durationValue - b.durationValue
        if (sort === 'fee-low') return a.feeValue - b.feeValue
        if (sort === 'name') return a.title.localeCompare(b.title)
        return 0
      })
  }, [search, category, mode, duration, sort])

  function chooseCategory(next) {
    setCategory(next)
    setSearchParams(next === 'All' ? {} : { category: next })
  }

  function clearFilters() {
    setSearch('')
    chooseCategory('All')
    setMode('All')
    setDuration('All')
    setSort('recommended')
    setIsMobileFilterOpen(false)
  }

  // Count active non-default filters
  const activeFilterCount = [
    search.trim() !== '',
    category !== 'All',
    mode !== 'All',
    duration !== 'All',
  ].filter(Boolean).length

  return (
    <main className="courses-page">
      {/* 1. HERO HEADER */}
      <header className="page-hero">
        <div className="container">
          <span className="eyebrow page-hero__eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            Explore Programs
          </span>
          <h1 className="page-hero__title">Find a Course That Moves You Forward.</h1>
          <p className="page-hero__lead">
            Search verified academic pathways, compare study modes, durations, and starting fees, and discover your next step with confidence.
          </p>
        </div>
      </header>

      {/* 2. CATALOG & FILTER TOOLBAR */}
      <section className="course-results">
        <div className="container">
          {/* Main Toolbar */}
          <div className="catalog-toolbar">
            {/* Search input */}
            <div className="search-field catalog-toolbar__search">
              <Search size={20} aria-hidden="true" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search courses, degrees, or topics…"
                aria-label="Search courses"
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

            {/* Mobile Filter Toggle Button */}
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

            {/* Desktop Structured Selects */}
            <div className="catalog-toolbar__desktop-filters">
              <label className="toolbar-select">
                <span className="toolbar-select__label">Study Mode</span>
                <select
                  value={mode}
                  onChange={(event) => setMode(event.target.value)}
                  aria-label="Filter by study mode"
                >
                  <option value="All">All Modes</option>
                  <option value="On campus">On campus</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </label>

              <label className="toolbar-select">
                <span className="toolbar-select__label">Duration</span>
                <select
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  aria-label="Filter by duration"
                >
                  <option value="All">All Durations</option>
                  <option value="Short">Up to 6 months</option>
                  <option value="Medium">6–18 months</option>
                  <option value="Long">Over 18 months</option>
                </select>
              </label>

              <label className="toolbar-select">
                <span className="toolbar-select__label">Sort By</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  aria-label="Sort courses"
                >
                  <option value="recommended">Recommended</option>
                  <option value="name">Name (A–Z)</option>
                  <option value="duration-low">Shortest duration</option>
                  <option value="fee-low">Lowest starting fee</option>
                </select>
              </label>
            </div>
          </div>

          {/* Category Horizontal Pill Scroller */}
          <div className="category-filter" role="tablist" aria-label="Course category filters">
            <button
              className={`category-filter__pill ${category === 'All' ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={category === 'All'}
              onClick={() => chooseCategory('All')}
            >
              All Programs
            </button>
            {courseCategories.map((item) => (
              <button
                key={item}
                className={`category-filter__pill ${category === item ? 'is-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={category === item}
                onClick={() => chooseCategory(item)}
              >
                {item}
              </button>
            ))}
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
                {category !== 'All' && (
                  <span className="filter-chip">
                    <span>Category: {category}</span>
                    <button type="button" onClick={() => chooseCategory('All')} aria-label="Remove category filter">
                      <X size={14} aria-hidden="true" />
                    </button>
                  </span>
                )}
                {mode !== 'All' && (
                  <span className="filter-chip">
                    <span>Mode: {mode}</span>
                    <button type="button" onClick={() => setMode('All')} aria-label="Remove mode filter">
                      <X size={14} aria-hidden="true" />
                    </button>
                  </span>
                )}
                {duration !== 'All' && (
                  <span className="filter-chip">
                    <span>Duration: {duration === 'Short' ? '≤ 6 mos' : duration === 'Medium' ? '6–18 mos' : '> 18 mos'}</span>
                    <button type="button" onClick={() => setDuration('All')} aria-label="Remove duration filter">
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

          {/* Results Heading */}
          <div className="catalog-results-header">
            <SectionHeading
              eyebrow="Available Courses"
              title={`${filteredCourses.length} program${filteredCourses.length === 1 ? '' : 's'} found`}
              description="Showing verified programs matching your criteria."
            />
          </div>

          {/* Course Grid / Empty State */}
          {filteredCourses.length > 0 ? (
            <div className="course-grid course-grid--catalog">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  to={`/courses/${course.id}`}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No courses match those filters"
              description="Try adjusting your keywords or clearing selected filters to see all available programs."
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
            aria-labelledby="course-filter-sheet-title"
          >
            <div className="filter-sheet__header">
              <div className="filter-sheet__title-row">
                <SlidersHorizontal size={20} aria-hidden="true" />
                <h2 id="course-filter-sheet-title">Filter Courses</h2>
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
              {/* Category */}
              <div className="filter-sheet__group">
                <label htmlFor="mobile-filter-category" className="form-label">Category</label>
                <select
                  id="mobile-filter-category"
                  className="form-select"
                  value={category}
                  onChange={(e) => chooseCategory(e.target.value)}
                >
                  <option value="All">All Programs</option>
                  {courseCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Study Mode */}
              <div className="filter-sheet__group">
                <label htmlFor="mobile-filter-mode" className="form-label">Study Mode</label>
                <select
                  id="mobile-filter-mode"
                  className="form-select"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="All">All Modes</option>
                  <option value="On campus">On campus</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              {/* Duration */}
              <div className="filter-sheet__group">
                <label htmlFor="mobile-filter-duration" className="form-label">Duration</label>
                <select
                  id="mobile-filter-duration"
                  className="form-select"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="All">All Durations</option>
                  <option value="Short">Up to 6 months</option>
                  <option value="Medium">6–18 months</option>
                  <option value="Long">Over 18 months</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="filter-sheet__group">
                <label htmlFor="mobile-filter-sort" className="form-label">Sort By</label>
                <select
                  id="mobile-filter-sort"
                  className="form-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="name">Name (A–Z)</option>
                  <option value="duration-low">Shortest duration</option>
                  <option value="fee-low">Lowest starting fee</option>
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
                Show {filteredCourses.length} Programs
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default CoursesPage
