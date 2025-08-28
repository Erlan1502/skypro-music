import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track as TrackProps } from '../../services/api';

type initialStateType = {
  currentTrack: TrackProps | null;
  isPlay: boolean;
  playlist: TrackProps[];
  shuffledPlaylist: TrackProps[];
  isShuffle: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackProps>) => {
      state.currentTrack = action.payload;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackProps[]>) => {
      state.playlist = action.payload;
    },
    playNextTrack: (state) => {
        const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist;
        const currentIndex = playlist.findIndex(track => track._id === state.currentTrack?._id);
        const nextIndex = currentIndex + 1;
        if (nextIndex < playlist.length) {
            state.currentTrack = playlist[nextIndex];
            state.isPlay = true;
        }
    },
    playPrevTrack: (state) => {
        const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist;
        const currentIndex = playlist.findIndex(track => track._id === state.currentTrack?._id);
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            state.currentTrack = playlist[prevIndex];
            state.isPlay = true;
        }
    },
    toggleShuffle: (state) => {
        state.isShuffle = !state.isShuffle;
        if (state.isShuffle) {
            const shuffled = [...state.playlist].sort(() => Math.random() - 0.5);
            state.shuffledPlaylist = shuffled;
        }
    }
  },
});

export const { setCurrentTrack, setCurrentPlaylist, setIsPlay, playNextTrack, playPrevTrack, toggleShuffle } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
