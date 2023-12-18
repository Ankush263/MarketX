import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './redux/store.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage.tsx';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Router>
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						theme={{
							colorScheme: 'light',
						}}
					>
						<Switch>
							<Route path={'/auth'}>
								<AuthPage />
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
