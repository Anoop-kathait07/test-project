import { all, call, put, takeLatest } from "redux-saga/effects";
import { LOADER_CLOSE, LOADER_OPEN, SNACKBAR_OPEN } from "@/store/constants";
import { get, post } from "@/services/axios-services";
import URL from "@/services/api-url";
import { poolActions } from "@/types/pool";
import {
  setPairGetAllToken,
  setPairGetAllTokenForPair,
} from "@/store/slices/create-pair";
import Types from "@/store/constants/create-pair";

//Get-Token-Data
function* getTokenData(action: poolActions): any {
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(get, URL.GET_TOKEN_DATA);
    yield put(setPairGetAllToken(result.data));
    const res = yield call(
      get,
      `${URL.GET_TOKEN_FOR_POOL}/${result.data[0].tokenAddress}`
    );
    yield put(setPairGetAllTokenForPair(res.data));
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
  yield takeLatest(Types.GET_CREATE_PAIR_TOKEN_DATA, getTokenData);
}

//Get-Token-Data
function* getTokenForPair(action: poolActions): any {
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(
      get,
      `${URL.GET_TOKEN_FOR_POOL}/${action.payload}`
    );
    yield put(setPairGetAllTokenForPair(result.data));
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
  yield takeLatest(Types.GET_CREATE_PAIR_TOKEN_DATA_FOR_PAIR, getTokenForPair);
}

//Add-Token
function* addToken(action: poolActions): any {
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(post, URL.ADD_TOKEN, action.payload);
    const res = yield call(get, URL.GET_TOKEN_DATA);
    yield put(setPairGetAllToken(res.data));
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

export function* addTokenRequest() {
  yield takeLatest(Types.ADD_TOKEN, addToken);
}

//Add-Token
function* addTokenForPair(action: any): any {
  try {
    yield put({ type: LOADER_OPEN });
    yield call(post, URL.ADD_TOKEN, action.payload);
    const result = yield call(
      get,
      `${URL.GET_TOKEN_FOR_POOL}/${action.tokenData}`
    );
    yield put(setPairGetAllTokenForPair(result.data));
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

export function* addTokenForPairRequest() {
  yield takeLatest(Types.ADD_TOKEN_FOR_PAIR, addTokenForPair);
}

export default function* createPairSaga() {
  yield all([
    getTokenDataRequest(),
    getTokenForPairRequest(),
    addTokenRequest(),
    addTokenForPairRequest(),
  ]);
}
