import { AxiosError } from 'axios';
import { setAccessToken } from '../store/features/authSlice';
import { refreshTokens } from '../services/auth/apiAuth';
import { AppDispatch } from '../store/store';
export const withReauth = async <T>(
  apiFunction: (token: string) => Promise<T>,
  access: string,
  refresh: string,
  dispatch: AppDispatch,
): Promise<T> => {
  try {
    return await apiFunction(access);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      try {
        const newAccessToken = await refreshTokens(refresh);
        dispatch(setAccessToken(newAccessToken.access));
        return await apiFunction(newAccessToken.access);
      } catch (refreshError) {
        throw refreshError;
      }
    }
    throw error;
  }
};
