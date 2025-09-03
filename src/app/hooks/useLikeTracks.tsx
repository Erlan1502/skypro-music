import { addLike, removeLike, Track } from '../../services/track/apiTrack';
import {
  addLikedTracks,
  removeLikedTracks,
} from '../../store/features/trackSlice';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { withReauth } from '../../utils/withReauth';

interface returnTypeHook {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
}

export const useLikeTrack = (track: Track | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = async () => {
    if (!track || !access || !refresh) {
      setErrorMsg('Требуется авторизация для выполнения этого действия.');
      return;
    }
    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      await withReauth(
        (token) => actionApi(track._id.toString(), token),
        access,
        refresh,
        dispatch,
      );
      dispatch(actionSlice(track));
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorMsg(
        (axiosError.response?.data as { detail?: string })?.detail ||
          axiosError.message ||
          'Произошла ошибка',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};
