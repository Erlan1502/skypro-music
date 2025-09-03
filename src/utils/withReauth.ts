
import { AxiosError } from "axios";
import { setAccessToken } from "../store/features/authSlice";
import { refreshTokens } from "../services/auth/apiAuth";
import { AppDispatch } from "../store/store";
export const withReauth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  refresh: string,
  dispatch: AppDispatch,
): Promise<T> => {
  try {
    // Пытаемся выполнить запрос
    return await apiFunction('');
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      try {
        const newAccessToken = await refreshTokens(refresh); // Обновляем токен
        dispatch(setAccessToken(newAccessToken.access));
        return await apiFunction(newAccessToken.access);
      } catch (refreshError) {
        // Если обновление токена не удалось, пробрасываем ошибку
        throw refreshError;
      }
    }

    // Если ошибка не 401, пробрасываем её
    throw error;
  }
};
