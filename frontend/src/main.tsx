import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import ProductPage from './pages/ProductPage.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Notifications } from '@mantine/notifications';
import SingleProductPage from './pages/SingleProductPage.tsx';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<HashRouter>
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
							<Route path={'/checkout-success/:sessionId'}>
								<CheckoutSuccessPage />
							</Route>
							<Route path={'/products'}>
								<ProductPage />
							</Route>
							<Route path={'/'}>
								<App />
							</Route>
						</Switch>
					</MantineProvider>
				</HashRouter>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</Provider>
	</React.StrictMode>
);
