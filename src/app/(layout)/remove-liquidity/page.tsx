"use client";

import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import RemoveLiquidityForm from "@/components/atomic/organism/remove-luqidity-form";
import useRemoveLiquidity from "@/custom-hooks/use-remove-liquidity";
import { rootReducersState } from "@/store/reducers";

const RemoveLiquidity = () => {
  const initialValues = {
    lpToken: 0,
    lpTokenReturning: 0,
  };

  const tokenIn = useSelector(
    (state: rootReducersState) => state.removeLiquidity.tokenIn
  );
  const tokenOut = useSelector(
    (state: rootReducersState) => state.removeLiquidity.tokenOut
  );
  const account = useSelector(
    (state: rootReducersState) => state.metaMask.account
  );

  const { handleRemoveLiquidity } = useRemoveLiquidity();

  const onSubmit = (values: typeof initialValues): void => {
    handleRemoveLiquidity(
      values.lpTokenReturning,
      tokenIn.tokenAddress,
      tokenOut.tokenAddress,
      account
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
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" className="gradient-text">
              Remove Liquidity
            </Typography>
          </Box>
          <RemoveLiquidityForm
            initialValues={initialValues}
            onSubmit={onSubmit}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default RemoveLiquidity;
