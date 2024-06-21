import axios from 'axios';
import { redirectTo } from '@/store/actions/redirection';
import LocalStorageService from '@/services/localstorage-services';
import store from '@/store';
import { CLEAR_TOKEN, SNACKBAR_OPEN } from '@/store/constants';

axios.interceptors.request.use(
  (config: any) => {
    const token = LocalStorageService.getAccessToken() || '{}';
    config.headers.Authorization = 'Bearer ' + token;
    return config;
  },
  async (error: any) => {
    await Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async function (error: any) {
    if (!error.response) {
      store.dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: 'Network Error. please check your network connection',
        severity: 'error',
        variant: 'alert',
      });
      return await Promise.reject(error);
    }
    if (error.response.status === 403) {
      // Invalid token
      LocalStorageService.clearToken();
      store.dispatch({ type: CLEAR_TOKEN });
      store.dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: 'Invalid token',
        severity: 'error',
        variant: 'alert',
      });
      store.dispatch(redirectTo('/login'));
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      // No token provided

      LocalStorageService.clearToken();
      store.dispatch({ type: CLEAR_TOKEN });
      store.dispatch(redirectTo('/login'));
      return Promise.reject(error);
    }

    if (error.response.status === 500) {
      store.dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: 'Network Error. please check your network connection',
        severity: 'error',
        variant: 'alert',
      });
      return await Promise.reject(error);
    }

    return await Promise.reject(error.response);
  }
);

export default axios;
