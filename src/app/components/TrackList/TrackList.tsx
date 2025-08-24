'use client';

import styles from './TrackList.module.css';
import Track from '../Track/Track';
import { Track as TrackType } from '../../../services/api';

interface TrackListProps {
  tracks: TrackType[];
}

export default function TrackList({ tracks }: TrackListProps) {
  //Логика обработки отсутствия массива треков.
  if (!tracks) {
    return <div className={styles.content__playlist}>Загрузка треков...</div>;
  }

  if (tracks.length === 0) {
    return <div className={styles.content__playlist}>Треки не найдены.</div>;
  }

  return (
    <div className={styles.content__playlist}>
      {tracks.map((track) => (
        <div key={track.id} className={styles.playlist__item}>
          <Track {...track} />
        </div>
      ))}
    </div>
  );
}