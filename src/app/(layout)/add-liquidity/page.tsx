"use client";
import PoolForm from "@/components/atomic/organism/pool-form";
import usePool from "@/custom-hooks/use-pool";
import Types from "@/store/constants/pool";
import { rootReducersState } from "@/store/reducers";
import { setPoolAmountIn, setPoolAmountOut } from "@/store/slices/pool";
import { IPoolProps } from "@/types/pool";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPairAmountIn,
  setPairAmountOut,
  setPairTokenIn,
  setPairTokenOut,
} from "@/store/slices/create-pair";

const Pool = () => {
  const dispatch = useDispatch();
  const [balance, setBalance] = useState<any>(0);
  const [balance1, setBalance1] = useState<any>(0);
  const [isTokenShare, setIsTokenShare] = useState<any>(0);
  const tokenIn: any = useSelector(
    (state: rootReducersState) => state.pool.tokenIn
  );
  const tokenOut = useSelector(
    (state: rootReducersState) => state.pool.tokenOut
  );
  const account = useSelector(
    (state: rootReducersState) => state.metaMask.account
  );
  const amountIn = useSelector(
    (state: rootReducersState) => state.pool.amountIn
  );
  const amountOut = useSelector(
    (state: rootReducersState) => state.pool.amountOut
  );

  useEffect(() => {
    dispatch({ type: Types.GET_POOL_TOKEN_DATA, payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handlePool } = usePool();
  const initialValues: IPoolProps = {
    amountIn: amountIn,
    amountOut: amountOut,
    tokenIn: {
      _id: tokenIn?._id || "",
      name: tokenIn?.tokenSymbol || "",
      walletAddress: tokenIn?.tokenAddress || "",
    },
    tokenOut: {
      _id: tokenOut?._id || "",
      name: tokenOut?.tokenSymbol || "",
      walletAddress: tokenOut?.tokenAddress || "",
    },
  };

  const onSubmit = (values: typeof initialValues): void => {
    handlePool(
      values.tokenIn.walletAddress,
      values.tokenOut.walletAddress,
      values.amountIn,
      values.amountOut,
      account,
      tokenIn?.tokenSymbol,
      tokenOut?.tokenSymbol,
      setBalance,
      setBalance1,
      setIsTokenShare
    );
  };

  const router = useRouter();

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flex: "1 1 auto",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          py: {
            xs: "120px",
            md: "120px",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#17161b",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" className="gradient-text">
              Add Liquidity
            </Typography>
            <Button
              sx={{
                display: { xs: "none", md: "block" },
              }}
              className="helper-card-button"
              size="medium"
              variant="outlined"
              onClick={() => {
                router.push("/create-pair");
                dispatch(setPairAmountIn(null));
                dispatch(setPairAmountOut(null));
                dispatch(setPairTokenIn(null));
                dispatch(setPairTokenOut(null));
              }}
            >
              Create a pair
            </Button>
          </Box>
          <PoolForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            balance={balance}
            setBalance={setBalance}
            setIsTokenShare={setIsTokenShare}
            isTokenShare={isTokenShare}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Pool;
