import { useState } from "react";
import Web3 from "web3";
import dotenv from "dotenv";
import factoryABI from "@/abi-contracts/factory.json";
import { useDispatch } from "react-redux";
import { SNACKBAR_OPEN } from "@/store/constants";
import poolABI from "@/abi-contracts/pool.json";
import tokenABI from "@/abi-contracts/erc20token.json";

dotenv.config();

interface TokenSwapError {
  message: string;
}
let web3: any = new Web3(process.env.NEXT_PUBLIC_RPC_URL);
const useGetTokenShare = () => {
  const [error, setError] = useState<TokenSwapError | null>(null);
  const dispatch = useDispatch();

  const handleGetTokenShare = async (
    tokenIN: string,
    tokenOut: string,
    account: string,
    sharePercentages: any
  ) => {
    console.log(sharePercentages);
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
      const userLpToken = await poolinstance.methods.balanceOf(account).call();
      
      const totalsupply = await poolinstance.methods.totalSupply().call();
      const poolreserve: any = await poolinstance.methods.getReserves().call();
      const token0: any = await poolinstance.methods.token0().call();

      const tokenAInstance = new web3.eth.Contract(tokenABI.abi, tokenIN);
      const tokenBInstance = new web3.eth.Contract(tokenABI.abi, tokenOut);
      const tokenAInDecimals = await tokenAInstance.methods.decimals().call();
      const tokenBInDecimals = await tokenBInstance.methods.decimals().call();

      const sharePercentage =
        ((Number(userLpToken) / (Number(totalsupply)) * sharePercentages) );
      const lpTokenValue = Number(userLpToken) * sharePercentages/100;
      const lpTokenReturning =
        (Number(lpTokenValue) ) / 10 ** 18;
      let reserve0Liquidity;
      let reserve1Liquidity;
      if (tokenIN == token0) {
        reserve0Liquidity =
          ((Number(poolreserve._reserve0) * sharePercentage) /
          10 ** Number(tokenAInDecimals))/100;
        reserve1Liquidity =
          ((Number(poolreserve._reserve1) * sharePercentage) /
          10 ** Number(tokenBInDecimals))/100;
      } else {
        reserve0Liquidity =
          ((Number(poolreserve._reserve1) * sharePercentage) /
          10 ** Number(tokenBInDecimals))/100;
        reserve1Liquidity =
          ((Number(poolreserve._reserve0) * sharePercentage) /
          10 ** Number(tokenAInDecimals))/100;
      }
      const data = {
        reserve0Liquidity,
        reserve1Liquidity,
        lpTokenReturning,
        lpTokenValue,
      };
      return data;
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

  return { handleGetTokenShare, error };
};

export default useGetTokenShare;
