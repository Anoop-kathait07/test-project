"use client";
import CreatePairForm from "@/components/atomic/organism/create-pair-form";
import usePool from "@/custom-hooks/use-pool";
import Types from "@/store/constants/create-pair";
import { rootReducersState } from "@/store/reducers";
import { IPoolProps } from "@/types/pool";
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreatePair = () => {
  const dispatch = useDispatch();
  const [balance, setBalance] = useState<any>(0);
  const [balance1, setBalance1] = useState<any>(0);
  const [isTokenShare, setIsTokenShare] = useState<any>(0);
  const tokenIn: any = useSelector(
    (state: rootReducersState) => state.createPair.tokenIn
  );
  const tokenOut = useSelector(
    (state: rootReducersState) => state.createPair.tokenOut
  );
  const account = useSelector(
    (state: rootReducersState) => state.metaMask.account
  );
  const amountIn = useSelector(
    (state: rootReducersState) => state.createPair.amountIn
  );
  const amountOut = useSelector(
    (state: rootReducersState) => state.createPair.amountOut
  );

  useEffect(() => {
    dispatch({ type: Types.GET_CREATE_PAIR_TOKEN_DATA, payload: "" });
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
          <Box>
            <Typography variant="h4" className="gradient-text">
              Create Pair
            </Typography>
          </Box>
          <CreatePairForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            balance={balance}
            setBalance={setBalance}
            balance1={balance1}
            setBalance1={setBalance1}
            setIsTokenShare={setIsTokenShare}
            isTokenShare={isTokenShare}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default CreatePair;
