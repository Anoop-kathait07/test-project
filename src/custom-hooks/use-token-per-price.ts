import { useState } from "react";
import Web3 from "web3";
import dotenv from "dotenv";
import factoryABI from "@/abi-contracts/factory.json";
import { useDispatch } from "react-redux";
import { SNACKBAR_OPEN } from "@/store/constants";

dotenv.config();

interface TokenSwapError {
  message: string;
}
let web3: any = new Web3(process.env.NEXT_PUBLIC_RPC_URL);
const useTokenPrice = () => {
  const [error, setError] = useState<TokenSwapError | null>(null);
  const dispatch = useDispatch();

  const handleTokenPrice = async (tokenIN: string, tokenOut: string) => {
    try {
      web3 = new Web3(window.ethereum);
      const factoryAddress = process.env.NEXT_PUBLIC_APP_FACTORY;
      const factorycontract = new web3.eth.Contract(
        factoryABI.abi,
        factoryAddress
      );
      const price = await factorycontract.methods
        .getReserveratio(tokenIN, tokenOut)
        .call();
      return (Number(price) / 10 ** 18).toFixed(5);
    } catch (error: any) {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: `Something went wrong`,
        severity: "error",
        variant: "alert",
      });
      console.error("Error Swapping:", error);
      setError({ message: error.message });
    }
  };

  return { handleTokenPrice, error };
};

export default useTokenPrice;
