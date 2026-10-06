import './UiSegmentedControl.css'

type Props<T extends string> = {
  options: readonly { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  disabled?: boolean
}

export default function UiSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  disabled = false,
}: Props<T>) {
  return (
    <div
      className={`ui-segmented ${disabled ? 'ui-segmented--disabled' : ''}`}
      role="group"
      aria-label="Authentication mode"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`ui-segmented__tab ${value === option.value ? 'ui-segmented__tab--active' : ''}`}
          disabled={disabled}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
