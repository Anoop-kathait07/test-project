import { useState } from "react";
import Web3 from "web3";
import factoryABI from "@/abi-contracts/factory.json";
import dotenv from "dotenv";
import tokenABI from "@/abi-contracts/erc20token.json";
import { useDispatch } from "react-redux";
import { SNACKBAR_OPEN } from "@/store/constants";

dotenv.config();

interface TokenSwapError {
  message: string;
}

let web3: any = new Web3(process.env.NEXT_PUBLIC_RPC_URL);

const useAmountOutPool = () => {
  const [error, setError] = useState<TokenSwapError | null>(null);
  const dispatch = useDispatch();

  const handleAmountOut = async (
    amountIN: number | null,
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

      const tokenAInstance = new web3.eth.Contract(tokenABI.abi, tokenIN);
      const tokenBOutinstance = new web3.eth.Contract(tokenABI.abi, tokenOUT);
      const tokenAInDecimals = await tokenAInstance.methods.decimals().call();
      const tokenBInDecimals = await tokenBOutinstance.methods
        .decimals()
        .call();
      const inputAinWei = amountIN && Math.trunc(amountIN * 10 ** Number(tokenAInDecimals));

      const liquidityOut = await factorycontract.methods
        .getliquidityOutperIn(inputAinWei, tokenIN, tokenOUT)
        .call();
      const value = Number(liquidityOut) / 10 ** Number(tokenBInDecimals);
      return value;
    } catch (error: any) {
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

  return { handleAmountOut, error };
};

export default useAmountOutPool;
