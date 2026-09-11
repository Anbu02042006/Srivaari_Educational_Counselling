function SecondaryButton({ children, className = '', type = 'button', ...props }) {
  return (
    <button type={type} className={`button button--secondary ${className}`.trim()} {...props}>
      <span className="blob-btn__text">{children}</span>
      <span className="blob-btn__inner" aria-hidden="true">
        <span className="blob-btn__blobs">
          <span className="blob-btn__blob"></span>
          <span className="blob-btn__blob"></span>
          <span className="blob-btn__blob"></span>
          <span className="blob-btn__blob"></span>
        </span>
      </span>
    </button>
  )
}

export default SecondaryButton
