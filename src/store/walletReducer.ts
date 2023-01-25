import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './';

const initialState = {
  wallet: { isConnected: false } as Wallet,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    connectWallet: (state, action: PayloadAction<{ address: string }>): void => {
      state.wallet = { isConnected: true, address: action.payload.address }
    },
    disconnectWallet: (state): void => {
      state.wallet = { isConnected: false }
    },
  },
});

export const {
  connectWallet,
  disconnectWallet,
} = walletSlice.actions;

export const selectWallet = (state: RootState) => state.wallet.wallet;
export const walletIsConnected = (state: RootState) => state.wallet.wallet.isConnected;

export default walletSlice.reducer;
