import { all, call, put, takeLatest } from "redux-saga/effects";
import { LOADER_CLOSE, LOADER_OPEN, SNACKBAR_OPEN } from "@/store/constants";
import { post } from "@/services/axios-services";
import URL from "@/services/api-url";
import { poolActions } from "@/types/pool";
import Types from "@/store/constants/swap";
import { setChartData } from "@/store/slices/chart";

//Get-Token-Data
function* getChartData(action: poolActions): any {
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(post, URL.GET_CHART_DATA, action.payload);
    const data = result.data;
    const data1 = [{ price: 0, timestamp: "2024-05-19T04:47:00.000Z" }, ...data];
    yield put(setChartData(data1));
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

export function* getChartDataRequest() {
  yield takeLatest(Types.GET_CHART_DATA, getChartData);
}

export default function* chartSaga() {
  yield all([getChartDataRequest()]);
}
