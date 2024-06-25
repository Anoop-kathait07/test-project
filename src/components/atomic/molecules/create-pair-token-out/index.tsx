import { rootReducersState } from "@/store/reducers";
import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import Types from "@/store/constants/create-pair";
import { useDispatch, useSelector } from "react-redux";
import { setPairTokenOut } from "@/store/slices/create-pair";
import useBalance from "@/custom-hooks/use-balance";

const CreatePairTokenOut = (props: any) => {
  const { setIsModalOpen, setBalance1 } = props;
  const dispatch = useDispatch();
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const { handleBalance } = useBalance();
  const allTokenData = useSelector(
    (state: rootReducersState) => state.createPair.getAllTokenForPair
  );
  const tokenIn: any = useSelector(
    (state: rootReducersState) => state.createPair.tokenIn
  );
  const account = useSelector(
    (state: rootReducersState) => state.metaMask.account
  );
  return (
    <Box p={4}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <input
            type="text"
            className="input-border input-field"
            placeholder="Add New Token Address"
            onChange={(e: any) => {
              setTokenAddress(e.target.value);
            }}
          />
        </Grid>
        <Grid item md={12}>
          <Button
            className="helper-card-button"
            onClick={() => {
              dispatch({
                type: Types.ADD_TOKEN_FOR_PAIR,
                payload: { tokenAddress },
                tokenData: tokenIn.tokenAddress,
              });
              setIsModalOpen(false);
            }}
          >
            Add New Token
          </Button>
        </Grid>
      </Grid>
      {allTokenData.map((item: any, index: number) => {
        return (
          <Box key={index}>
            <Button
              size="large"
              onClick={async () => {
                dispatch(setPairTokenOut(item));
                setIsModalOpen(false);
                const value = await handleBalance(item.tokenAddress, account);
                setBalance1(value);
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

export default CreatePairTokenOut;
