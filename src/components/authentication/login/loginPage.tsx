import React from 'react';
import LoginForm from './loginForm';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { UserLoginType } from '../../../types/user';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../services/AuthContext';

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const mutation = useMutation(
		(userData: UserLoginType) => {
			return axios.post('http://localhost:3001/api/v1/auth/login', userData);
		},
		{
			onSuccess: ({data}) => {
				login(data.data.token);
				navigate('/items')
				toast.success('Login successful!');
			},
			onError: (error: AxiosError<AxiosError>) => {
				const errors = error.response?.data?.message;
				if (typeof errors === 'string') {
					toast.error(errors.split(',').join('\n'));
					
				} else {
					toast.error(`Erors: ${errors}`);
				}
			},
		},
	);

	const handleUserLogin = (
		email: string,
		password: string,
	) => {
		const userData: UserLoginType = {
			email,
			password,
		};
		mutation.mutate(userData);
	};

	return (
		<div>
			<h2>User Login</h2>
			<LoginForm onSubmit={handleUserLogin} />
		</div>
	);
};

export default LoginPage;
