import { Container } from 'components/Container';
import { CustomButton } from 'components/UI/CustomButton';
import { CustomInput } from 'components/UI/CustomInput';
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from 'firebase/auth';
import { Form, Formik } from 'formik';
import { useAppDispatch } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { setError, setLoading, setUser } from 'store/reducers/UserSlice';
import { initialValuesSignUp, SignUpSchema } from 'validation/userShema';
import styles from './SignUp.module.scss';

const SignUp = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleSignUp = (values: {
		name: string;
		email: string;
		password: string;
	}) => {
		dispatch(setLoading(true));
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, values.email, values.password)
			.then(async ({ user }) => {
				await updateProfile(user, { displayName: values.name });
				const token = await user.getIdToken();
				dispatch(
					setUser({
						name: values.name,
						email: user.email!,
						id: user.uid,
						token,
					})
				);
				dispatch(setLoading(false));
				navigate('/');
			})
			.catch(error => {
				console.error('Ошибка при регистрации:', error.message);
				dispatch(setError(error.message)); // Сохраняем ошибку в Redux
				dispatch(setLoading(false)); // Выключаем флаг загрузки
				alert('Error during registration!'); // Показываем сообщение об ошибке
			});
	};
	return (
		<Container section>
			<Formik
				initialValues={initialValuesSignUp}
				validationSchema={SignUpSchema}
				onSubmit={(values, { resetForm }) => {
					handleSignUp(values); // Вызываем функцию регистрации при сабмите
					resetForm(); // Сбрасываем форму после успешного сабмита
				}}
			>
				{({ handleSubmit }) => (
					<Form className={styles.form} onSubmit={handleSubmit}>
						<h2 className={styles.form__title}>
							<strong>Zarejestruj się</strong>
						</h2>
						<CustomInput
							label='Name'
							name='name'
							placeholder='Enter your name'
						/>
						<CustomInput
							label='E-mail'
							name='email'
							placeholder='Enter your email'
						/>
						<CustomInput
							label='Hasło'
							name='password'
							placeholder='Enter your password'
							type='password'
						/>

						<CustomButton type='submit' text='załóż konto' />
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export { SignUp };
