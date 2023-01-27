import walletReducer, { connectWallet, disconnectWallet, initialState } from './walletReducer';
import nftsReducer, {
	disconnect,
	fetchNFTs,
	initialState as initialNFTsState,
	toggleLoading,
	toggleNFTLike,
} from './nftsReducer';

const mockNFT: NFT = {
	id: 'mockId',
	description: 'mockDescription',
	imageURL: 'mockImage',
	isLiked: false,
	title: 'mockTitle',
};

describe('tests for WalletReducer', () => {
	it('should return the initial state', () => {
		expect(walletReducer(undefined, { type: undefined })).toEqual(initialState);
	});

	it('connect a wallet', () => {
		const previousState: Wallet = { isConnected: false };
		expect(
			walletReducer(
				{ wallet: previousState },
				connectWallet({ address: 'address1', chainId: '0x1', id: 'mockId' }),
			),
		).toEqual({ wallet: { isConnected: true, address: 'address1', chainId: '0x1', id: 'mockId' } });
	});

	it('disconnect a wallet', () => {
		expect(
			walletReducer(
				{ wallet: { isConnected: true, address: 'address1', chainId: '0x1' } },
				disconnectWallet(),
			),
		).toEqual({ wallet: { isConnected: false } });
	});
});

describe('tests for NFTsReducer', () => {
	it('should return the initial state', () => {
		expect(nftsReducer(undefined, { type: undefined })).toEqual(initialNFTsState);
	});

	it('toggle loading', () => {
		const previousState: {
      nfts: NFT[]
      isLoading: boolean
    } = { nfts: [], isLoading: false };
		expect(nftsReducer(previousState, toggleLoading({ isLoading: true }))).toEqual({
			...previousState,
			isLoading: true,
		});
	});

	it('disconnect', () => {
		expect(nftsReducer({ nfts: [mockNFT], isLoading: false }, disconnect())).toEqual({
			nfts: [],
			isLoading: false,
		});
	});

	it('fetchNFTs', () => {
		expect(nftsReducer({ nfts: [], isLoading: false }, fetchNFTs([mockNFT]))).toEqual({
			nfts: [mockNFT],
			isLoading: false,
		});
	});

	it('toggleNFTLike', () => {
		expect(
			nftsReducer({ nfts: [mockNFT], isLoading: false }, toggleNFTLike({ id: 'mockId' })),
		).toEqual({ nfts: [{ ...mockNFT, isLiked: true }], isLoading: false });
	});
});
