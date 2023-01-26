import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './';

export const initialState = {
  wallet: { isConnected: false } as Wallet,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    connectWallet: (state, action: PayloadAction<{ address: string, chainId: string }>): void => {
      state.wallet = { isConnected: true, address: action.payload.address, chainId: action.payload.chainId }
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
export const selectChainId = (state: RootState) => state.wallet.wallet.chainId;

export default walletSlice.reducer;
