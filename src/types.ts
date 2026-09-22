export type ExceptionType =
  | 'address_invalid'
  | 'recipient_unavailable'
  | 'courier_failed'
  | 'customs_hold'

export type ExceptionStatus = 'open' | 'resolved'

export type DeliveryException = {
  id: string
  customerName: string
  cardLastFour: string
  type: ExceptionType
  city: string
  createdAt: string
  attemptCount: number
  status: ExceptionStatus
}

export type FetchScenario = 'default' | 'empty' | 'error'

export type ApiError = {
  message: string
  code: 'NETWORK' | 'NOT_FOUND' | 'CONFLICT'
}
