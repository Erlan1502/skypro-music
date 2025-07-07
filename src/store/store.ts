import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { trackSliceReducer } from './features/trackSlice';
import { TypedUseSelectorHook } from 'react-redux';

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      tracks: trackSliceReducer,
    }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the \`RootState\` and \`AppDispatch\` types from the store itself
type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];

// Для старого TS
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
