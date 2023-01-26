import { useState } from "react";
import { disconnect } from "../store/nftsReducer";
import { connectWallet, disconnectWallet } from "../store/walletReducer";
import { useAppDispatch } from "./useAppDispatch";
import { useNFTs } from "./useNFTs";

interface UseMetamask {
  errorMessage: string | null;
  connectHandler: () => void;
  chainChanged: () => void;
  accountChanged: (address: string) => void;
}

export const useMetamask = (): UseMetamask => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetch } = useNFTs()
  const dispatch = useAppDispatch();

  const accountChanged = async (address: string): Promise<void> => {
    //@ts-expect-error
    const chainId = window.ethereum.chainId;
    dispatch(connectWallet({ address, chainId }));
  };

  const chainChanged = (): void => {
    setErrorMessage(null);
    dispatch(disconnectWallet());
    dispatch(disconnect());
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
        const { error } = await fetch(res[0]);

        if (error) {
          setErrorMessage(error);
        }
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
