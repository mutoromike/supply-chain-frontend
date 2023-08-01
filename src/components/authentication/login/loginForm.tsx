import { TextField, Button, Stack } from '@mui/material';
import { LoginFormProps } from '../../../types/user';

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
		};
		const email = target.email.value;
		const password = target.password.value;
		onSubmit(email, password);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack spacing={2} direction="column" alignItems="center">
				<TextField
					label="Email"
					type="text"
					name="email"
					fullWidth
					variant="outlined"
					required
					sx={{ width: '300px' }}
				/>
				<TextField
					label="Password"
					type="password"
					name="password"
					fullWidth
					variant="outlined"
					required
					sx={{ width: '300px' }}
				/>
				<Button type="submit" variant="contained" color="primary">
					Login
				</Button>
			</Stack>
		</form>
	);
};

export default LoginForm;
