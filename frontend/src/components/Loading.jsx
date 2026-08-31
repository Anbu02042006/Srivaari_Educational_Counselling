function Loading({ label = 'Loading' }) {
  return <div className="status-state" role="status"><span className="loading-spinner" aria-hidden="true" /><p>{label}…</p></div>
}

export default Loading
