import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { enableDevTools } from '@/config';
import { rootReducer } from '@/store/reducers';
import rootSaga from '@/store/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: enableDevTools,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
    });
    return middlewares.concat(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);

export default store;
