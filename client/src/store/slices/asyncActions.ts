import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance, CancelTokenSource } from 'axios';

let cancelTokenSource: CancelTokenSource | null = null;

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

instance.interceptors.request.use((config) => {
  config.headers.authorization = window.localStorage.getItem('token');
  return config;
});

export const searchAsync = createAsyncThunk(
  'search/searchAsync',
  async (data: { email: string; number: string }, { rejectWithValue }) => {
    // Отменить предыдущий запрос, если он существует
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Cancel previous request');
    }

    // Создать новый токен отмены
    cancelTokenSource = axios.CancelToken.source();


    try {
      
      const response = await instance.post('/api/search', data, {
        cancelToken: cancelTokenSource.token,
      });
      
   
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const cancelSearch = () => {
   // Отменить текущий запрос, если он существует
   if (cancelTokenSource) {
    cancelTokenSource.cancel('Request canceled');
    cancelTokenSource = null;
  }
}


export default instance;
