const API_BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

export interface Track {
  _id: number; // исходя из респонса
  name: string;
  author: string;
  release_date: string;
  genre: string;
  duration_in_seconds: number;
  album: string;
  duration: string;
  liked?: boolean;
  track_file: string;
  stared_user: any[];
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
  const response = await fetch(`${API_BASE_URL}/catalog/track/all/`);

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  return response.json();
};

export const getTrackById = async (id: string): Promise<Track> => {
  const response = await fetch(`${API_BASE_URL}/catalog/track/${id}/`);

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  return response.json();
};

export const getSelectionTracks = async (id: string): Promise<Selection> => {
  const response = await fetch(`${API_BASE_URL}/catalog/selection/${id}/`);

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  return response.json();
};

export const addLike = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/catalog/track/${id}/favorite/`);
  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
};
export const removeLike = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/catalog/track/${id}/favorite/`);
  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
};