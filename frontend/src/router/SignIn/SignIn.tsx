import { Container } from 'components/Container';
import { CustomButton } from 'components/UI/CustomButton';
import { CustomInput } from 'components/UI/CustomInput';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import { Form, Formik } from 'formik';
import { useAppDispatch } from 'hooks/redux';
import { FaGoogle } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { setError, setLoading, setUser } from 'store/reducers/UserSlice';
import { initialValuesSignIn, SignInSchema } from 'validation/userShema';
import styles from './SignIn.module.scss';

const SignIn = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleAuthSuccess = async (user: any, dispatch: any, navigate: any) => {
		try {
			const token = await user.getIdToken();
			const name = user.displayName || '';
			const email = user.email!;

			localStorage.setItem(
				'user',
				JSON.stringify({ name, email, id: user.uid, token })
			);

			dispatch(
				setUser({
					name,
					email,
					id: user.uid,
					token,
				})
			);
			dispatch(setLoading(false));
			navigate('/');
		} catch (error) {
			console.error('Error during authentication:', error);
			dispatch(setError((error as Error).message));
			dispatch(setLoading(false));
		}
	};

	const handleGoogleSign = () => {
		dispatch(setLoading(true));
		const auth = getAuth();
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider)
			.then(({ user }) => handleAuthSuccess(user, dispatch, navigate))
			.catch(error => {
				dispatch(setError(error.message));
				dispatch(setLoading(false));
				alert('Invalid user!');
			});
	};

	const handleSignIn = (email: string, password: string) => {
		dispatch(setLoading(true));
		const auth = getAuth();

		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => handleAuthSuccess(user, dispatch, navigate))
			.catch(error => {
				dispatch(setError(error.message));
				dispatch(setLoading(false));
				alert('Invalid user!');
			});
	};

	return (
		<Container section>
			<Formik
				initialValues={initialValuesSignIn}
				validationSchema={SignInSchema}
				onSubmit={values => {
					handleSignIn(values.email, values.password);
				}}
			>
				<Form className={styles.form}>
					<h2 className={styles.form__title}>
						<strong>zaloguj się</strong>
					</h2>
					<button onClick={handleGoogleSign} className={styles.form__google}>
						<FaGoogle className={styles.form__img} />
						<strong>kontynuuj z google</strong>
					</button>
					<button className={styles.form__reset}>
						<Link to='/signUp'>
							<strong>Zaloz konto</strong>
						</Link>
					</button>
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

					<button className={styles.form__reset}>
						<Link to='/resetPassword'>
							<strong>Nie pamiętasz hasła?</strong>
						</Link>
					</button>
					<CustomButton type='submit' text='zaloguj się' />
				</Form>
			</Formik>
		</Container>
	);
};

export { SignIn };
