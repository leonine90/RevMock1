import { render, screen } from '@testing-library/react'
import App from './App'

describe('App shell', () => {
  it('renders the desk heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /card delivery exceptions/i }),
    ).toBeInTheDocument()
  })
})
