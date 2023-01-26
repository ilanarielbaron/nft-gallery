import { Button } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { disconnectWallet, selectWallet, walletIsConnected } from '../../store/walletReducer';
import { useMetamask } from '../../hooks/useMetamask';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { disconnect, selectIsLoading, toggleLoading } from '../../store/nftsReducer';
import { disconnectUser } from '../../api';

export const ConnectButton = () => {
	const dispatch = useAppDispatch();
	const { connectHandler } = useMetamask();
	const isConnected = useAppSelector(walletIsConnected);
	const isLoading = useAppSelector(selectIsLoading);
	const currentUser = useAppSelector(selectWallet);

	return (
		<Button
			disabled={isLoading}
			variant='outlined'
			sx={{ my: 1, mx: 1.5 }}
			onClick={
				!isConnected
					? connectHandler
					: async (): Promise<void> => {
						dispatch(toggleLoading({ isLoading: true }));
						if (currentUser.id && isConnected) {
							await disconnectUser(currentUser.id);
						}
						dispatch(disconnectWallet());
						dispatch(disconnect());
						dispatch(toggleLoading({ isLoading: false }));
					}
			}
		>
			{isLoading ? 'loading' : isConnected ? 'Disconnect' : 'Connect'}
		</Button>
	);
};
