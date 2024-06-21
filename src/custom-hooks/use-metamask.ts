import { useState } from "react";
import { useDispatch } from "react-redux";
import { SNACKBAR_OPEN } from "@/store/constants";
import { getWalletAddress } from "@/store/slices/metamask";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useMetaMask = () => {
  const [balance, setBalance] = useState<string>("");
  const dispatch = useDispatch();

  const connectMetamask = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }],
        });
        const userAccount = accounts[0];
        dispatch(getWalletAddress(userAccount));
        const result = await window.ethereum.request({
          method: "eth_getBalance",
          params: [userAccount, "latest"],
        });
        setBalance(result);
      } else {
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message:
            "MetaMask is not installed, please add the extention from your browser",
          severity: "error",
          variant: "alert",
        });
        console.log("disconnect")
        window.open("https://metamask.io/download/", "_blank");
      }
    } catch (error) {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: `Something went wrong`,
        severity: "error",
        variant: "alert",
      });
    }
  };

  return {
    connectMetamask,
    balance,
  };
};
