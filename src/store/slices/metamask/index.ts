import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IMetaMaskInitialValues {
  account: string;
}

const initialState: IMetaMaskInitialValues = {
  account: '',
};

export const MetaMask = createSlice({
  name: 'MetaMask',
  initialState,
  reducers: {
    getWalletAddress: (state: IMetaMaskInitialValues, action: PayloadAction<string>) => {
      state.account = action.payload;
      return state;
    },
  },
});

export const { getWalletAddress } = MetaMask.actions;
export const { reducer } = MetaMask;
