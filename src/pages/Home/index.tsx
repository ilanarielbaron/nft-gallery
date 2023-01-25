import { Alert } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useMetamask } from "../../hooks/useMetamask";
import { selectWallet } from "../../store/walletReducer";

const Home = () => {
  const { errorMessage } = useMetamask();
  const wallet = useAppSelector(selectWallet);

  if (errorMessage) {
    return (
      <Alert severity="error">{errorMessage}</Alert>
    )
  }

  return (
    <h1>{wallet.address}</h1>
  )
}

export default Home;
