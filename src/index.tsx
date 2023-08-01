import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RegistrationPage from './components/authentication/register/registerPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginPage from './components/authentication/login/loginPage';
import Item from './components/items/Item';
import { AuthProvider } from './services/AuthContext';
import Protected from './services/Protected';

const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: 
    [
      { path: '/register', element: <RegistrationPage />, children: [] },
      { path: '/login', element: <LoginPage /> },
      { path: '/items', element: <Protected><Item /></Protected>, children: [], },
    ]
  }
  ,
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
