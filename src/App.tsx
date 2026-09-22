import './App.css'
import type { DeliveryException } from './types'
import { ExceptionList } from './components/ExceptionList'

/**
 * Starter shell for the Card Delivery Exception Desk.
 * Task 1: load open exceptions from the API and render them with the
 * existing list components. Handle loading, error, and empty states.
 */
function App() {
  // Intentionally incomplete — wire up fetchDeliveryExceptions for Task 1.
  const exceptions: DeliveryException[] = []

  return (
    <main className="app">
      <header className="app__header">
        <h1>Card Delivery Exceptions</h1>
        <p>
          Ops desk for failed physical card deliveries. Review open exceptions
          and prepare them for follow-up.
        </p>
      </header>

      <section aria-label="Open exceptions">
        <p className="placeholder">
          No exceptions loaded yet. Connect <code>fetchDeliveryExceptions</code>{' '}
          and render results with <code>ExceptionList</code>.
        </p>

        {exceptions.length > 0 ? (
          <ExceptionList exceptions={exceptions} />
        ) : null}
      </section>
    </main>
  )
}

export default App
