import { rootReducersState } from "@/store/reducers";
import { setIsFirstTokenPrice, setIsSecondTokenPrice, setPoolAmountOut, setTokenOut } from "@/store/slices/pool";
import { Box, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useTokenPrice from "@/custom-hooks/use-token-per-price";
import useIsPair from "@/custom-hooks/use-pair-exist";
import useAmountOut from "@/custom-hooks/use.amount-out";

const PoolTokenOut = (props: any) => {
  const { setIsModalOpen } = props;
  const dispatch = useDispatch();
  const allTokenData = useSelector(
    (state: rootReducersState) => state.pool.getAllTokenForPair
  );
  const { handleTokenPrice } = useTokenPrice();
  const { handleLiquidity } = useIsPair();
  const { handleAmount } = useAmountOut();
  const tokenIn = useSelector((state: rootReducersState) => state.pool.tokenIn);
  const amountIn = useSelector(
    (state: rootReducersState) => state.pool.amountIn
  );
  return (
    <Box p={4}>
      {allTokenData.map((item: any, index: number) => {
        return (
          <Box key={index}>
            <Button
              size="large"
              onClick={async () => {
                dispatch(setTokenOut(item));
                setIsModalOpen(false);
                const isPair = await handleLiquidity(
                  tokenIn.tokenAddress,
                  item.tokenAddress
                );
                if (isPair) {
                  const value1 = await handleTokenPrice(
                    tokenIn.tokenAddress,
                    item.tokenAddress
                  );
                  dispatch(setIsFirstTokenPrice(value1));
                  const value2 = await handleTokenPrice(
                    item.tokenAddress,
                    tokenIn.tokenAddress
                  );
                  dispatch(setIsSecondTokenPrice(value2));
                  const value = await handleAmount(
                    tokenIn.tokenAddress,
                    amountIn,
                    item.tokenAddress
                  );
                  dispatch(setPoolAmountOut(value));
                }
              }}
              sx={{
                width: "100%",
                color: "#a2a4b9",
              }}
            >
              {item.tokenSymbol}
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};

export default PoolTokenOut;
