import { useState } from "react";
import Web3 from "web3";
import dotenv from "dotenv";
import factoryABI from "@/abi-contracts/factory.json";
import { useDispatch } from "react-redux";
import { LOADER_CLOSE, LOADER_OPEN, SNACKBAR_OPEN } from "@/store/constants";
import { useRouter } from "next/navigation";

dotenv.config();

interface TokenSwapError {
  message: string;
}

let web3: any = new Web3(process.env.NEXT_PUBLIC_RPC_URL);

const useRemoveLiquidity = () => {
  const [error, setError] = useState<TokenSwapError | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRemoveLiquidity = async (
    lptoken: number,
    tokenIn: string,
    tokenOut: string,
    account: string
  ) => {
    try {
      dispatch({ type: LOADER_OPEN });
      web3 = new Web3(window.ethereum);
      const factoryAddress = process.env.NEXT_PUBLIC_APP_FACTORY;
      const factorycontract = new web3.eth.Contract(
        factoryABI.abi,
        factoryAddress
      );
      const removeLiquidityGas= await factorycontract.methods.RemoveLiquidity(tokenIn, tokenOut, lptoken).estimateGas({ from: account });
      await factorycontract.methods
        .RemoveLiquidity(tokenIn, tokenOut, lptoken)
        .send({
          from: account,
          gas: Number (removeLiquidityGas),
        });
      dispatch({ type: LOADER_CLOSE });
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: `Liquidity Removed successfully, you have removed ${lptoken / 10 ** 18} Lptokens`,
        severity: "success",
        variant: "alert",
      });
      router.push('/pool');
    } catch (error: any) {
      dispatch({ type: LOADER_CLOSE });
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: `Sorry! you can't remove 100% of your liquidity`,
        severity: "error",
        variant: "alert",
      });
      console.error("Error Swapping:", error);
      setError({ message: error.message });
    }
  };

  return { handleRemoveLiquidity, error };
};

export default useRemoveLiquidity;
