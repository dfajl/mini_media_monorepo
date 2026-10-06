import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type AuthUser = {
	id: string;
	email: string;
	name: string | null;
	surname: string | null;
	birthDate: string | null;
	createdAt: string;
	lastLoginAt: string;
};

type AuthPayload = { accessToken?: string; tokenType?: 'Bearer'; user: AuthUser };
type AuthState = {
	accessToken: string | null;
	tokenType: 'Bearer' | null;
	user: AuthUser | null;
};

const initialState: AuthState = { accessToken: null, tokenType: null, user: null };

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth(_state, { payload }: PayloadAction<AuthPayload>): AuthState {
			return {
				accessToken: payload.accessToken ?? null,
				tokenType: payload.tokenType ?? null,
				user: payload.user,
			};
		},
		logout: () => initialState,
	},
	selectors: {
		selectUser: (state) => state.user,
		selectIsAuthenticated: (state) => Boolean(state.accessToken && state.tokenType),
	},
});

export const { setAuth, logout } = authSlice.actions;
export const { selectUser, selectIsAuthenticated } = authSlice.selectors;
export default authSlice.reducer;
