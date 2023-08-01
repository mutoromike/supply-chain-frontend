import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ReactQueryDevtools } from 'react-query/devtools';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import RegistrationPage from './components/Authentication/Register/registerPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginPage from './components/Authentication/Login/loginPage';
import CreateItem from './components/Items/CreateItem';
import ListItems from './components/Items/ListItems';
import { AuthProvider } from './services/AuthContext';
import Protected from './services/Protected';
import UpdateItem from './components/Items/UpdateItem';
import ItemPage from './components/Items/ItemPage';
import CreateEvent from './components/Event/CreateEvent';
import EventPage from './components/Event/EventPage';
import UpdateEvent from './components/Event/UpdateEvent';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/register', element: <RegistrationPage />, children: [] },
			{ path: '/login', element: <LoginPage /> },
			{
				path: '/items',
				element: (
					<Protected>
						<Outlet />
					</Protected>
				),
				children: [
					{ path: ':id', element: <ItemPage /> },
					{ path: ':id/edit', element: <UpdateItem /> },
					{ path: '', element: <ListItems /> },
					{ path: 'create', element: <CreateItem /> },
					// Handling Events
					{ path: ':itemid/events/create', element: <CreateEvent /> },
					{ path: ':itemid/events/:eventid', element: <EventPage /> },
					{ path: ':itemid/events/:eventid/edit', element: <UpdateEvent /> },
				],
			},
			{
				path: '/events',
				element: (
					<Protected>
						<Outlet />
					</Protected>
				),
				children: [],
			},
		],
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

export const queryClient = new QueryClient();

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
