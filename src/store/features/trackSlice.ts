import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackProps } from '@/components/Track/Track';

type initialStateType = {
  currentTrack: TrackProps | null;
};

const initialState: initialStateType = {
  currentTrack: null,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackProps>) => {
      state.currentTrack = action.payload;
    },
  },
});

export const { setCurrentTrack } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
