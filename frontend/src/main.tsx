import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import ProductPage from './pages/ProductPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
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
	</React.StrictMode>
);
