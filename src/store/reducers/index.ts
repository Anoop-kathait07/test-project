import { combineReducers } from "@reduxjs/toolkit";
import redirection from "@/store/redirection";
import customizationReducer from "@/store/reducers/customizationReducer";
import snackbarReducer from "@/store/reducers/snackbarReducer";
import CustomizerReducer from "@/store/slices/customizer/CustomizerSlice";
import { reducer as metaMaskReducer } from '@/store/slices/metamask';
import { reducer as swapReducer } from "@/store/slices/swap";
import { reducer as poolReducer } from "@/store/slices/pool";
import { reducer as createPairReducer } from "@/store/slices/create-pair";
import { reducer as removeLiquidityReducer } from "@/store/slices/remove-liquidity";
import { reducer as chartReducer } from "@/store/slices/chart";

export const rootReducer = combineReducers({
  customization: customizationReducer,
  redirection,
  customizer: CustomizerReducer,
  snackbar: snackbarReducer,
  swap: swapReducer,
  pool: poolReducer,
  metaMask: metaMaskReducer,
  createPair: createPairReducer,
  removeLiquidity: removeLiquidityReducer,
  chart: chartReducer
});

export type rootReducersState = ReturnType<typeof rootReducer>;
