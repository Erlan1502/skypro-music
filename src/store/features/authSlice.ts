import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type initialStateType = {
  username: string;
  access: string;
  refresh: string;
};

const initialState: initialStateType = {
  username: '',
  access: '',
  refresh: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<initialStateType>) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.access = '';
      state.refresh = '';
      state.username = '';
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
    },
  },
});

export const { setAuth, logout, setAccessToken } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
