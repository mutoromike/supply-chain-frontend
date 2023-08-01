export interface UserRegisterType {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	address: string;
	password: string;
}

export interface UserLoginType {
    email: string;
    password: string;
}

export interface RegistrationFormProps {
	onSubmit: (
		firstName: string,
		lastName: string,
		phone: string,
		email: string,
		address: string,
		password: string,
	) => void;
}

export interface LoginFormProps {
	onSubmit: (
		email: string,
		password: string,
	) => void;
}