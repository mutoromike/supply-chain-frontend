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
			<div>
				<label>
					Email:
					<input type="text" name="email" />
				</label>
			</div>
			<div>
				<label>
					Password:
					<input type="password" name="password" />
				</label>
			</div>
			<button type="submit">Login</button>
		</form>
	);
};

export default LoginForm;
