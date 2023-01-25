import { useState } from "react";
import { connectWallet, disconnectWallet } from "../store/walletReducer";
import { useAppDispatch } from "./useAppDispatch";

interface UseMetamask {
  errorMessage: string | null;
  connectHandler: () => void;
  chainChanged: () => void;
  accountChanged: (address: string) => void;
}

export const useMetamask = (): UseMetamask => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const accountChanged = async (address: string): Promise<void> => {
    dispatch(connectWallet({ address }))
  };

  const chainChanged = (): void => {
    setErrorMessage(null);
    dispatch(disconnectWallet())
  };

  const connectHandler = async (): Promise<void> => {
    //@ts-expect-error
    if (window.ethereum) {
      try {
        //@ts-expect-error
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await accountChanged(res[0]);
      } catch (err) {
        console.error(err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  return {
    errorMessage,
    connectHandler,
    chainChanged,
    accountChanged,
  }
}
