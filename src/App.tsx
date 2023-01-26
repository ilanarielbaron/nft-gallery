import { useEffect } from 'react';
import RoutesComponent from './components/Routes';
import { Layout } from './components/Layout';
import { useMetamask } from './hooks/useMetamask';

function App() {
	const { chainChanged, accountChangeMetamask, userIsConnected } = useMetamask();

	// Initialize the application and MetaMask Event Handlers
	useEffect(() => {
		//@ts-expect-error out of typescript scope
		if (window.ethereum) {
			//@ts-expect-error out of typescript scope
			window.ethereum.on('accountsChanged', accountChangeMetamask);
			//@ts-expect-error out of typescript scope
			window.ethereum.on('chainChanged', chainChanged);
		}
	}, [chainChanged, accountChangeMetamask]);

	useEffect(() => {
		//@ts-expect-error out of typescript scope
		if (window.ethereum) {
			userIsConnected();
		}
	}, []);

	return (
		<Layout>
			<RoutesComponent />
		</Layout>
	);
}

export default App;
