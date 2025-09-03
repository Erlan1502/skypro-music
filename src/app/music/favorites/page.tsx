'use client';

import { useEffect, useState } from 'react';
import Centerblock from '@/components/Centerblock/Centerblock';
import { getFavoriteTracks } from '../../../services/track/apiTrack';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { withReauth } from '../../../utils/withReauth';
import { useRouter } from 'next/navigation';
import { setFavoriteTracks } from '../../../store/features/trackSlice';

export default function FavoritesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!access || !refresh) {
      if (
        typeof window !== 'undefined' &&
        !localStorage.getItem('accessToken')
      ) {
        router.push('/auth/SignIn');
      }
      return;
    }

    const fetchFavoriteTracks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const favoriteTracksData = await withReauth(
          (token) => getFavoriteTracks(token),
          access,
          refresh,
          dispatch,
        );
        dispatch(setFavoriteTracks(favoriteTracksData));
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Не удалось загрузить избранные треки',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteTracks();
  }, [access, refresh, dispatch, router]);

  return (
    <Centerblock
      title="Избранное"
      tracks={favoriteTracks}
      isLoading={isLoading}
      error={error}
    />
  );
}
