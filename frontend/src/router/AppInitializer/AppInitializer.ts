import { useAppDispatch } from 'hooks/redux';
import { useEffect } from 'react';
import { setUser } from 'store/reducers/UserSlice';

export const AppInitializer = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const savedUser = localStorage.getItem('user');
		if (savedUser) {
			try {
				const parsedUser = JSON.parse(savedUser);
				dispatch(
					setUser({
						name: parsedUser.name,
						email: parsedUser.email,
						id: parsedUser.id,
						token: parsedUser.token,
					})
				);
			} catch (error) {
				console.error('Failed to parse user from localStorage:', error);
			}
		}
	}, [dispatch]);

	return null;
};
