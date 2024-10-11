import { Container } from 'components/Container';
import { CustomButton } from 'components/UI/CustomButton';
import { CustomInput } from 'components/UI/CustomInput';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Formik } from 'formik';
import { useAppDispatch } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { setError, setLoading, setUser } from 'store/reducers/UserSlice';
import { initialValuesSignIn, SignInSchema } from 'validation/userShema';
import styles from './SignIn.module.scss';

const SignIn = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSignIn = (email: string, password: string) => {
		dispatch(setLoading(true));
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then(async ({ user }) => {
				const token = await user.getIdToken();
				const name = user.displayName || ''; // Получаем имя пользователя или пустую строку, если имени нет

				dispatch(
					setUser({
						name, // Передаем имя пользователя
						email: user.email!,
						id: user.uid,
						token,
					})
				);
				dispatch(setLoading(false));
				navigate('/');
			})
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
				<Form className={styles.signIn}>
					<CustomInput
						label='Email'
						name='email'
						placeholder='Enter your email address'
					/>
					<CustomInput
						label='Password'
						name='password'
						placeholder='Enter your password'
						type='password'
					/>
					<CustomButton type='submit' text='Submit' />
				</Form>
			</Formik>
		</Container>
	);
};

export { SignIn };
