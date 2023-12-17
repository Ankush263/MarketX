import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
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
						<Route path={'/auth/Login'}>
							<LoginPage />
						</Route>
						<Route path={'/'}>
							<App />
						</Route>
					</Switch>
				</MantineProvider>
			</Router>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>
);
