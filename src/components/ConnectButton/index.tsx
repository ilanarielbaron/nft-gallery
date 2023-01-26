import { Button } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { disconnectWallet, walletIsConnected } from '../../store/walletReducer';
import { useMetamask } from '../../hooks/useMetamask';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { disconnect } from '../../store/nftsReducer';

export const ConnectButton = () => {
  const dispatch = useAppDispatch();
  const { connectHandler } = useMetamask();
  const isConnected = useAppSelector(walletIsConnected);

  return (
    <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}
      onClick={!isConnected
        ? connectHandler
        : (): void => { dispatch(disconnectWallet()); dispatch(disconnect()) }}
    >
      {isConnected ? 'Disconnect' : 'Connect'}
    </Button>
  );
}
