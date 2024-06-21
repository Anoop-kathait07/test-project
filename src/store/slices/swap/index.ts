import { createSlice } from "@reduxjs/toolkit";

interface ISwapStateProps {
  tokenSelection: any;
  tokenSelect: any;
  amountIn: number | null;
  amountOut: number | null;
  getAllToken: any;
  getAllTokenForPair: any;
  swapData: any;
}

const initialState: ISwapStateProps = {
  tokenSelection: null,
  tokenSelect: null,
  amountIn: null,
  amountOut: null,
  getAllToken: [],
  getAllTokenForPair: [],
  swapData: []
};

const swapSlice = createSlice({
  name: "swap",
  initialState,

  reducers: {
    setTokenSelection: (state, action) => {
      state.tokenSelection = action.payload;
      return state;
    },
    setTokenSelect: (state, action) => {
      state.tokenSelect = action.payload;
      return state;
    },
    setAmountIn: (state, action) => {
      state.amountIn = action.payload;
      return state;
    },
    setAmountOut: (state, action) => {
      state.amountOut = action.payload;
      return state;
    },
    setGetAllToken: (state, action) => {
      state.getAllToken = action.payload;
      return state;
    },
    setGetAllTokenForPair: (state, action) => {
      state.getAllTokenForPair = action.payload;
      return state;
    },
    setSwapData: (state, action) => {
      state.swapData = action.payload;
      return state;
    }
  },
});

export const {
  setTokenSelection,
  setTokenSelect,
  setAmountIn,
  setAmountOut,
  setGetAllToken,
  setGetAllTokenForPair,
  setSwapData
} = swapSlice.actions;
export const { reducer } = swapSlice;
