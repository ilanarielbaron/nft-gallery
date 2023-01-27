import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const initialState = {
	 isLoading: false,
} as API;

const apiStateSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		errorMessage: (state, action: PayloadAction<{ message?: string }>): void => {
			state.errorMessage = action.payload.message;
			state.isLoading = false;
		},
		toggleLoading: (state, action: PayloadAction<{ isLoading: boolean }>): void => {
			state.isLoading = action.payload.isLoading;
			state.errorMessage = undefined;
		},
		reset: (state): void => {
			state.isLoading = false;
			state.errorMessage = undefined;
		},
	},
});

export const { errorMessage, toggleLoading, reset } = apiStateSlice.actions;

export const selectIsLoading = (state: RootState) => state.api.isLoading;
export const selectErrorMessage = (state: RootState) => state.api.errorMessage;

export default apiStateSlice.reducer;
