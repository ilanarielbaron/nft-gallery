import { useState } from 'react';
import { connectUser, createUser, getUserByAddress, getUserConnected } from '../api';
import { disconnect, likeNfts, toggleLoading } from '../store/nftsReducer';
import { connectWallet, disconnectWallet } from '../store/walletReducer';
import { useAppDispatch } from './useAppDispatch';
import { useNFTs } from './useNFTs';

interface UseMetamask {
	errorMessage: string | null
	connectHandler: () => void
	chainChanged: () => void
	accountChanged: (address: string) => void
	syncUser: (address: string, chainId: string, nftsLiked: string[], id: string) => void
	accountChangeMetamask: (address: string[]) => void
	userIsConnected: () => void
}

export const useMetamask = (): UseMetamask => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { fetch } = useNFTs();
	const dispatch = useAppDispatch();

	const syncUser = async (
		address: string,
		chainId: string,
		nftsLiked: string[],
		id: string,
	): Promise<void> => {
		dispatch(toggleLoading({ isLoading: true }));
		dispatch(connectWallet({ address, chainId, id }));
		const { error } = await fetch(address);
		if (error) {
			setErrorMessage(error);
			dispatch(toggleLoading({ isLoading: false }));

			return;
		}

		dispatch(likeNfts(nftsLiked));
		dispatch(toggleLoading({ isLoading: false }));
	};

	const userIsConnected = async (): Promise<void> => {
		dispatch(toggleLoading({ isLoading: true }));
		const userConnected = await getUserConnected();
		if (userConnected) {
			syncUser(
				userConnected.address,
				userConnected.chainId,
				userConnected.nftsLiked,
				userConnected.id,
			);
		}
		dispatch(toggleLoading({ isLoading: false }));
	};

	const accountChangeMetamask = async (address: string[]): Promise<void> => {
		accountChanged(address[0]);
	};

	const accountChanged = async (address: string): Promise<void> => {
		dispatch(toggleLoading({ isLoading: true }));
		//@ts-expect-error out of typescript scope
		const chainId = window.ethereum.chainId;
		const existingUser = await getUserByAddress(address);
		let id = '';
		if (!existingUser) {
			id = await createUser(address, chainId);
		} else {
			id = existingUser.id;
			await connectUser(existingUser.id);
		}
		const nftsLiked = existingUser ? existingUser.nftsLiked : [];
		dispatch(toggleLoading({ isLoading: false }));
		syncUser(address, chainId, nftsLiked, id);
	};

	const chainChanged = (): void => {
		setErrorMessage(null);
		dispatch(disconnectWallet());
		dispatch(disconnect());
	};

	const connectHandler = async (): Promise<void> => {
		//@ts-expect-error out of typescript scope
		if (window.ethereum) {
			try {
				//@ts-expect-error out of typescript scope
				const res = await window.ethereum.request({
					method: 'eth_requestAccounts',
				});
				await accountChanged(res[0]);
			} catch (err) {
				console.error(err);
				setErrorMessage('There was a problem connecting to MetaMask');
			}
		} else {
			setErrorMessage('Install MetaMask');
		}
	};

	return {
		errorMessage,
		connectHandler,
		chainChanged,
		accountChanged,
		syncUser,
		accountChangeMetamask,
		userIsConnected,
	};
};
