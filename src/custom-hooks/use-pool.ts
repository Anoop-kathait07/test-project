import { useState } from "react";
import Web3 from "web3";
import factoryABI from "@/abi-contracts/factory.json";
import dotenv from "dotenv";
import tokenABI from "@/abi-contracts/erc20token.json";
import { LOADER_CLOSE, LOADER_OPEN, SNACKBAR_OPEN } from "@/store/constants";
import poolABI from "@/abi-contracts/pool.json";
import { useDispatch } from "react-redux";
import {
  setPoolAmountIn,
  setPoolAmountOut,
  setTokenIn,
  setTokenOut,
} from "@/store/slices/pool";
import {
  setPairAmountIn,
  setPairAmountOut,
  setPairTokenIn,
  setPairTokenOut,
} from "@/store/slices/create-pair";

dotenv.config();

interface TokenSwapError {
  message: string;
}

let web3: any = new Web3(process.env.NEXT_PUBLIC_RPC_URL);

const usePool = () => {
  const [error, setError] = useState<TokenSwapError | null>(null);
  const dispatch = useDispatch();

  const handlePool = async (
    tokenIN: string,
    tokenOUT: string,
    amountIN: number | null,
    amountOut: number | null,
    account: string,
    tokenInName: string,
    tokenOutName: string,
    setBalance: any,
    setBalance1: any,
    setIsTokenShare: any
  ) => {
    try {
      dispatch({ type: LOADER_OPEN });
      web3 = new Web3(window.ethereum);
      const factoryAddress = process.env.NEXT_PUBLIC_APP_FACTORY;

      const factorycontract = new web3.eth.Contract(
        factoryABI.abi,
        factoryAddress
      );
      const ISpairExist = await factorycontract.methods
        .ISpairExist(tokenIN, tokenOUT)
        .call();
      if (ISpairExist) {
        const pooladdress = await factorycontract.methods
          .getPair(tokenIN, tokenOUT)
          .call();
        const poolinstance = await new web3.eth.Contract(
          poolABI.abi,
          pooladdress
        );
        const LpToken = await poolinstance.methods.balanceOf(account).call();
        if (Number(LpToken) / 10 ** 18 == 0) {
          const poolSymbol = await poolinstance.methods.symbol().call();
          await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: pooladdress,
                symbol: poolSymbol,
                decimals: 18,
              },
            },
          });
        }
      }
      const tokenAInstance = new web3.eth.Contract(tokenABI.abi, tokenIN);
      const tokenBOutinstance = new web3.eth.Contract(tokenABI.abi, tokenOUT);
      const tokenAInDecimals = await tokenAInstance.methods.decimals().call();
      const tokenBInDecimals = await tokenBOutinstance.methods
        .decimals()
        .call();
      const inputAinWei =
        amountIN && Math.trunc(amountIN * 10 ** Number(tokenAInDecimals));
      const inputBinWei =
        amountOut && Math.trunc(amountOut * 10 ** Number(tokenBInDecimals));
      const allowancetoken0: any = await tokenAInstance.methods
        .allowance(account, factoryAddress)
        .call();
      const allowancetoken1: any = await tokenBOutinstance.methods
        .allowance(account, factoryAddress)
        .call();
      const approveAGas = await tokenAInstance.methods
        .approve(factoryAddress, inputAinWei)
        .estimateGas({ from: account });
      const approveBGas = await tokenBOutinstance.methods
        .approve(factoryAddress, inputBinWei)
        .estimateGas({ from: account });
      if (
        inputAinWei &&
        Number(allowancetoken0) >= inputAinWei &&
        inputBinWei &&
        Number(allowancetoken1) >= inputBinWei
      ) {
        const addLiquidityGas = await factorycontract.methods
          .addLiquidity(tokenIN, tokenOUT, inputAinWei, inputBinWei)
          .estimateGas({ from: account });
        await factorycontract.methods
          .addLiquidity(tokenIN, tokenOUT, inputAinWei, inputBinWei)
          .send({
            from: account,
            gas: addLiquidityGas,
          });
      } else {
        if (inputAinWei && Number(allowancetoken0) < inputAinWei) {
          await tokenAInstance.methods
            .approve(factoryAddress, inputAinWei)
            .send({
              from: account,
              gas: approveAGas,
            });
        }
        if (inputBinWei && Number(allowancetoken1) < inputBinWei) {
          await tokenBOutinstance.methods
            .approve(factoryAddress, inputBinWei)
            .send({
              from: account,
              gas: approveBGas,
            });
        }
        const addLiquidityGas = await factorycontract.methods
          .addLiquidity(tokenIN, tokenOUT, inputAinWei, inputBinWei)
          .estimateGas({ from: account });
        await factorycontract.methods
          .addLiquidity(tokenIN, tokenOUT, inputAinWei, inputBinWei)
          .send({
            from: account,
            gas: addLiquidityGas,
          });
      }
      dispatch(setPoolAmountIn(0));
      dispatch(setPoolAmountOut(0));
      dispatch(setTokenIn(null));
      dispatch(setTokenOut(null));
      dispatch(setPairAmountIn(0));
      dispatch(setPairAmountOut(0));
      dispatch(setPairTokenIn(null));
      dispatch(setPairTokenOut(null));
      setBalance(0);
      setBalance1(0);
      setIsTokenShare(0);
      dispatch({ type: LOADER_CLOSE });
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: `Added liquidity successfully, you have added ${amountIN} ${tokenInName} and ${amountOut} ${tokenOutName}`,
        severity: "success",
        variant: "alert",
      });
    } catch (error: any) {
      dispatch({ type: LOADER_CLOSE });
      console.log("add liquidity error: ", error);
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

  return { handlePool, error };
};

export default usePool;
