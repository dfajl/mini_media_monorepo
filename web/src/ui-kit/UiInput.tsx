import { useId, type InputHTMLAttributes } from 'react';
import './UiInput.css';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
	label?: string;
	error?: string;
	onChange: (value: string) => void;
};

export default function UiInput({
	label,
	error,
	onChange,
	type = 'text',
	...props
}: Props) {
	const errorId = useId();
	return (
		<label className='ui-input'>
			{label && <span className='ui-input__label'>{label}</span>}
			<input
				{...props}
				className={`ui-input__field ${error ? 'ui-input__field--error' : ''}`}
				type={type}
				onChange={(event) => onChange(event.target.value)}
				aria-invalid={Boolean(error)}
				aria-describedby={error ? errorId : undefined}
			/>
			{error && (
				<span id={errorId} className='ui-input__error'>
					{error}
				</span>
			)}
		</label>
	);
}
