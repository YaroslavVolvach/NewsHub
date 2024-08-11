// src/utils/refreshToken.ts
import axios from 'axios';
import { createRefreshToken } from 'axios-auth-refresh';

const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = localStorage.getItem('refreshToken');
  return axios
    .post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken })
    .then((response) => {
      localStorage.setItem('accessToken', response.data.access);
      if (failedRequest.response.config.headers) {
        failedRequest.response.config.headers['Authorization'] =
          'Bearer ' + response.data.access;
      }
      return Promise.resolve();
    });
};

const refreshToken = createRefreshToken(refreshAuthLogic);

export default refreshToken;
