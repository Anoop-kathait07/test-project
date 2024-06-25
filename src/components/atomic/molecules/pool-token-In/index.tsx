import useBalance from "@/custom-hooks/use-balance";
import Types from "@/store/constants/pool";
import { rootReducersState } from "@/store/reducers";
import { setTokenIn, setTokenOut } from "@/store/slices/pool";
import { Box, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PoolTokenIn = (props: any) => {
  const { setIsModalOpen, setBalance } = props;
  const dispatch = useDispatch();
  const { handleBalance } = useBalance();
  const account = useSelector(
    (state: rootReducersState) => state.metaMask.account
  );
  const allTokenData = useSelector(
    (state: rootReducersState) => state.pool.getAllToken
  );
  return (
    <Box p={4}>
      {allTokenData.map((item: any, index: number) => (
        <Box key={index}>
          <Button
            size="large"
            onClick={async () => {
              dispatch(setTokenIn(item));
              setIsModalOpen(false);
              dispatch({
                type: Types.GET_POOL_TOKEN_DATA_FOR_PAIR,
                payload: item.tokenAddress,
              });
              dispatch(setTokenOut(null));
              const value = await handleBalance(item.tokenAddress, account);
              setBalance(value);
            }}
            sx={{
              width: "100%",
              color: "#a2a4b9",
            }}
          >
            {item.tokenSymbol}
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default PoolTokenIn;
