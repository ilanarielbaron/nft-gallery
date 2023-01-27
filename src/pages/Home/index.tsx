import { Alert, CircularProgress } from '@mui/material';
import { Gallery } from '../../components/Gallery';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectErrorMessage, selectIsLoading } from '../../store/apiReducer';
import { walletIsConnected } from '../../store/walletReducer';

const Home = () => {
	const walletConnected = useAppSelector(walletIsConnected);
	const isLoading = useAppSelector(selectIsLoading);
	const error = useAppSelector(selectErrorMessage);

	if (error) return <Alert severity='error'>{error}</Alert>;

	if (isLoading) return <CircularProgress sx={{ marginTop: 5 }} />;

	return <>{walletConnected && <Gallery />}</>;
};

export default Home;
