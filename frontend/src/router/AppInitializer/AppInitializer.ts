import { getAuth } from 'firebase/auth';
import { useAppDispatch } from 'hooks/redux';
import { useEffect } from 'react';
import { setLoading, setUser } from 'store/reducers/UserSlice';

export const AppInitializer = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const refreshUserToken = async () => {
			const user = getAuth().currentUser;
			if (user) {
				await user.getIdToken(true); // Принудительное обновление токена
				console.log('User token refreshed with new claims');
			}
		};

		refreshUserToken();
	}, []);
	useEffect(() => {
		const savedUser = localStorage.getItem('user');
		if (savedUser) {
			try {
				const parsedUser = JSON.parse(savedUser);
				dispatch(setUser(parsedUser));
			} catch (error) {
				console.error('Failed to parse user from localStorage:', error);
			}
		}
		dispatch(setLoading(false));
	}, [dispatch]);

	return null;
};
