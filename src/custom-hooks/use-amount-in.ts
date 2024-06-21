import { useState } from "react";
import Web3 from "web3";
import factoryABI from "@/abi-contracts/factory.json";
import dotenv from "dotenv";
import tokenABI from "@/abi-contracts/erc20token.json";
import { SNACKBAR_OPEN } from "@/store/constants";
import { useDispatch } from "react-redux";

dotenv.config();

interface TokenSwapError {
  message: string;
}

let web3: any = new Web3(process.env.NEXT_PUBLIC_RPC_URL);

const useAmountIn = () => {
  const [error, setError] = useState<TokenSwapError | null>(null);
  const dispatch = useDispatch();

  const handleAmountIn = async (
    amountOut: number | null,
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
      const amountOutinWei =
        amountOut && amountOut * 10 ** Number(tokenBInDecimals);
      const AmountIn = await factorycontract.methods
        .AmountIN(tokenIN, tokenOUT, amountOutinWei)
        .call();

      return Number(AmountIn) / 10 ** Number(tokenAInDecimals);
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

  return { handleAmountIn, error };
};

export default useAmountIn;
