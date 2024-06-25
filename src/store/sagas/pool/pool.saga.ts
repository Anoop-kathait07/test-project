import { all, call, put, takeLatest } from "redux-saga/effects";
import { LOADER_CLOSE, LOADER_OPEN, SNACKBAR_OPEN } from "@/store/constants";
import { get } from "@/services/axios-services";
import URL from "@/services/api-url";
import {
  setPoolData,
  setPoolGetAllToken,
  setPoolGetAllTokenForPair,
} from "@/store/slices/pool";
import Types from "@/store/constants/pool";
import { poolActions } from "@/types/pool";

//Get-Pool-Data
function* getPoolData(action: poolActions): any {
  try {
    yield put({ type: LOADER_OPEN });
    yield put(setPoolData([]));
    const result = yield call(get, `${URL.GET_POOL_DATA}/${action.payload}`);
    yield put(setPoolData(result.data));
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

export function* getPoolDataRequest() {
  yield takeLatest(Types.GET_POOL_DATA, getPoolData);
}

//Get-Token-Data
function* getTokenData(action: poolActions): any {
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(get, URL.GET_TOKEN_DATA);
    yield put(setPoolGetAllToken(result.data));
    const res = yield call(
      get,
      `${URL.GET_TOKEN_DATA_FOR_PAIR}/${result.data[0].tokenAddress}`
    );
    yield put(setPoolGetAllTokenForPair(res.data));
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
  yield takeLatest(Types.GET_POOL_TOKEN_DATA, getTokenData);
}

//Get-Token-Data
function* getTokenForPair(action: poolActions): any {
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(
      get,
      `${URL.GET_TOKEN_DATA_FOR_PAIR}/${action.payload}`
    );
    yield put(setPoolGetAllTokenForPair(result.data));
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
  yield takeLatest(Types.GET_POOL_TOKEN_DATA_FOR_PAIR, getTokenForPair);
}

export default function* poolSaga() {
  yield all([
    getTokenDataRequest(),
    getTokenForPairRequest(),
    getPoolDataRequest(),
  ]);
}
