import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import ProductPage from './pages/ProductPage.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Notifications } from '@mantine/notifications';
import SingleProductPage from './pages/SingleProductPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Router>
					<Notifications />
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						theme={{
							colorScheme: 'light',
						}}
					>
						<Switch>
							<Route path={'/products/product/:productId'}>
								<SingleProductPage />
							</Route>
							<Route path={'/checkout'}>
								<CheckoutPage />
							</Route>
							<Route path={'/products'}>
								<ProductPage />
							</Route>
							<Route path={'/'}>
								<App />
							</Route>
						</Switch>
					</MantineProvider>
				</Router>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</Provider>
	</React.StrictMode>
);
