import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { RefreshTokenResponse } from '../types/AirResponses';

const BaseAPI = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

const axiosInstance = axios.create({
  baseURL: BaseAPI,
});

// Функция для обновления токенов
const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = localStorage.getItem('refreshToken');
  return axios
    .post<RefreshTokenResponse>(`${BaseAPI}/api/token/refresh/`, {
      refresh: refreshToken,
    })
    .then((response) => {
      localStorage.setItem('accessToken', response.data.access);
      if (failedRequest.response.config.headers) {
        failedRequest.response.config.headers['Authorization'] =
          'Bearer ' + response.data.access;
      }
      return Promise.resolve();
    });
};

// Создаём перехватчик обновления токенов
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

// Добавляем перехватчик для запроса
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавляем перехватчик для ответа
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
