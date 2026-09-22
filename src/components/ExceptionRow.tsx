import type { DeliveryException, ExceptionType } from '../types'

const TYPE_LABELS: Record<ExceptionType, string> = {
  address_invalid: 'Address invalid',
  recipient_unavailable: 'Recipient unavailable',
  courier_failed: 'Courier failed',
  customs_hold: 'Customs hold',
}

type ExceptionRowProps = {
  exception: DeliveryException
}

export function ExceptionRow({ exception }: ExceptionRowProps) {
  return (
    <article className="exception-row" aria-label={`Exception ${exception.id}`}>
      <div className="exception-row__main">
        <h2 className="exception-row__title">{exception.customerName}</h2>
        <p className="exception-row__meta">
          Card ••{exception.cardLastFour} · {exception.city}
        </p>
      </div>
      <div className="exception-row__side">
        <span className="badge">{TYPE_LABELS[exception.type]}</span>
        <p className="exception-row__attempts">
          {exception.attemptCount} attempt
          {exception.attemptCount === 1 ? '' : 's'}
        </p>
        <time dateTime={exception.createdAt}>
          {new Date(exception.createdAt).toLocaleString()}
        </time>
      </div>
    </article>
  )
}
