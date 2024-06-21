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
const useAmountOut = () => {
  const [error, setError] = useState<TokenSwapError | null>(null);
  const dispatch = useDispatch();

  const handleAmount = async (
    tokenIN: string,
    amountIN: number | null,
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

      const tokenBOutDecimals = await tokenBOutinstance.methods
        .decimals()
        .call();

      const inputAinWei = amountIN && amountIN * 10 ** Number(tokenAInDecimals);

      return new Promise((resolve, reject) => {
        factorycontract.methods
          .AmountOut(tokenOUT, inputAinWei, tokenIN)
          .call()
          .then((AmountOut: any) => {
            resolve(Number(AmountOut) / 10 ** Number(tokenBOutDecimals));
          })
          .catch((error: any) => {
            console.error("Error Swapping:", error);
            dispatch({
              type: SNACKBAR_OPEN,
              open: true,
              message: `Something went wrong`,
              severity: "error",
              variant: "alert",
            });
            setError({ message: error.message });
            reject(error);
          });
      });
    } catch (error: any) {
      console.error("Error Swapping:", error);
      setError({ message: error.message });
    }
  };

  return { handleAmount, error };
};

export default useAmountOut;
