import { useCallback, useEffect } from 'react';
import RoutesComponent from './components/Routes';
import Layout from './components/Layout';
import { accountChanged, chainChanged, userIsConnected } from './metamask';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useNFTs } from './hooks/useNFTs';
import { useAppSelector } from './hooks/useAppSelector';
import { selectWallet } from './store/walletReducer';

function App() {
	const dispatch = useAppDispatch();
	const { fetch } = useNFTs();
	const wallet = useAppSelector(selectWallet);

	const accountChangeMetamask = useCallback(async (address: string[]): Promise<void> => {
		accountChanged(address[0], dispatch, fetch, wallet.id);
	}, []);

	// Initialize the application and MetaMask Event Handlers
	useEffect(() => {
		//@ts-expect-error out of typescript scope
		if (window.ethereum) {
			//@ts-expect-error out of typescript scope
			window.ethereum.on('accountsChanged', accountChangeMetamask);
			//@ts-expect-error out of typescript scope
			window.ethereum.on('chainChanged', chainChanged);

			userIsConnected(dispatch, fetch);
		}
	}, []);

	return (
		<Layout>
			<RoutesComponent />
		</Layout>
	);
}

export default App;
