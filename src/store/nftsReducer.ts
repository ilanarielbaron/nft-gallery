import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const initialState = {
	nfts: [] as NFT[],
	isLoading: false,
};

export const nftsSlice = createSlice({
	name: 'nfts',
	initialState,
	reducers: {
		fetchNFTs: (state, action: PayloadAction<NFT[]>): void => {
			state.nfts = action.payload;
		},
		disconnect: (state): void => {
			state.nfts = [];
		},
		toggleNFTLike: (state, action: PayloadAction<{ id: string }>): void => {
			state.nfts = state.nfts.map((nft) =>
				nft.id === action.payload.id ? { ...nft, isLiked: !nft.isLiked } : nft,
			);
		},
		likeNfts: (state, action: PayloadAction<string[]>): void => {
			state.nfts = state.nfts.map((nft) =>
				action.payload.includes(nft.id) ? { ...nft, isLiked: true } : nft,
			);
		},
	},
});

export const { fetchNFTs, disconnect, toggleNFTLike, likeNfts } = nftsSlice.actions;

export const selectNFTs = (state: RootState) => state.nfts.nfts;
export const selectLikedNFTs = (state: RootState) => state.nfts.nfts.filter((nft) => nft.isLiked);

export default nftsSlice.reducer;
