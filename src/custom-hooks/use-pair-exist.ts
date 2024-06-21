import { useState } from "react";
import Web3 from "web3";
import factoryABI from "@/abi-contracts/factory.json";
import dotenv from "dotenv";
import { useDispatch } from "react-redux";
import { SNACKBAR_OPEN } from "@/store/constants";

dotenv.config();

interface TokenSwapError {
  message: string;
}

let web3: any = new Web3(process.env.NEXT_PUBLIC_RPC_URL);

const useIsPair = () => {
  const [error, setError] = useState<TokenSwapError | null>(null);
  const dispatch = useDispatch();

  const handleLiquidity = async (
    tokenIN: string,
    tokenOUT: string
  ) => {
    try {
      web3 = new Web3(window.ethereum);
      const factoryAddress = process.env.NEXT_PUBLIC_APP_FACTORY;

      const factorycontract = new web3.eth.Contract(
        factoryABI.abi,
        factoryAddress
      );
      const bool = await factorycontract.methods.ISpairExist(tokenIN, tokenOUT).call();

      return bool;
    } catch (error: any) {
      console.error("Error Swapping:", error);
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: `Something went wrong`,
        severity: "error",
        variant: "alert",
      });
      setError({ message: error.message });
    }
  };

  return { handleLiquidity, error };
};

export default useIsPair;
