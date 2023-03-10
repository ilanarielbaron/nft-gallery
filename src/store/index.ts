import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import apiReducer from './apiReducer';
import nftsReducer from './nftsReducer';
import walletReducer from './walletReducer';

export const store = configureStore({
	reducer: {
		wallet: walletReducer,
		nfts: nftsReducer,
		api: apiReducer
	},
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
