import useBalance from "@/custom-hooks/use-balance";
import Types from "@/store/constants/create-pair";
import { rootReducersState } from "@/store/reducers";
import { setPairTokenIn, setPairTokenOut } from "@/store/slices/create-pair";
import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreatePairTokenIn = (props: any) => {
  const { setIsModalOpen, setBalance } = props;
  const dispatch = useDispatch();
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const { handleBalance } = useBalance();
  const account = useSelector(
    (state: rootReducersState) => state.metaMask.account
  );
  const allTokenData = useSelector(
    (state: rootReducersState) => state.createPair.getAllToken
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
              dispatch({ type: Types.ADD_TOKEN, payload: { tokenAddress } });
              setIsModalOpen(false);
            }}
          >
            Add New Token
          </Button>
        </Grid>
      </Grid>

      {allTokenData.map((item: any, index: number) => (
        <Box key={index}>
          <Button
            size="large"
            onClick={async() => {
              dispatch(setPairTokenIn(item));
              setIsModalOpen(false);
              dispatch({
                type: Types.GET_CREATE_PAIR_TOKEN_DATA_FOR_PAIR,
                payload: item.tokenAddress,
              });
              dispatch(setPairTokenOut(null));
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

export default CreatePairTokenIn;
