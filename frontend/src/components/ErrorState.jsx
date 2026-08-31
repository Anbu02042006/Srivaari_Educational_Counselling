import { CircleAlert } from 'lucide-react'
import PrimaryButton from './PrimaryButton'

function ErrorState({ title = 'Something went wrong', description = 'Please try again in a moment.', actionLabel = 'Try again', onRetry }) {
  return <section className="status-state status-state--error" role="alert"><CircleAlert size={32} /><h2>{title}</h2><p>{description}</p>{onRetry && <PrimaryButton onClick={onRetry}>{actionLabel}</PrimaryButton>}</section>
}

export default ErrorState
