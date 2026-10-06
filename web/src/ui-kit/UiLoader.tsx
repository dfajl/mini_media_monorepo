import './UiLoader.css'

export default function UiLoader({
	size = 'md',
	label = 'Loading',
	className = '',
}: {
	size?: 'sm' | 'md' | 'lg'
	label?: string
	className?: string
}) {
	return (
		<span
			className={`ui-loader ui-loader--${size} ${className}`}
			role='status'
			aria-label={label}
		/>
	)
}
