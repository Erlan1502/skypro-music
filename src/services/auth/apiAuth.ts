import axios from 'axios';
const API_BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

interface authUserProps {
  email: string;
  password: string;
}

export const authUser = (data: authUserProps) => {
  return axios.post(API_BASE_URL + '/user/login', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};
