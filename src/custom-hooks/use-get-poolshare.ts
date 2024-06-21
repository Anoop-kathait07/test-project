import { useState } from "react";
import Web3 from "web3";
import factoryABI from "@/abi-contracts/factory.json";
import dotenv from "dotenv";
import poolABI from "@/abi-contracts/pool.json";
import { useDispatch } from "react-redux";
import { SNACKBAR_OPEN } from "@/store/constants";
import tokenABI from "@/abi-contracts/erc20token.json";

dotenv.config();

interface TokenSwapError {
  message: string;
}
let web3: any = new Web3(process.env.NEXT_PUBLIC_RPC_URL);
const useGetPoolShare = () => {
  const [error, setError] = useState<TokenSwapError | null>(null);
  const dispatch = useDispatch();

  const handlePoolShare = async (
    address: string,
    tokenIN: any,
    tokenOUT: string
  ) => {
    try {
      web3 = new Web3(window.ethereum);
      const factoryAddress = process.env.NEXT_PUBLIC_APP_FACTORY;

      const factorycontract = new web3.eth.Contract(
        factoryABI.abi,
        factoryAddress
      );
      const pooladdress: any = await factorycontract.methods
        .getPair(tokenIN, tokenOUT)
        .call();

      const poolinstance = new web3.eth.Contract(poolABI.abi, pooladdress);
      const totalsupply = await poolinstance.methods.totalSupply().call();
      const LpToken = await poolinstance.methods.balanceOf(address).call();
      const poolShare = (Number(LpToken) * 100) / Number(totalsupply);
      const poolreserve: any = await poolinstance.methods.getReserves().call();
      const token0 = await poolinstance.methods.token0().call();

      const tokenAInstance = new web3.eth.Contract(tokenABI.abi, tokenIN);
      const tokenBInstance = new web3.eth.Contract(tokenABI.abi, tokenOUT);
      const tokenAInDecimals = await tokenAInstance.methods.decimals().call();
      const tokenBInDecimals = await tokenBInstance.methods.decimals().call();

      let reserve0Liquidity;
      let reserve1Liquidity;
      if (tokenIN == token0) {
        reserve0Liquidity =
          ((Number(poolreserve._reserve0) * poolShare) /
          10 ** Number(tokenAInDecimals))/100;
        reserve1Liquidity =
          ((Number(poolreserve._reserve1) * poolShare) /
          10 ** Number(tokenBInDecimals))/100;
      } else {
        reserve0Liquidity =
          ((Number(poolreserve._reserve1) * poolShare) /
          10 ** Number(tokenBInDecimals))/100;
        reserve1Liquidity =
          ((Number(poolreserve._reserve0) * poolShare) /
          10 ** Number(tokenAInDecimals))/100;
      }

      const LpTokenData = Number (LpToken) / 10 ** 18;
      const data = {
        LpToken: LpTokenData,
        poolShare,
        reserve0Liquidity,
        reserve1Liquidity,
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
      setError({ message: error.message });
    }
  };

  return { handlePoolShare, error };
};

export default useGetPoolShare;
