import { useMutation } from 'react-query';
import axios from 'axios';

const BaseAPI = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

interface LoginFormInputs {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  isAdmin: boolean;
}

export const useLogin = () => {
  return useMutation(async (data: LoginFormInputs) => {
    const response = await axios.post<LoginResponse>(
      `${BaseAPI}/user/api/token/`,
      data
    );
    return response.data;
  });
};
