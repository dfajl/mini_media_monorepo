import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './stores';
import './assets/main.css';

createRoot(document.getElementById('app')!).render(
	<StrictMode>
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</StrictMode>,
);
