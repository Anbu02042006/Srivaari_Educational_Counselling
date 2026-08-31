function PrimaryButton({ children, className = '', type = 'button', ...props }) {
  return <button type={type} className={`button button--primary ${className}`.trim()} {...props}>{children}</button>
}

export default PrimaryButton
