// import { AppDispatch } from '../store';
// import { userSlice } from './UserSlice';

// export const loginUser =
// 	(username: string, password: string) => async (dispatch: AppDispatch) => {
// 		try {
// 			dispatch(userSlice.actions.userIsAuth());
// 			// Представим, что мы получаем данные пользователя от API
// 			if (username === 'admin' && password === 'admin') {
// 				const userToken = 'exampleToken123';
// 				localStorage.setItem('userToken', userToken);
// 				dispatch(userSlice.actions.userIsAuthSuccess(true));
// 			} else {
// 				throw new Error('Invalid credentials');
// 			}
// 		} catch (error) {
// 			dispatch(userSlice.actions.userIsAuthError('Failed to login'));
// 		}
// 	};

// export const logoutUser = () => (dispatch: AppDispatch) => {
// 	localStorage.removeItem('userToken'); // Удаляем токен из localStorage
// 	dispatch(userSlice.actions.userLogout());
// };
