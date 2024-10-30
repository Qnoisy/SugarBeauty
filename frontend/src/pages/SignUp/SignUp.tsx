import { Container } from 'components/Container';
import { GoogleSign } from 'components/GoogleSign';
import { CustomButton } from 'components/UI/CustomButton';
import { CustomInput } from 'components/UI/CustomInput';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { useAppDispatch } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { setError, setLoading, setUser } from 'store/reducers/UserSlice';
import { auth, db } from 'utils/firebase';
import { initialValuesSignUp, SignUpSchema } from 'utils/userShema';
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

		createUserWithEmailAndPassword(auth, values.email, values.password)
			.then(async ({ user }) => {
				try {
					// Обновляем профиль пользователя, добавляя имя
					await updateProfile(user, { displayName: values.name });

					// Сохраняем информацию о пользователе в Firestore с ролью по умолчанию 'user'
					await setDoc(doc(db, 'users', user.uid), {
						name: values.name,
						email: values.email,
						role: 'user', // Роль по умолчанию 'user'
					});

					// Получаем токен аутентификации пользователя
					const token = await user.getIdToken();
					const photoURL = user.photoURL || null; // Устанавливаем photoURL в null при регистрации без Google

					// Обновляем состояние Redux с информацией о пользователе
					dispatch(
						setUser({
							name: values.name,
							email: values.email,
							id: user.uid,
							token,
							role: 'user',
							photoURL,
						})
					);

					// Убираем флаг загрузки и переходим на главную страницу
					dispatch(setLoading(false));
					navigate('/');
				} catch (error) {
					console.error('Ошибка при регистрации:', (error as Error).message);
					dispatch(setError((error as Error).message));
					dispatch(setLoading(false));
					alert('Error during registration!');
				}
			})
			.catch(error => {
				console.error('Ошибка при регистрации:', error.message);
				dispatch(setError(error.message));
				dispatch(setLoading(false));
				alert('Error during registration!');
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
						<GoogleSign />
						<CustomButton type='submit' text='załóż konto' />
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export { SignUp };
