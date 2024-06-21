import { createSlice } from "@reduxjs/toolkit";

interface ICreatePairStateProps {
  tokenIn: any;
  tokenOut: any;
  amountIn: number | null;
  amountOut: number | null;
  getAllToken: any;
  getAllTokenForPair: any;
}

const initialState: ICreatePairStateProps = {
  tokenIn: null,
  tokenOut: null,
  amountIn: null,
  amountOut: null,
  getAllToken: [],
  getAllTokenForPair: [],
};

const createPairSlice = createSlice({
  name: "create-pair",
  initialState,

  reducers: {
    setPairTokenIn: (state, action) => {
      state.tokenIn = action.payload;
      return state;
    },
    setPairTokenOut: (state, action) => {
      state.tokenOut = action.payload;
      return state;
    },
    setPairAmountIn: (state, action) => {
      state.amountIn = action.payload;
      return state;
    },
    setPairAmountOut: (state, action) => {
      state.amountOut = action.payload;
      return state;
    },
    setPairGetAllToken: (state, action) => {
      state.getAllToken = action.payload;
      return state;
    },
    setPairGetAllTokenForPair: (state, action) => {
      state.getAllTokenForPair = action.payload;
      return state;
    },
  },
});

export const {
  setPairTokenIn,
  setPairTokenOut,
  setPairAmountIn,
  setPairAmountOut,
  setPairGetAllToken,
  setPairGetAllTokenForPair,
} = createPairSlice.actions;
export const { reducer } = createPairSlice;
