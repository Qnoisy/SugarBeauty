import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAdminDataFromFirestore } from 'services/adminService';

interface StatsInterface {
	totalUsers: number;
	adminUsers: number;
	galleryItems: number;
}

interface AdminState {
	stats: StatsInterface;
	loading: boolean;
	error: string | null;
}

const initialState: AdminState = {
	stats: {
		totalUsers: 0,
		adminUsers: 0,
		galleryItems: 0,
	},
	loading: false,
	error: null,
};

// Thunk для получения данных админ-панели
export const fetchAdminData = createAsyncThunk('admin/fetchData', async () => {
	return await fetchAdminDataFromFirestore();
});

const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchAdminData.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchAdminData.fulfilled, (state, action) => {
				state.loading = false;
				state.stats = action.payload;
			})
			.addCase(fetchAdminData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error fetching data';
			});
	},
});

export default adminSlice.reducer;
