import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './services/AuthContext';
import { MemoryRouter } from 'react-router-dom';

test('renders register', () => {
	render(
		<AuthProvider>
			<MemoryRouter>
				<App />
			</MemoryRouter>
		</AuthProvider>,
	);
	const linkElement = screen.getByText(/LOGIN/i);
	expect(linkElement).toBeInTheDocument();
});
