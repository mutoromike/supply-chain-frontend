import React from 'react';
import RegistrationForm from './registerForm';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { UserRegisterType } from '../../../types/user';

const RegistrationPage: React.FC = () => {
	const mutation = useMutation(
		(userData: UserRegisterType) => {
			return axios.post('http://localhost:3001/api/v1/auth/register', userData);
		},
		{
			onSuccess: () => {
				toast.success('Registration successful!');
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

	const handleUserRegistration = (
		firstName: string,
		lastName: string,
		phone: string,
		email: string,
		address: string,
		password: string,
	) => {
		const userData: UserRegisterType = {
			firstName,
			lastName,
			phone,
			email,
			address,
			password,
		};
		mutation.mutate(userData);
	};

	return (
		<div>
			<h2>User Registration</h2>
			<RegistrationForm onSubmit={handleUserRegistration} />
		</div>
	);
};

export default RegistrationPage;
