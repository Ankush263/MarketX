import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './redux/store.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import AuthPage from './pages/auth/AuthPage.tsx';
import { Provider } from 'react-redux';

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
							components: {
								TextInput: {
									styles: {
										input: {
											backgroundColor: 'rgb(27, 38, 53)',
											color: 'white',
										},
										label: {
											color: 'white',
										},
									},
								},
								Textarea: {
									styles: {
										input: {
											backgroundColor: 'rgb(27, 38, 53)',
											color: 'white',
										},
										label: {
											color: 'white',
										},
									},
								},
								NumberInput: {
									styles: {
										input: {
											backgroundColor: 'rgb(27, 38, 53)',
											color: 'white',
										},
										label: {
											color: 'white',
										},
									},
								},
								Dropzone: {
									styles: {
										root: {
											backgroundColor: 'rgb(27, 38, 53)',
											color: 'white',
										},
										inner: {
											backgroundColor: 'rgb(27, 38, 53)',
											color: 'white',
										},
									},
								},
								MultiSelect: {
									styles: {
										input: {
											backgroundColor: 'rgb(27, 38, 53)',
											color: 'white',
										},
										dropdown: {
											backgroundColor: 'rgb(27, 38, 53)',
										},
										label: {
											color: 'white',
										},
									},
								},
								Accordion: {
									styles: {
										control: {
											'&:hover': {
												backgroundColor: 'rgba(225, 225, 225, 0.04)',
											},
										},
									},
								},
							},
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
