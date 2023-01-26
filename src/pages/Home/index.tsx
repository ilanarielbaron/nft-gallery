import { Alert, CircularProgress } from '@mui/material';
import { Gallery } from '../../components/Gallery';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useMetamask } from '../../hooks/useMetamask';
import { selectIsLoading } from '../../store/nftsReducer';
import { walletIsConnected } from '../../store/walletReducer';

const Home = () => {
	const { errorMessage } = useMetamask();
	const walletConnected = useAppSelector(walletIsConnected);
	const isLoading = useAppSelector(selectIsLoading);

	if (errorMessage) {
		return <Alert severity='error'>{errorMessage}</Alert>;
	}

	if (isLoading) {
		return <CircularProgress sx={{ marginTop: 5 }} />;
	}

	return <>{walletConnected && <Gallery />}</>;
};

export default Home;
