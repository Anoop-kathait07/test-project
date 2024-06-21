import { useState } from "react";
import Web3 from "web3";

import factoryABI from "@/abi-contracts/factory.json";
import tokenABI from "@/abi-contracts/erc20token.json";
import dotenv from "dotenv";
import { LOADER_CLOSE, LOADER_OPEN, SNACKBAR_OPEN } from "@/store/constants";
import { useDispatch } from "react-redux";
import {
  setAmountIn,
  setAmountOut,
  setTokenSelect,
  setTokenSelection,
} from "@/store/slices/swap";

dotenv.config();

interface TokenSwapError {
  message: string;
}
let web3: any = new Web3(process.env.NEXT_PUBLIC_RPC_URL);

const useTokenSwap = () => {
  const [error, setError] = useState<TokenSwapError | null>(null);
  const dispatch = useDispatch();

  const handleSwap = async (
    tokenIN: string,
    amountIN: number | null,
    tokenOUT: string,
    amountOut: number | null,
    account: string,
    tokenName: string,
    setBalance: any
  ) => {
    try {
      dispatch({ type: LOADER_OPEN });
      web3 = new Web3(window.ethereum);
      const factoryAddress = process.env.NEXT_PUBLIC_APP_FACTORY;

      const factorycontract = new web3.eth.Contract(
        factoryABI.abi,
        factoryAddress
      );
      const tokenAInstance = new web3.eth.Contract(tokenABI.abi, tokenIN);
      const tokenAInDecimals = await tokenAInstance.methods.decimals().call();

      const inputAinWei =
        amountIN && Number(amountIN) * 10 ** Number(tokenAInDecimals);
      const AmountOut = await factorycontract.methods
        .AmountOut(tokenIN, inputAinWei && Math.trunc(inputAinWei), tokenOUT)
        .call();

      const TruncTokenIn = inputAinWei && Math.trunc(inputAinWei);

      const allowance = await tokenAInstance.methods
        .allowance(account, factoryAddress)
        .call();

      const approveAGas = await tokenAInstance.methods
        .approve(factoryAddress, TruncTokenIn)
        .estimateGas({ from: account });

      if (TruncTokenIn && Number(allowance) < TruncTokenIn) {
        await tokenAInstance.methods
          .approve(factoryAddress, TruncTokenIn)
          .send({
            from: account,
            gas: Number(approveAGas),
          });
      }

      const swapGas = await factorycontract.methods
        .swap(TruncTokenIn, tokenIN, tokenOUT, Math.trunc(Number(AmountOut)))
        .estimateGas({ from: account });

      await factorycontract.methods
        .swap(TruncTokenIn, tokenIN, tokenOUT, Math.trunc(Number(AmountOut)))
        .send({
          from: account,
          gas: Number (swapGas),
        });
      dispatch(setAmountIn(0));
      dispatch(setAmountOut(0));
      dispatch(setTokenSelect(null));
      dispatch(setTokenSelection(null));
      setBalance(0);
      dispatch({ type: LOADER_CLOSE });
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: `Swap successful, you have received ${amountOut} ${tokenName}`,
        severity: "success",
        variant: "alert",
      });
    } catch (error: any) {
      dispatch({ type: LOADER_CLOSE });
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

  return { handleSwap, error };
};

export default useTokenSwap;
