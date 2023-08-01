import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Protected: React.FC<{ children: any }> = ({ children }) => {
	const navigate = useNavigate();
	const auth = useAuth();

	useEffect(() => {
		if (!auth.isAuthenticated()) {
			navigate('/login');
		}
	}, [auth, navigate]);

	return children;
};

export default Protected;
