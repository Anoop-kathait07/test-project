import { createSlice } from "@reduxjs/toolkit";

interface IRemoveLiquidityStateProps {
  tokenIn: any;
  tokenOut: any;
  lpToken: number | null;
}

const initialState: IRemoveLiquidityStateProps = {
  tokenIn: null,
  tokenOut: null,
  lpToken: null,
};

const removeLiquiditySlice = createSlice({
  name: "pool",
  initialState,

  reducers: {
    setRemoveLiquidityTokenIn: (state, action) => {
      state.tokenIn = action.payload;
      return state;
    },
    setRemoveLiquidityTokenOut: (state, action) => {
      state.tokenOut = action.payload;
      return state;
    },
    setLpToken: (state, action) => {
      state.lpToken = action.payload;
      return state;
    },
  },
});

export const {
  setRemoveLiquidityTokenIn,
  setRemoveLiquidityTokenOut,
  setLpToken,
} = removeLiquiditySlice.actions;
export const { reducer } = removeLiquiditySlice;
