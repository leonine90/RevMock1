import type { DeliveryException } from '../types'
import { ExceptionRow } from './ExceptionRow'

type ExceptionListProps = {
  exceptions: DeliveryException[]
}

export function ExceptionList({ exceptions }: ExceptionListProps) {
  return (
    <ul className="exception-list">
      {exceptions.map((exception) => (
        <li key={exception.id}>
          <ExceptionRow exception={exception} />
        </li>
      ))}
    </ul>
  )
}
