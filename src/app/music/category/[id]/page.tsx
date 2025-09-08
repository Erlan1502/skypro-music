'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Centerblock from '@/components/Centerblock/Centerblock';
import {
  getSelectionTracks,
  getAllTracks,
  Track,
} from '../../../../services/track/apiTrack';

const CATEGORY_TITLES: { [key: string]: string } = {
  '2': 'Плейлист дня',
  '3': 'Танцевальные хиты',
  '4': 'Инди-заряд',
};

export default function CategoryPage() {
  const params = useParams<{ id: string }>();

  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const categoryId = params.id;
    setTitle(CATEGORY_TITLES[categoryId]);

    const fetchCategoryTracks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const selectionResponse = await getSelectionTracks(categoryId);
        const allTracksResponse = await getAllTracks();

        if (
          selectionResponse.data &&
          Array.isArray(selectionResponse.data.items)
        ) {
          const trackIds = new Set(selectionResponse.data.items);
          const filteredTracks = allTracksResponse.data.filter((track) =>
            trackIds.has(track._id),
          );
          setTracks(filteredTracks);
        } else {
          setTracks([]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Не удалось загрузить подборку',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryTracks();
  }, [params.id]);

  return (
    <Centerblock
      title={title}
      tracks={tracks}
      isLoading={isLoading}
      error={error}
    />
  );
}
