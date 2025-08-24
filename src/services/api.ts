const API_BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

export interface Track {
  id: string;
  title: string;
  titleSpan?: string;
  author: string;
  album: string;
  duration: string;
  liked?: boolean;
  track_file: string;
  duration_in_seconds: number;
}
export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Track[];
}

export const getAllTracks = async (): Promise<Track[]> => {
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
