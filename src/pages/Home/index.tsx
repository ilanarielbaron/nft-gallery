import { CircularProgress } from '@mui/material';
import { Gallery } from '../../components/Gallery';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectIsLoading } from '../../store/nftsReducer';
import { walletIsConnected } from '../../store/walletReducer';

const Home = () => {
	const walletConnected = useAppSelector(walletIsConnected);
	const isLoading = useAppSelector(selectIsLoading);

	// if (errorMessage) {
	// 	return <Alert severity='error'>{errorMessage}</Alert>;
	// }

	if (isLoading) {
		return <CircularProgress sx={{ marginTop: 5 }} />;
	}

	return <>{walletConnected && <Gallery />}</>;
};

export default Home;
