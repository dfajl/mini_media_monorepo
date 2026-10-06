import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest';
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import App from '../App';
import { createAppStore } from '../stores';
import { selectIsAuthenticated } from '../stores/auth';

const user = {
	id: 'user-1',
	email: 'test@example.com',
	name: 'Ivan',
	surname: 'Ivanov',
	birthDate: '2000-01-01',
	createdAt: '2026-01-01T12:00:00Z',
	lastLoginAt: '2026-01-02T12:00:00Z',
};
const fetchMock = vi.fn();
function renderApp(path = '/') {
	const store = createAppStore();
	const result = render(
		<MemoryRouter initialEntries={[path]}>
			<Provider store={store}>
				<Link to='/account'>Inspect account</Link>
				<App />
			</Provider>
		</MemoryRouter>,
	);
	return { ...result, store };
}
function submitButton(name = 'Sign in') {
	return screen.getAllByRole('button', { name }).at(-1)!;
}
function respond(payload: unknown, status = 200) {
	fetchMock.mockResolvedValueOnce(
		new Response(JSON.stringify(payload), {
			status,
			headers: { 'Content-Type': 'application/json' },
		}),
	);
}
async function enterCredentials() {
	const events = userEvent.setup();
	await events.type(screen.getByLabelText('Email'), user.email);
	await events.type(screen.getByLabelText('Password'), 'secret123');
	return events;
}
beforeEach(() => {
	vi.stubGlobal('fetch', fetchMock);
	fetchMock.mockReset();
});
afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
});

describe('App', () => {
	it('redirects the root route to login', () => {
		renderApp();
		expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeTruthy();
	});
	it('validates before sending requests', async () => {
		renderApp('/login');
		await userEvent.click(submitButton());
		expect(screen.getByText('Email is required')).toBeTruthy();
		expect(screen.getByText('Password is required')).toBeTruthy();
		expect(fetchMock).not.toHaveBeenCalled();
	});
	it('signs in, displays the profile, and clears it on logout', async () => {
		respond({ accessToken: 'token', tokenType: 'Bearer', user });
		const { store } = renderApp('/login');
		const events = await enterCredentials();
		await events.click(submitButton());
		await screen.findByRole('heading', { name: 'Account' });
		expect(screen.getByText(user.email)).toBeTruthy();
		expect(store.getState().auth.accessToken).toBe('token');
		expect(selectIsAuthenticated(store.getState())).toBe(true);
		expect(fetchMock.mock.calls[0]?.[0]).toMatch(/\/auth\/login$/);
		expect(JSON.parse(fetchMock.mock.calls[0]?.[1].body)).toEqual({
			email: user.email,
			password: 'secret123',
		});
		await events.click(screen.getByRole('button', { name: 'Log out' }));
		expect(store.getState().auth).toEqual({ accessToken: null, tokenType: null, user: null });
		expect(selectIsAuthenticated(store.getState())).toBe(false);
		expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeTruthy();
		await events.click(screen.getByRole('link', { name: 'Inspect account' }));
		expect(screen.getByText('No user data yet')).toBeTruthy();
	});
	it('registers and displays the returned user', async () => {
		respond({ user });
		const { store } = renderApp('/login');
		const events = userEvent.setup();
		await events.click(screen.getByRole('button', { name: 'Sign up', pressed: false }));
		await events.type(screen.getByLabelText('Full name'), 'Ivanov Ivan');
		fireEvent.change(screen.getByLabelText('Date of birth'), { target: { value: '2000-01-01' } });
		await events.type(screen.getByLabelText('Login (email)'), user.email);
		await events.type(screen.getByLabelText('Create password'), 'secret123');
		await events.click(submitButton('Sign up'));
		await screen.findByRole('heading', { name: 'Account' });
		expect(screen.getByText(user.email)).toBeTruthy();
		expect(store.getState().auth.user).toEqual(user);
		expect(selectIsAuthenticated(store.getState())).toBe(false);
		expect(fetchMock.mock.calls[0]?.[0]).toMatch(/\/auth\/sign-up$/);
		expect(JSON.parse(fetchMock.mock.calls[0]?.[1].body)).toEqual({
			fullName: 'Ivanov Ivan',
			birthDate: '2000-01-01',
			email: user.email,
			password: 'secret123',
		});
	});
	it('displays backend errors and allows retrying', async () => {
		respond({ message: 'Invalid credentials' }, 401);
		renderApp('/login');
		const events = await enterCredentials();
		await events.click(submitButton());
		expect((await screen.findByRole('alert')).textContent).toBe('Invalid credentials');
		await waitFor(() => expect(submitButton().hasAttribute('disabled')).toBe(false));
		expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeTruthy();
	});
	it('shows the empty profile without a session', () => {
		renderApp('/account');
		expect(screen.getByText('No user data yet')).toBeTruthy();
	});
});
