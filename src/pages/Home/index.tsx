import { Alert } from "@mui/material";
import { Gallery } from "../../components/Gallery";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useMetamask } from "../../hooks/useMetamask";
import { walletIsConnected } from "../../store/walletReducer";

const Home = () => {
  const { errorMessage } = useMetamask();
  const walletConnected = useAppSelector(walletIsConnected);

  if (errorMessage) {
    return (
      <Alert severity="error">{errorMessage}</Alert>
    )
  }

  return (
    <>
      {walletConnected && <Gallery />}
    </>
  )
}

export default Home;
