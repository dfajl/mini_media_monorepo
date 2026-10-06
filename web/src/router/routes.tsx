import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import LoginView from '@/features/auth/ui/LoginView';
import AccountView from '@/features/account/ui/AccountView';

export const routes: RouteObject[] = [
	{ path: '/', element: <Navigate to='/login' replace /> },
	{ path: '/login', element: <LoginView /> },
	{ path: '/account', element: <AccountView /> },
];
