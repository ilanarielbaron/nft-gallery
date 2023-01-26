import { useCallback } from 'react';
import { getNFTsAlkemy, updateLikes } from '../api';
import { fetchNFTs } from '../store/nftsReducer';
import { useAppDispatch } from './useAppDispatch';

interface UseNFT {
  fetch: (address: string) => Promise<{ error: string | null }>
  updateLikesDB: (walletId: string, likedNfts: NFT[]) => Promise<void>
}

export const useNFTs = (): UseNFT => {
	const dispatch = useAppDispatch();

	const fetch = useCallback(
		async (address: string): Promise<{ error: string | null }> => {
			const { nfts, error } = await getNFTsAlkemy(address);
			if (error) {
				return { error };
			}

			if (nfts) {
				dispatch(fetchNFTs(nfts));
				return { error: null };
			}

			return { error: 'There was an error fetching the NFTs' };
		},
		[dispatch],
	);

	const updateLikesDB = useCallback(
		async (walletId: string, likedNfts: NFT[]): Promise<void> => {
			await updateLikes(
				walletId,
				likedNfts.map((nft) => nft.id),
			);
		},
		[updateLikes],
	);

	return {
		fetch,
		updateLikesDB,
	};
};
