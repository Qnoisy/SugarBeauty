import * as Yup from 'yup';

const regx = {
	name: /^[а-яА-Яa-zA-Z ]$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

// Схема для реєстрації
const name = Yup.string().required('Proszę wpisać swoje imię');
const password = Yup.string()
	.min(8, 'Password is too short - should be 8 chars minimum.')
	.required('Proszę wpisać swoje hasło');
const email = Yup.string()
	.matches(regx.email, 'Format example@gmail.com')
	.required('Proszę wpisać swój adres email');

export const subscribeSchema = Yup.object().shape({
	email,
});

// Схема для входу в систему

export const SignInSchema = Yup.object().shape({
	email,
	password,
});

export const initialValuesSignIn = {
	email: '',
	password: '',
};

export const SignUpSchema = Yup.object().shape({
	name,
	email,
	password,
});
export const initialValuesSignUp = {
	name: '',
	email: '',
	password: '',
};

export const ResetPasswordSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
});

// Схема валидации с необязательными полями
export const editProfileSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
});
