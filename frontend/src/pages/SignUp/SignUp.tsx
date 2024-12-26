import FormContainer from 'components/FormContainer/FormContainer';
import styles from 'components/FormContainer/FormContainer.module.scss';
import { GoogleSign } from 'components/GoogleSign';
import { CustomButton } from 'components/UI/CustomButton';
import { CustomInput } from 'components/UI/CustomInput';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useAppDispatch } from 'hooks/redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setError, setLoading, setUser } from 'store/reducers/UserSlice';
import { auth, db } from 'utils/firebase';
import { initialValuesSignUp, SignUpSchema } from 'utils/userShema';

const SignUp = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSignUp = async (values: {
		name: string;
		email: string;
		password: string;
	}) => {
		dispatch(setLoading(true));
		try {
			// Создание пользователя
			const { user } = await createUserWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);

			// Обновление профиля пользователя
			await updateProfile(user, { displayName: values.name });

			// Сохранение информации о пользователе в Firestore
			const userData = {
				name: values.name,
				email: values.email,
				role: 'user', // Роль по умолчанию
			};
			await setDoc(doc(db, 'users', user.uid), userData);

			// Получение токена пользователя
			const token = await user.getIdToken();

			// Обновление Redux состояния
			dispatch(
				setUser({
					...userData,
					id: user.uid,
					token,
					photoURL: user.photoURL || null,
				})
			);

			// Сохранение данных в localStorage
			localStorage.setItem(
				'user',
				JSON.stringify({
					...userData,
					id: user.uid,
					token,
					photoURL: user.photoURL || null,
				})
			);

			// Успешное уведомление
			toast.success('Регистрация прошла успешно!');

			// Сброс состояния загрузки и перенаправление
			dispatch(setLoading(false));
			navigate('/');
		} catch (error: any) {
			dispatch(setLoading(false));

			if (error.code === 'auth/email-already-in-use') {
				toast.error('Этот email уже зарегистрирован. Попробуйте войти.');
				dispatch(
					setError('Этот email уже зарегистрирован. Попробуйте другой.')
				);
			} else {
				toast.error('Произошла ошибка при регистрации. Попробуйте снова.');
				dispatch(setError('Произошла ошибка при регистрации.'));
			}

			console.error('Ошибка при регистрации:', error.message);
		}
	};

	return (
		<FormContainer
			initialValues={initialValuesSignUp}
			validationSchema={SignUpSchema}
			onSubmit={(values, { resetForm }) => {
				handleSignUp(values);
				resetForm();
			}}
			title='Zarejestruj się'
		>
			<CustomInput label='Name' name='name' placeholder='Enter your name' />
			<CustomInput label='E-mail' name='email' placeholder='Enter your email' />
			<CustomInput
				label='Hasło'
				name='password'
				placeholder='Enter your password'
				type='password'
			/>
			<GoogleSign />
			<Link to='/signIn' className={styles.form__link}>
				<strong>
					masz konto? <span>wejść</span>
				</strong>
			</Link>
			<CustomButton type='submit' text='załóż konto' />
		</FormContainer>
	);
};

export { SignUp };
