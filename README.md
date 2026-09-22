# Card Delivery Exception Desk

Ops tool for reviewing failed physical card deliveries. Couriers post
exceptions when a card cannot be delivered; this desk helps agents triage
open cases.

Later requirements will be revealed incrementally during the mock. Start with
Task 1 only.

## Task 1 — Load and show open exceptions

Wire the existing UI to the local async API and render open delivery
exceptions.

### Acceptance criteria

1. On load, call `fetchDeliveryExceptions()` from
   `src/api/deliveryExceptions.ts`.
2. While the request is in flight, show a clear loading state.
3. If the request fails, show an error message (you can reproduce failure with
   `fetchDeliveryExceptions({ scenario: 'error' })` while developing).
4. If the request succeeds with no items, show an empty state (reproduce with
   `scenario: 'empty'`).
5. If the request succeeds with items, render them using the provided
   `ExceptionList` / `ExceptionRow` components.
6. Each row should remain readable: customer name, card last four, city,
   exception type, attempt count, and created time.

### API contract

```ts
fetchDeliveryExceptions(options?: {
  scenario?: 'default' | 'empty' | 'error'
}): Promise<DeliveryException[]>
```

- Returns a `Promise` after a short delay.
- Default scenario returns open exceptions only.
- Throws an `ApiError` (`{ message, code }`) for the error scenario.
- No network access or API keys required.

Types live in `src/types.ts`. Presentational components live in
`src/components/`.

## Run

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

A smoke test is included to confirm the testing harness works. You do not need
to expand tests for Task 1 unless a later task asks for them.
