import { Stack, TextField, Button } from '@mui/material';
import { RegistrationFormProps } from '../../../types/user';

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			firstName: { value: string };
			lastName: { value: string };
			phone: { value: string };
			email: { value: string };
			address: { value: string };
			password: { value: string };
		};
		const firstName = target.firstName.value;
		const lastName = target.lastName.value;
		const phone = target.phone.value;
		const email = target.email.value;
		const address = target.address.value;
		const password = target.password.value;
		onSubmit(firstName, lastName, phone, email, address, password);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack spacing={2} direction="column" alignItems="center">
				<TextField
					label="First Name"
					type="text"
					name="firstName"
					variant="outlined"
					required
					sx={{ width: '300px' }}
				/>
				<TextField
					label="Last Name"
					type="text"
					name="lastName"
					variant="outlined"
					required
					sx={{ width: '300px' }}
				/>
				<TextField
					label="Phone Number"
					type="text"
					name="phone"
					variant="outlined"
					required
					sx={{ width: '300px' }}
				/>
				<TextField
					label="Email"
					type="text"
					name="email"
					variant="outlined"
					required
					sx={{ width: '300px' }}
				/>
				<TextField
					label="Address"
					type="text"
					name="address"
					variant="outlined"
					required
					sx={{ width: '300px' }}
				/>
				<TextField
					label="Password"
					type="password"
					name="password"
					variant="outlined"
					required
					sx={{ width: '300px' }}
				/>
				<Button type="submit" variant="contained" color="primary">
					Register
				</Button>
			</Stack>
		</form>
	);
};

export default RegistrationForm;
