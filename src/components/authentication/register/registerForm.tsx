import { RegistrationFormProps } from "../../../types/user";


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
			<div>
				<label>
					First Name:
					<input type="text" name="firstName" />
				</label>
			</div>
			<div>
				<label>
					Last Name:
					<input type="text" name="lastName" />
				</label>
			</div>
			<div>
				<label>
					Phone Number:
					<input type="text" name="phone" />
				</label>
			</div>
			<div>
				<label>
					Email:
					<input type="text" name="email" />
				</label>
			</div>
			<div>
				<label>
					Address:
					<input type="text" name="address" />
				</label>
			</div>
			<div>
				<label>
					Password:
					<input type="password" name="password" />
				</label>
			</div>
			<button type="submit">Register</button>
		</form>
	);
};

export default RegistrationForm;
