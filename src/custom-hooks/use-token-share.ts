import { useState } from "react";
import Web3 from "web3";
import dotenv from "dotenv";
import factoryABI from "@/abi-contracts/factory.json";
import poolABI from "@/abi-contracts/pool.json";
import { useDispatch } from "react-redux";
import { SNACKBAR_OPEN } from "@/store/constants";

dotenv.config();

interface TokenSwapError {
  message: string;
}
let web3: any = new Web3(process.env.NEXT_PUBLIC_RPC_URL);

const useTokenShare = () => {
  const [error, setError] = useState<TokenSwapError | null>(null);
  const dispatch = useDispatch();

  const handleTokenShare = async (
    tokenIN: string,
    tokenOut: string,
    amountIn: number | null,
    amountOut: any
  ) => {
    try {
      web3 = new Web3(window.ethereum);
      const factoryAddress = process.env.NEXT_PUBLIC_APP_FACTORY;
      const factorycontract = new web3.eth.Contract(
        factoryABI.abi,
        factoryAddress
      );
      const pooladdress: any = await factorycontract.methods
        .getPair(tokenIN, tokenOut)
        .call();
      const poolinstance = new web3.eth.Contract(poolABI.abi, pooladdress);
      const lPoken = amountIn && Math.sqrt(amountIn * amountOut) * 10 ** 18;
      const totalsupply = await poolinstance.methods.totalSupply().call();
      const poolShare =
        lPoken && ((lPoken * 100) / (Number(totalsupply) + lPoken)).toFixed(2);
      return Number(poolShare);
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

  return { handleTokenShare, error };
};

export default useTokenShare;
