import { all, call, put, takeLatest } from "redux-saga/effects";
import { LOADER_CLOSE, LOADER_OPEN, SNACKBAR_OPEN } from "@/store/constants";
import { swapActions } from "@/types/swap";
import { get, post } from "@/services/axios-services";
import URL from "@/services/api-url";
import Types from "@/store/constants/swap";
import {
  setAmountOut,
  setGetAllToken,
  setGetAllTokenForPair,
  setSwapData,
} from "@/store/slices/swap";

//Get-Swap-Data
function* getSwapData(action: swapActions): any {
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(get, URL.GET_SWAP_DATA);
    yield put(setSwapData(result.data));
    yield put({ type: LOADER_CLOSE });
  } catch (e: any) {
    yield put({ type: LOADER_CLOSE });
    yield put({
      type: SNACKBAR_OPEN,
      open: true,
      message: "Something went wrong!",
      severity: "error",
      variant: "alert",
    });
  }
}

export function* getSwapDataRequest() {
  yield takeLatest(Types.GET_SWAP_DATA, getSwapData);
}

//Get-Token-Data
function* getTokenData(action: swapActions): any {
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(get, URL.GET_TOKEN_DATA);
    yield put(setGetAllToken(result.data));
    const res = yield call(
      get,
      `${URL.GET_TOKEN_DATA_FOR_PAIR}/${result.data[0].tokenAddress}`
    );
    yield put(setGetAllTokenForPair(res.data));
    yield put({ type: LOADER_CLOSE });
  } catch (e: any) {
    yield put({ type: LOADER_CLOSE });
    yield put({
      type: SNACKBAR_OPEN,
      open: true,
      message: "Something went wrong!",
      severity: "error",
      variant: "alert",
    });
  }
}

export function* getTokenDataRequest() {
  yield takeLatest(Types.GET_TOKEN_DATA, getTokenData);
}

//Get-Token-Data
function* getTokenForPair(action: swapActions): any {
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(
      get,
      `${URL.GET_TOKEN_DATA_FOR_PAIR}/${action.payload}`
    );
    yield put(setGetAllTokenForPair(result.data));
    yield put({ type: LOADER_CLOSE });
  } catch (e: any) {
    yield put({ type: LOADER_CLOSE });
    yield put({
      type: SNACKBAR_OPEN,
      open: true,
      message: "Something went wrong!",
      severity: "error",
      variant: "alert",
    });
  }
}

export function* getTokenForPairRequest() {
  yield takeLatest(Types.GET_TOKEN_DATA_FOR_PAIR, getTokenForPair);
}

//Get-Amount_out
function* amountOut(action: swapActions): any {
  try {
    const result = yield call(post, URL.GET_AMOUNT_OUT, action.payload);
    yield put(setAmountOut(result.data.amountOut));
  } catch (e: any) {
    yield put({
      type: SNACKBAR_OPEN,
      open: true,
      message: "Something went wrong!",
      severity: "error",
      variant: "alert",
    });
  }
}

export function* getAmountOutRequest() {
  yield takeLatest(Types.GET_AMOUNT_OUT, amountOut);
}

export default function* swapSaga() {
  yield all([
    getTokenDataRequest(),
    getTokenForPairRequest(),
    getAmountOutRequest(),
    getSwapDataRequest()
  ]);
}
