import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAppDispatch } from 'hooks/redux';
import { FaGoogle } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setError, setLoading, setUser } from 'store/reducers/UserSlice';
import { auth, db } from 'utils/firebase';
import styles from './GoogleSign.module.scss';

export const GoogleSign = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// Обработка успешной аутентификации через Google
	const handleAuthSuccess = async (user: any) => {
		try {
			// Получаем токен и данные пользователя
			const token = await user.getIdToken();
			const name = user.displayName || 'Anonymous';
			const email = user.email!;
			const photoURL = user.photoURL || null;

			// Проверяем, существует ли пользователь в Firestore
			const userDocRef = doc(db, 'users', user.uid);
			const userDoc = await getDoc(userDocRef);

			if (!userDoc.exists()) {
				// Если пользователя нет, создаём новый документ
				await setDoc(userDocRef, {
					name,
					email,
					role: 'user', // Роль по умолчанию
					photoURL,
				});
				toast.success('Аккаунт создан через Google!');
			} else {
				toast.info('Добро пожаловать обратно!');
			}

			// Обновляем Redux состояние
			dispatch(
				setUser({
					name,
					email,
					id: user.uid,
					token,
					role: userDoc.exists() ? userDoc.data()?.role : 'user',
					photoURL,
				})
			);

			// Сохраняем данные пользователя в localStorage
			localStorage.setItem(
				'user',
				JSON.stringify({
					name,
					email,
					id: user.uid,
					token,
					role: userDoc.exists() ? userDoc.data()?.role : 'user',
					photoURL,
				})
			);

			// Завершаем процесс загрузки и перенаправляем
			dispatch(setLoading(false));
			navigate('/profile');
		} catch (error) {
			console.error('Error during Google authentication:', error);
			dispatch(setError((error as Error).message));
			dispatch(setLoading(false));
			toast.error('Ошибка при входе через Google. Попробуйте снова.');
		}
	};

	// Обработка нажатия на кнопку Google Sign-In
	const handleGoogleSign = () => {
		dispatch(setLoading(true));
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider)
			.then(({ user }) => handleAuthSuccess(user))
			.catch((error: any) => {
				console.error('Google sign-in error:', error.message);
				dispatch(setError(error.message || 'Произошла ошибка при входе.'));
				dispatch(setLoading(false));
				toast.error('Google sign-in failed! Попробуйте снова.');
			});
	};

	return (
		<button
			onClick={handleGoogleSign}
			type='button'
			className={styles.google__sign}
		>
			<FaGoogle className={styles.google__img} />
			<strong>Kontynuuj z Google</strong>
		</button>
	);
};
