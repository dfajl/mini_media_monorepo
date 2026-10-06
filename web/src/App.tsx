import { RouterProvider } from "react-router-dom";
import { ReduxProvider } from './Providers/ReduxProvider';
import { router } from './router/router';

export default function App() {
	return (
		<ReduxProvider>
			<RouterProvider router={router} />
		</ReduxProvider>
	);
}
