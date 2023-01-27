import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connectUser, createUser, disconnectUser, getUserByAddress, getUserConnected } from './api';
import { disconnect, likeNfts, toggleLoading } from './store/nftsReducer';
import { connectWallet, disconnectWallet } from './store/walletReducer';

type DispatchType = ThunkDispatch<{
	wallet: {
		wallet: Wallet;
	};
	nfts: {
		nfts: NFT[];
		isLoading: boolean;
	};
}, undefined, AnyAction> & Dispatch<AnyAction>;


const syncUser = async (
	address: string,
	chainId: string,
	nftsLiked: string[],
	id: string,
	dispatch: DispatchType,
	fetch: (address: string) => Promise<{
		error: string | null;
	}>,
): Promise<void> => {
	dispatch(toggleLoading({ isLoading: true }));
	dispatch(connectWallet({ address, chainId, id }));
	const { error } = await fetch(address);
	if (error) {
		//setErrorMessage(error);
		dispatch(toggleLoading({ isLoading: false }));

		return;
	}

	dispatch(likeNfts(nftsLiked));
	dispatch(toggleLoading({ isLoading: false }));
};

export const userIsConnected = async (dispatch: DispatchType, fetch: (address: string) => Promise<{
	error: string | null;
}>): Promise<void> => {
	dispatch(toggleLoading({ isLoading: true }));
	const userConnected = await getUserConnected();
	if (userConnected) {
		syncUser(
			userConnected.address,
			userConnected.chainId,
			userConnected.nftsLiked,
			userConnected.id,
			dispatch,
			fetch,
		);
	}
	dispatch(toggleLoading({ isLoading: false }));
};

export const accountChanged = async (address: string, dispatch: DispatchType, fetch: (address: string) => Promise<{
	error: string | null;
}>, walletId?: string): Promise<void> => {
	dispatch(toggleLoading({ isLoading: true }));
	if (walletId) await disconnectUser(walletId);
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
	syncUser(address, chainId, nftsLiked, id, dispatch, fetch);
};

export const chainChanged = (dispatch: DispatchType): void => {
	//setErrorMessage(null);
	dispatch(disconnectWallet());
	dispatch(disconnect());
};

export const connectHandler = async (dispatch: DispatchType, fetch: (address: string) => Promise<{
	error: string | null;
}>): Promise<void> => {
	//@ts-expect-error out of typescript scope
	if (window.ethereum) {
		try {
			//@ts-expect-error out of typescript scope
			const res = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});
			await accountChanged(res[0], dispatch, fetch);
		} catch (err) {
			console.error(err);
			//etErrorMessage('There was a problem connecting to MetaMask');
		}
	} else {
		//setErrorMessage('Install MetaMask');
	}
};
