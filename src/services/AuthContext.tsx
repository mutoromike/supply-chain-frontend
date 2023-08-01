// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
	token: string;
	login: (newToken: string) => void;
	logout: () => void;
	isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children?: any }> = ({ children }) => {
	const [token, setToken] = useState<string>(
		() => localStorage.getItem('token') || '',
	);

	const login = (newToken: string) => {
		setToken(newToken);
		localStorage.setItem('token', newToken);
	};

	const logout = () => {
		setToken('');
		localStorage.removeItem('token');
	};

	const isAuthenticated = () => !!token.length;

	const authContextValue: AuthContextType = {
		token,
		login,
		logout,
		isAuthenticated,
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const authContext = useContext(AuthContext);
	if (!authContext) {
		throw new Error('useAuth must be used within an AuthProvider.');
	}
	return authContext;
};
