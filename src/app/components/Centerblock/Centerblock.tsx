'use client';

import styles from './centerblock.module.css';
import classnames from 'classnames';
import TrackList from '../TrackList/TrackList';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import { Track } from '../../../services/track/apiTrack';

// Определяем props для компонента
interface CenterblockProps {
  tracks: Track[];
  title: string;
  isLoading: boolean;
  error: string | null;
}

export default function Centerblock({
  tracks,
  title,
  isLoading,
  error,
}: CenterblockProps) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={tracks} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classnames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        {isLoading ? (
          <p>Загрузка треков...</p>
        ) : error ? (
          <p>Ошибка: {error}</p>
        ) : (
          <TrackList tracks={tracks} />
        )}
      </div>
    </div>
  );
}
