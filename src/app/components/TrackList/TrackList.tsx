'use client';

import styles from './TrackList.module.css';
import Track from '../Track/Track';
import { Track as TrackType } from '../../../services/api';

// 1. Упрощаем интерфейс. Компонент теперь всегда ожидает массив треков.
interface TrackListProps {
  tracks: TrackType[];
}

// 2. Убираем всю внутреннюю логику загрузки (useState, useEffect).
export default function TrackList({ tracks }: TrackListProps) {
  // 3. Добавляем проверку, что tracks - это действительно массив.
  // Это защитит от ошибок, если из Centerblock придет что-то другое (например, undefined пока данные грузятся).
  if (!Array.isArray(tracks)) {
    return <div className={styles.content__playlist}>Загрузка треков...</div>;
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
