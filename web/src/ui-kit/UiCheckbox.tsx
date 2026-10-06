import './UiCheckbox.css'

export default function UiCheckbox({
  label = '',
  disabled = false,
  checked,
  onChange,
}: {
  label?: string
  disabled?: boolean
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label className={`ui-checkbox ${disabled ? 'ui-checkbox--disabled' : ''}`}>
      <input
        className="ui-checkbox__input"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        disabled={disabled}
      />
      <span className="ui-checkbox__box" />
      <span className="ui-checkbox__label">{label}</span>
    </label>
  )
}
