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

	// Функция для регистрации пользователя
	const handleSignUp = (values: {
		name: string;
		email: string;
		password: string;
	}) => {
		console.log('Регистрация началась'); // Лог для проверки срабатывания
		dispatch(setLoading(true)); // Устанавливаем флаг загрузки

		const auth = getAuth(); // Получаем объект аутентификации Firebase

		createUserWithEmailAndPassword(auth, values.email, values.password)
			.then(async ({ user }) => {
				// Обновляем имя пользователя
				await updateProfile(user, { displayName: values.name });

				const token = await user.getIdToken(); // Получаем токен пользователя

				// Сохраняем данные пользователя в Redux
				dispatch(
					setUser({
						name: values.name,
						email: user.email!,
						id: user.uid,
						token,
					})
				);

				dispatch(setLoading(false)); // Выключаем флаг загрузки
				navigate('/'); // Перенаправляем на главную страницу
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
				initialValues={initialValuesSignUp} // Начальные значения формы (включая name)
				validationSchema={SignUpSchema} // Схема валидации (включая name)
				onSubmit={(values, { resetForm }) => {
					handleSignUp(values); // Вызываем функцию регистрации при сабмите
					resetForm(); // Сбрасываем форму после успешного сабмита
				}}
			>
				{({ handleSubmit }) => (
					<Form className={styles.signUp} onSubmit={handleSubmit}>
						{/* Поле для имени */}
						<CustomInput
							label='Name'
							name='name'
							placeholder='Enter your name'
						/>
						<CustomInput
							label='Email'
							name='email'
							placeholder='Enter your email'
						/>
						<CustomInput
							label='Password'
							name='password'
							placeholder='Enter your password'
							type='password'
						/>

						{/* Кнопка для отправки формы */}
						<CustomButton type='submit' text='Sign Up' />
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export { SignUp };
