import { all, fork } from 'redux-saga/effects';
import swapSaga from '@/store/sagas/swap/swap.saga';
import poolSaga from '@/store/sagas/pool/pool.saga';
import createPairSaga from '@/store/sagas/create-pair/create-pair.saga';
import chartSaga from '@/store/sagas/chart/chart.saga';

export default function* rootSaga(): any {
    yield all([fork(swapSaga)]);
    yield all([fork(poolSaga)]);
    yield all([fork(createPairSaga)]);
    yield all([fork(chartSaga)]);
}
