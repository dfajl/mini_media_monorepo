import {
	UiButton,
	UiCheckbox,
	UiInput,
	UiLoader,
	UiSegmentedControl,
} from '@/ui-kit';
import { useLogin } from '../hooks/useLogin';
import './LoginView.css';

const authModeOptions = [
	{ value: 'signIn', label: 'Sign in' },
	{ value: 'signUp', label: 'Sign up' },
] as const;

export default function LoginView() {
	const {
		mode,
		setMode,
		form,
		updateField,
		errors,
		loading,
		errorMessage,
		submit,
	} = useLogin();

	const signingIn = mode === 'signIn';
	return (
		<main className='auth-page'>
			<section className='auth-card'>
				<p className='auth-caption'>Mini Media</p>
				<div className='auth-header'>
					<h1>{signingIn ? 'Welcome back' : 'Create account'}</h1>
					<UiSegmentedControl
						value={mode}
						onChange={setMode}
						options={authModeOptions}
						disabled={loading}
					/>
				</div>
				<p className='auth-subtitle'>
					{signingIn
						? 'Sign in to continue to your dashboard.'
						: 'Create a new account to get started.'}
				</p>
				<form
					className='auth-form'
					noValidate
					onSubmit={(event) => {
						event.preventDefault();
						void submit();
					}}
				>
					<div
						className={`auth-signup-transition ${signingIn ? '' : 'auth-signup-transition--open'}`}
						aria-hidden={signingIn}
					>
						<div className='auth-signup-extra'>
							<UiInput
								value={form.fullName}
								onChange={(value) => updateField('fullName', value)}
								label='Full name'
								placeholder='Иванов Иван Иванович'
								autoComplete='name'
								error={errors.fullName}
								disabled={signingIn || loading}
							/>
							<div className='auth-field'>
								<label className='auth-field__label' htmlFor='birthDate'>
									Date of birth
								</label>
								<input
									id='birthDate'
									value={form.birthDate}
									onChange={(event) => updateField('birthDate', event.target.value)}
									className='auth-field__input'
									type='date'
									autoComplete='bday'
									disabled={signingIn || loading}
									aria-invalid={Boolean(errors.birthDate)}
									aria-describedby={errors.birthDate ? 'birthDate-error' : undefined}
								/>
								{errors.birthDate && (
									<span id='birthDate-error' className='auth-field__error'>
										{errors.birthDate}
									</span>
								)}
							</div>
						</div>
					</div>
					<UiInput
						value={form.email}
						onChange={(value) => updateField('email', value)}
						label={signingIn ? 'Email' : 'Login (email)'}
						placeholder='you@example.com'
						autoComplete='email'
						error={errors.email}
						disabled={loading}
					/>
					<UiInput
						value={form.password}
						onChange={(value) => updateField('password', value)}
						label={signingIn ? 'Password' : 'Create password'}
						type='password'
						placeholder={signingIn ? 'Enter your password' : 'Choose a password'}
						autoComplete={signingIn ? 'current-password' : 'new-password'}
						error={errors.password}
						disabled={loading}
					/>
					{signingIn && (
						<UiCheckbox
							checked={form.rememberMe}
							onChange={(value) => updateField('rememberMe', value)}
							label='Remember me'
							disabled={loading}
						/>
					)}
					<UiButton type='submit' loading={loading} fullWidth>
						{loading
							? signingIn
								? 'Signing in...'
								: 'Creating account...'
							: signingIn
								? 'Sign in'
								: 'Sign up'}
					</UiButton>
					{loading && (
						<div className='loading-state'>
							<UiLoader size='sm' label='Authorizing user' />
							<span>Authorizing...</span>
						</div>
					)}
					{errorMessage && (
						<p className='error' role='alert'>
							{errorMessage}
						</p>
					)}
				</form>
			</section>
		</main>
	);
}
