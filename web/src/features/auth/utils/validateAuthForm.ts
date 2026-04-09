import type { AuthMode, LoginForm, LoginFormErrors } from '../composables/useLogin';

export function validateAuthForm(mode: AuthMode, form: LoginForm): LoginFormErrors {
  const errors: LoginFormErrors = {};

  const email = form.email.trim();
  const password = form.password;

  if (mode === 'signUp') {
    if (!form.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!form.birthDate) {
      errors.birthDate = 'Date of birth is required';
    }
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Email is invalid';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}

