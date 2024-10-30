import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
	name: string;
	email: string;
	token: string;
	id: string;
	role: string; // Добавляем поле роли
	photoURL?: string | null; // URL фото пользователя, если доступно
}

interface UserState {
	user: User | null; // Храним объект `user`
	isAuth: boolean;
	isLoading: boolean;
	error: string | null;
}

const initialState: UserState = {
	user: null, // Начальное значение - null
	isAuth: false,
	isLoading: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload;
			state.isAuth = true;
		},
		removeUser(state) {
			state.user = null;
			state.isAuth = false;
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload;
		},
	},
});

export const { setUser, removeUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
