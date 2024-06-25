import { createSlice } from "@reduxjs/toolkit";

interface IPoolStateProps {
  tokenIn: any;
  tokenOut: any;
  amountIn: number | null;
  amountOut: number | null;
  getAllToken: any;
  getAllTokenForPair: any;
  poolData: any;
  isFirstTokenPrice: number;
  isSecondTokenPrice: number;
  balance: number;
}

const initialState: IPoolStateProps = {
  tokenIn: null,
  tokenOut: null,
  amountIn: null,
  amountOut: null,
  getAllToken: [],
  getAllTokenForPair: [],
  poolData: [],
  isFirstTokenPrice: 0,
  isSecondTokenPrice: 0,
  balance: 0
};

const poolSlice = createSlice({
  name: "pool",
  initialState,

  reducers: {
    setTokenIn: (state, action) => {
      state.tokenIn = action.payload;
      return state;
    },
    setTokenOut: (state, action) => {
      state.tokenOut = action.payload;
      return state;
    },
    setPoolAmountIn: (state, action) => {
      state.amountIn = action.payload;
      return state;
    },
    setPoolAmountOut: (state, action) => {
      state.amountOut = action.payload;
      return state;
    },
    setPoolGetAllToken: (state, action) => {
      state.getAllToken = action.payload;
      return state;
    },
    setPoolGetAllTokenForPair: (state, action) => {
      state.getAllTokenForPair = action.payload;
      return state;
    },
    setPoolData: (state, action) => {
      state.poolData = action.payload;
      return state;
    },
    setIsFirstTokenPrice: (state, action) => {
      state.isFirstTokenPrice = action.payload;
      return state;
    },
    setIsSecondTokenPrice: (state, action) => {
      state.isSecondTokenPrice = action.payload;
      return state;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
      return state;
    },
  },
});

export const {
  setTokenIn,
  setTokenOut,
  setPoolAmountIn,
  setPoolAmountOut,
  setPoolGetAllToken,
  setPoolGetAllTokenForPair,
  setPoolData,
  setIsFirstTokenPrice,
  setIsSecondTokenPrice,
  setBalance
} = poolSlice.actions;
export const { reducer } = poolSlice;
