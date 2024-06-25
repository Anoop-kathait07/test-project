import { useState } from "react";
import Web3 from "web3";
import dotenv from "dotenv";
import tokenABI from "@/abi-contracts/erc20token.json";
import { useDispatch } from "react-redux";
import { SNACKBAR_OPEN } from "@/store/constants";

dotenv.config();

interface TokenSwapError {
  message: string;
}

let web3: any = new Web3(process.env.NEXT_PUBLIC_RPC_URL);

const useBalance = () => {
  const [error, setError] = useState<TokenSwapError | null>(null);
  const dispatch = useDispatch();

  const handleBalance = async (tokenIN: string, account: string) => {
    try {
      web3 = new Web3(window.ethereum);

      const tokenAInstance = new web3.eth.Contract(tokenABI.abi, tokenIN);

      const userbalace = await tokenAInstance.methods.balanceOf(account).call();
      const tokendecimal = await tokenAInstance.methods.decimals().call();
      const userbalanceINeth =
        Number(userbalace) / Math.pow(10, Number(tokendecimal));

      return Promise.resolve(userbalanceINeth);
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

  return { handleBalance, error };
};

export default useBalance;
