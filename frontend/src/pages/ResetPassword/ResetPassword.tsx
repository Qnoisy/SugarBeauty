// src/router/ResetPassword/ResetPassword.tsx
import { Container } from 'components/Container';
import { CustomButton } from 'components/UI/CustomButton';
import { CustomInput } from 'components/UI/CustomInput';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Form, Formik } from 'formik';
import { useAppDispatch } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { setError, setLoading } from 'store/reducers/UserSlice';
import { ResetPasswordSchema } from 'utils/userShema';
import styles from './ResetPassword.module.scss';

const ResetPassword = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleResetPassword = (email: string) => {
		dispatch(setLoading(true));
		const auth = getAuth();

		sendPasswordResetEmail(auth, email)
			.then(() => {
				dispatch(setLoading(false));
				navigate('/signIn');
			})
			.catch(error => {
				console.error('Error sending reset password email:', error);
				dispatch(setError(error.message));
				dispatch(setLoading(false));
			});
	};

	return (
		<Container section>
			<Formik
				initialValues={{ email: '' }}
				validationSchema={ResetPasswordSchema}
				onSubmit={values => {
					handleResetPassword(values.email);
				}}
			>
				{({ handleSubmit }) => (
					<Form className={styles.form} onSubmit={handleSubmit}>
						<h2 className={styles.form__title}>
							<strong>Reset Password</strong>
						</h2>
						<CustomInput
							label='Email'
							name='email'
							placeholder='Enter your email address'
						/>
						<CustomButton type='submit' text='Send Reset Email' />
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export { ResetPassword };
