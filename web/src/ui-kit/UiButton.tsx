import type { ButtonHTMLAttributes } from 'react'
import UiLoader from './UiLoader'
import './UiButton.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  loading?: boolean
  fullWidth?: boolean
}

export default function UiButton({
  variant = 'primary',
  type = 'button',
  disabled,
  loading = false,
  fullWidth = false,
  className = '',
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`ui-button ui-button--${variant} ${fullWidth ? 'ui-button--full' : ''} ${className}`}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading && <UiLoader size="sm" className="ui-button__loader" label="Loading button state" />}
      <span>{children}</span>
    </button>
  )
}
