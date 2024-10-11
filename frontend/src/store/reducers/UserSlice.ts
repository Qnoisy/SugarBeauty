import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	name: string | null;
	email: string | null;
	token: string | null;
	id: string | null;
	isAuth: boolean;
	isLoading: boolean;
	error: string | null;
}

const initialState: UserState = {
	name: null,
	email: null,
	token: null,
	id: null,
	isAuth: false,
	isLoading: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(
			state,
			action: PayloadAction<{
				name: string;
				email: string;
				token: string;
				id: string;
			}>
		) {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.token = action.payload.token;
			state.id = action.payload.id;
			state.isAuth = true;
		},
		removeUser(state) {
			state.name = null;
			state.email = null;
			state.token = null;
			state.id = null;
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
