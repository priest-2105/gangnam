import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Review Trust Lens', () => {
  it('shows the brand, review provenance, and distinct AI and verification labels', () => {
    render(<App />)

    expect(screen.getByAltText('Gangnam Beauty Guide')).toBeInTheDocument()
    expect(screen.getByText('Illustrative review')).toBeInTheDocument()
    expect(screen.getByText('AI extracted')).toBeInTheDocument()
    expect(screen.getByText('Procedure verified')).toBeInTheDocument()
    expect(screen.getByText('Surgeon not verified')).toBeInTheDocument()
    expect(screen.getByLabelText('4.6 out of 5')).toHaveTextContent('4.6 / 5')
    expect(screen.getByText('Original text stays visible')).toBeInTheDocument()
  })

  it('reveals and hides the original Korean review', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'View original' })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Original Korean')).not.toBeInTheDocument()

    fireEvent.click(toggle)
    expect(screen.getByText('Original Korean')).toBeInTheDocument()
    expect(document.querySelector('[lang="ko"]')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hide original' })).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Hide original' }))
    expect(screen.queryByText('Original Korean')).not.toBeInTheDocument()
  })

  it('opens and closes the responsive navigation', () => {
    render(<App />)
    const openButton = screen.getByRole('button', { name: 'Open navigation' })

    fireEvent.click(openButton)
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Close navigation' }))
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
  })
})
