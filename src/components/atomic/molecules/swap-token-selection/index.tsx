import useAmountOut from "@/custom-hooks/use.amount-out";
import { rootReducersState } from "@/store/reducers";
import { setAmountOut, setTokenSelection } from "@/store/slices/swap";
import { Box, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SwapTokenSelection = (props: any) => {
  const { setIsModalOpen } = props;
  const dispatch = useDispatch();
  const { handleAmount } = useAmountOut();
  const allTokenData = useSelector(
    (state: rootReducersState) => state.swap.getAllTokenForPair
  );
  const tokenSelect = useSelector(
    (state: rootReducersState) => state.swap.tokenSelect
  );
  const amountIn = useSelector(
    (state: rootReducersState) => state.swap.amountIn
  );
  return (
    <Box p={4}>
      {allTokenData.map((item: any, index: number) => {
        return (
          <Box key={index}>
            <Button
              size="large"
              onClick={async () => {
                dispatch(setTokenSelection(item));
                setIsModalOpen(false);
                const value = await handleAmount(
                  item.tokenAddress,
                  amountIn,
                  tokenSelect?.tokenAddress
                );
                dispatch(setAmountOut(value));
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

export default SwapTokenSelection;
