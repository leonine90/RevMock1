import type {
  ApiError,
  DeliveryException,
  FetchScenario,
} from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const FIXTURES: DeliveryException[] = [
  {
    id: 'exc-1001',
    customerName: 'Amira Hassan',
    cardLastFour: '4412',
    type: 'address_invalid',
    city: 'Berlin',
    createdAt: '2026-09-20T09:14:00.000Z',
    attemptCount: 2,
    status: 'open',
  },
  {
    id: 'exc-1002',
    customerName: 'Jonas Berg',
    cardLastFour: '8821',
    type: 'recipient_unavailable',
    city: 'Stockholm',
    createdAt: '2026-09-21T11:02:00.000Z',
    attemptCount: 1,
    status: 'open',
  },
  {
    id: 'exc-1003',
    customerName: 'Sofia Rossi',
    cardLastFour: '1099',
    type: 'courier_failed',
    city: 'Milan',
    createdAt: '2026-09-19T16:40:00.000Z',
    attemptCount: 3,
    status: 'open',
  },
  {
    id: 'exc-1004',
    customerName: 'Chen Wei',
    cardLastFour: '7740',
    type: 'customs_hold',
    city: 'Dublin',
    createdAt: '2026-09-22T08:05:00.000Z',
    attemptCount: 1,
    status: 'open',
  },
  {
    id: 'exc-1005',
    customerName: 'Leila Okonkwo',
    cardLastFour: '3308',
    type: 'address_invalid',
    city: 'Lisbon',
    createdAt: '2026-09-18T13:22:00.000Z',
    attemptCount: 4,
    status: 'open',
  },
  {
    id: 'exc-resolve-fail',
    customerName: 'Test Failure Case',
    cardLastFour: '0000',
    type: 'courier_failed',
    city: 'London',
    createdAt: '2026-09-17T10:00:00.000Z',
    attemptCount: 2,
    status: 'open',
  },
]

let store: DeliveryException[] = structuredClone(FIXTURES)

/** Reset in-memory store (useful in tests). */
export function resetDeliveryExceptionsStore(): void {
  store = structuredClone(FIXTURES)
}

/**
 * Fetches open card-delivery exceptions.
 * Pass `scenario: 'empty' | 'error'` to reproduce those states intentionally.
 */
export async function fetchDeliveryExceptions(options?: {
  scenario?: FetchScenario
}): Promise<DeliveryException[]> {
  await delay(450)

  const scenario = options?.scenario ?? 'default'

  if (scenario === 'error') {
    const error: ApiError = {
      message: 'Failed to load delivery exceptions',
      code: 'NETWORK',
    }
    throw error
  }

  if (scenario === 'empty') {
    return []
  }

  return store.filter((item) => item.status === 'open')
}

/**
 * Marks an exception as resolved.
 * Deterministic failure: id `exc-resolve-fail` always rejects.
 */
export async function resolveDeliveryException(
  id: string,
): Promise<DeliveryException> {
  await delay(500)

  if (id === 'exc-resolve-fail') {
    const error: ApiError = {
      message: 'Could not resolve exception. Courier system rejected the update.',
      code: 'CONFLICT',
    }
    throw error
  }

  const index = store.findIndex((item) => item.id === id)
  if (index === -1) {
    const error: ApiError = {
      message: `Exception ${id} not found`,
      code: 'NOT_FOUND',
    }
    throw error
  }

  const updated: DeliveryException = {
    ...store[index],
    status: 'resolved',
  }
  store[index] = updated
  return updated
}
