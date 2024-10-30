import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAppDispatch } from 'hooks/redux';
import { FaGoogle } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { setError, setLoading, setUser } from 'store/reducers/UserSlice';
import { auth } from 'utils/firebase';
import styles from './GoogleSign.module.scss';

export const GoogleSign = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleAuthSuccess = async (user: any) => {
		try {
			const token = await user.getIdToken();
			const name = user.displayName || '';
			const email = user.email!;
			const role = 'user';

			localStorage.setItem(
				'user',
				JSON.stringify({ name, email, id: user.uid, token, role })
			);

			dispatch(setUser({ name, email, id: user.uid, token, role }));
			dispatch(setLoading(false));
			navigate('/profile');
		} catch (error) {
			console.error('Error during authentication:', error);
			dispatch(setError((error as Error).message));
			dispatch(setLoading(false));
		}
	};
	const handleGoogleSign = () => {
		dispatch(setLoading(true));
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then(({ user }) => handleAuthSuccess(user))
			.catch((error: unknown) => {
				console.error('Google sign-in error:', error);
				dispatch(
					setError(error instanceof Error ? error.message : 'An error occurred')
				);
				dispatch(setLoading(false));
				alert('Google sign-in failed!');
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
