import axios from 'axios';
const API_BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

interface authUserProps {
  email: string;
  password: string;
}
interface authUserReturn {
  email: string;
  username: string;
  _id: number;
}
interface SignUpUsers extends authUserProps {
  username: string;
}

interface TokenResponse {
  access: string;
  refresh: string;
}

type accessTokenType = Pick<TokenResponse, 'access'>;

export const signUpUser = (data: SignUpUsers): Promise<authUserReturn> => {
  return axios
    .post(`${API_BASE_URL}/user/signup/`, data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((response) => {
      return response.data.result;
    });
};
export const authUser = (data: authUserProps): Promise<authUserReturn> => {
  return axios
    .post(API_BASE_URL + '/user/login', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((response) => response.data);
};
export const getTokens = (data: authUserProps): Promise<TokenResponse> => {
  return axios
    .post(`${API_BASE_URL}/user/token/`, data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((response) => response.data);
};

export const refreshTokens = (refresh: string): Promise<accessTokenType> => {
  return axios
    .post(
      `${API_BASE_URL}/user/token/refresh/`,
      { refresh },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    )
    .then((response) => response.data);
};

export const clearAuthData = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
