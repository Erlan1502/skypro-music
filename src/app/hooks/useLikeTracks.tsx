import { addLike, removeLike, Track } from '../../services/track/apiTrack';
import {
  addLikedTracks,
  removeLikedTracks,
} from '../../store/features/trackSlice';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { useState } from 'react';
import { AxiosError } from 'axios';

interface returnTypeHook {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
}

export const useLikeTrack = (track: Track | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const dispatch = useAppDispatch();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = async () => {
    if (!track) {
      return;
    }
    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      await actionApi(track._id.toString());
      dispatch(actionSlice(track));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMsg(error.response.data.message || 'Ошибка сервера');
        } else {
          setErrorMsg('Произошла ошибка сети. Попробуйте позже');
        }
      } else {
        setErrorMsg('Неизвестная ошибка');
      }
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
