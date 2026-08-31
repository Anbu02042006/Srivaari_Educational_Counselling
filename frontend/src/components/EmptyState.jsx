import { SearchX } from 'lucide-react'
import { Link } from 'react-router-dom'
import SecondaryButton from './SecondaryButton'

function EmptyState({ title = 'Nothing to show yet', description = 'Try changing your filters or return later.', actionLabel, actionTo, onAction }) {
  return <section className="status-state"><SearchX size={32} /><h2>{title}</h2><p>{description}</p>{actionTo ? <Link className="button button--secondary" to={actionTo}>{actionLabel}</Link> : actionLabel && <SecondaryButton onClick={onAction}>{actionLabel}</SecondaryButton>}</section>
}

export default EmptyState
