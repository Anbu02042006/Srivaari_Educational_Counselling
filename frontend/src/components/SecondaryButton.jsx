function SecondaryButton({ children, className = '', type = 'button', ...props }) {
  return <button type={type} className={`button button--secondary ${className}`.trim()} {...props}>{children}</button>
}

export default SecondaryButton
