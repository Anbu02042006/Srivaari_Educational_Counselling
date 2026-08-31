import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/**
 * CustomSelect Component
 * Modern, beautifully styled custom dropdown replacing raw browser OS select popups.
 * Fully responsive, touch-friendly, accessible with keyboard navigation and outside click detection.
 */
function CustomSelect({
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  hasError = false,
  ariaLabel,
  ariaDescribedby,
  disabled = false,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Normalize options array
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt }
    }
    return opt
  })

  const selectedOption = normalizedOptions.find((opt) => String(opt.value) === String(value))

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  // Handle keyboard accessibility
  function handleKeyDown(event) {
    if (disabled) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen((prev) => !prev)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else {
        const currentIndex = normalizedOptions.findIndex((opt) => String(opt.value) === String(value))
        const nextIndex = Math.min(currentIndex + 1, normalizedOptions.length - 1)
        if (normalizedOptions[nextIndex]) {
          handleSelect(normalizedOptions[nextIndex].value)
        }
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else {
        const currentIndex = normalizedOptions.findIndex((opt) => String(opt.value) === String(value))
        const prevIndex = Math.max(currentIndex - 1, 0)
        if (normalizedOptions[prevIndex]) {
          handleSelect(normalizedOptions[prevIndex].value)
        }
      }
    }
  }

  function handleSelect(optValue) {
    if (onChange) {
      onChange({
        target: {
          name,
          value: optValue,
        },
      })
    }
    setIsOpen(false)
  }

  return (
    <div
      ref={dropdownRef}
      className={`custom-select-wrapper ${className} ${isOpen ? 'custom-select-wrapper--open' : ''}`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`custom-select-trigger ${hasError ? 'custom-select-trigger--error' : ''} ${
          !selectedOption || selectedOption.value === '' ? 'custom-select-trigger--placeholder' : ''
        }`}
      >
        <span className="custom-select-trigger__text">
          {selectedOption && selectedOption.value !== '' ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`custom-select-trigger__icon ${isOpen ? 'custom-select-trigger__icon--rotated' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Floating Options Menu */}
      {isOpen && (
        <ul className="custom-select-menu" role="listbox" tabIndex={-1}>
          {/* Placeholder / Reset item if placeholder is provided */}
          {placeholder && (
            <li
              role="option"
              aria-selected={!value || value === ''}
              className={`custom-select-option custom-select-option--placeholder ${
                !value || value === '' ? 'custom-select-option--selected' : ''
              }`}
              onClick={() => handleSelect('')}
            >
              <span>{placeholder}</span>
              {(!value || value === '') && <Check size={15} className="custom-select-option__check" />}
            </li>
          )}

          {normalizedOptions.map((opt) => {
            const isSelected = String(opt.value) === String(value)
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`custom-select-option ${isSelected ? 'custom-select-option--selected' : ''}`}
                onClick={() => handleSelect(opt.value)}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={15} className="custom-select-option__check" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default CustomSelect
