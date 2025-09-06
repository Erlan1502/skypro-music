import axios from 'axios';
const API_BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

export interface Track {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string;
  duration_in_seconds: number;
  album: string;
  duration: string;
  liked?: boolean;
  track_file: string;
  stared_user: unknown[];
}

export interface ApiResponse {
  success: boolean;
  data: Track[];
}

export interface Selection {
  success: boolean;
  data: {
    _id: number;
    name: string;
    items: number[];
    owner: number[];
    __v: number;
  };
}

export const getAllTracks = async (): Promise<ApiResponse> => {
  const response = await axios.get(`${API_BASE_URL}/catalog/track/all/`);
  return response.data;
};

export const getTrackById = async (id: string): Promise<Track> => {
  const response = await axios.get(`${API_BASE_URL}/catalog/track/${id}/`);
  return response.data;
};

export const getSelectionTracks = async (id: string): Promise<Selection> => {
  const response = await axios.get(`${API_BASE_URL}/catalog/selection/${id}/`);
  return response.data;
};

export const getFavoriteTracks = async (
  accessToken: string,
): Promise<Track[]> => {
  const response = await axios.get(
    `${API_BASE_URL}/catalog/track/favorite/all/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data.data;
};

export const addLike = async (id: string, accessToken: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/catalog/track/${id}/favorite/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

export const removeLike = async (id: string, accessToken: string) => {
  const response = await axios.delete(
    `${API_BASE_URL}/catalog/track/${id}/favorite/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};
