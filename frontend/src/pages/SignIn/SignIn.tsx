import { Container } from 'components/Container';
import { GoogleSign } from 'components/GoogleSign';
import { CustomButton } from 'components/UI/CustomButton';
import { CustomInput } from 'components/UI/CustomInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Formik } from 'formik';
import { useAppDispatch } from 'hooks/redux';
import { Link, useNavigate } from 'react-router-dom';
import { setError, setLoading, setUser } from 'store/reducers/UserSlice';
import { auth } from 'utils/firebase';
import { initialValuesSignIn, SignInSchema } from 'utils/userShema';
import styles from './SignIn.module.scss';

const SignIn = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleAuthSuccess = async (user: any) => {
		try {
			const token = await user.getIdToken();
			const name = user.displayName || '';
			const email = user.email!;
			const role = 'user';
			const photoURL = user.photoURL || null; // Фото профиля пользователя

			localStorage.setItem(
				'user',
				JSON.stringify({ name, email, id: user.uid, token, role, photoURL })
			);

			// Обновляем Redux состояние
			dispatch(setUser({ name, email, id: user.uid, token, role, photoURL }));
			dispatch(setLoading(false));
			navigate('/profile');
		} catch (error) {
			console.error('Error during authentication:', error);
			dispatch(setError((error as Error).message));
			dispatch(setLoading(false));
		}
	};

	const handleSignIn = (email: string, password: string) => {
		dispatch(setLoading(true));
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => handleAuthSuccess(user))
			.catch((error: unknown) => {
				console.error('Sign-in error:', error);
				dispatch(
					setError(error instanceof Error ? error.message : 'An error occurred')
				);
				dispatch(setLoading(false));
				alert('Invalid credentials');
			});
	};

	return (
		<Container section>
			<Formik
				initialValues={initialValuesSignIn}
				validationSchema={SignInSchema}
				onSubmit={values => handleSignIn(values.email, values.password)}
			>
				<Form className={styles.form}>
					<h2 className={styles.form__title}>
						<strong>zaloguj się</strong>
					</h2>
					<CustomInput
						label='E-mail'
						name='email'
						placeholder='Enter your email address'
					/>
					<CustomInput
						label='Hasło'
						name='password'
						placeholder='Enter your password'
						type='password'
					/>

					<Link to='/resetPassword' className={styles.form__reset}>
						<strong>Nie pamiętasz hasła?</strong>
					</Link>
					<Link to='/signUp' className={styles.form__reset}>
						<strong>Nie masz konta?</strong>
						{/* Zaloz konto */}
					</Link>
					<GoogleSign />
					<CustomButton type='submit' text='zaloguj się' />
				</Form>
			</Formik>
		</Container>
	);
};

export default SignIn;
