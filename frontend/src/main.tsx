import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import ProductPage from './pages/ProductPage.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						colorScheme: 'light',
					}}
				>
					<Switch>
						<Route path={'/products'}>
							<ProductPage />
						</Route>
						<Route path={'/'}>
							<App />
						</Route>
					</Switch>
				</MantineProvider>
			</Router>
		</Provider>
	</React.StrictMode>
);
