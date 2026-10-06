import { Navigate, Route, Routes } from 'react-router';
import LoginView from '@/features/auth/ui/LoginView';
import AccountView from '@/features/account/ui/AccountView';

export default function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/login' replace />} />
			<Route path='/login' element={<LoginView />} />
			<Route path='/account' element={<AccountView />} />
		</Routes>
	);
}
