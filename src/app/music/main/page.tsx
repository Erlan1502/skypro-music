'use client';

import { useEffect, useState } from 'react';
import Centerblock from '@/components/Centerblock/Centerblock';
import { getAllTracks, Track } from '../../../services/track/apiTrack';

export default function MainPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const response = await getAllTracks();
        setTracks(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Не удалось загрузить треки',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllTracks();
  }, []);

  return (
    <Centerblock
      title="Треки"
      tracks={tracks}
      isLoading={isLoading}
      error={error}
    />
  );
}
