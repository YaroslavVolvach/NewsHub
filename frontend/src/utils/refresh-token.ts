import axios from 'axios';
import { RefreshTokenResponse } from '@/types/AirResponses';

const BaseAPI = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

const refreshAuthLogic = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await axios.post<RefreshTokenResponse>(
      `${BaseAPI}/api/token/refresh/`,
      {
        refresh: refreshToken,
      }
    );

    const { access, refresh } = response.data;

    localStorage.setItem('token', access);
    localStorage.setItem('refreshToken', refresh);

    return access;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

export default refreshAuthLogic;
