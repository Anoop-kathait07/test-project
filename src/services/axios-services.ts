import axios from '@/services/axios';

type ApiResponse<T> = Promise<T>;

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const get = <T>(path: string): ApiResponse<T> => {
  return axios
    .get<T>(`${BASE_URL}/${path}`)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

export const post = <T>(path: string, values: any): ApiResponse<T> => {
  return axios
    .post<T>(`${BASE_URL}/${path}`, values)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

export const putRequest = <T>(path: string, values: any): ApiResponse<T> => {
  return axios
    .put<T>(`${BASE_URL}/${path}`, values)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

export const patch = <T>(path: string, values: any): ApiResponse<T> => {
  return axios
    .patch<T>(`${BASE_URL}/${path}`, values)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

export const deleteRequest = <T>(path: string): ApiResponse<T> => {
  return axios
    .delete<T>(`${BASE_URL}/${path}`)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      throw error;
    });
};
