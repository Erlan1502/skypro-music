'use client';
import { setCurrentTrack } from '../../../store/features/trackSlice';
import { useAppDispatch } from '../../../store/store';
import styles from './track.module.css';
import Link from 'next/link';

export interface TrackProps {
  title: string;
  titleSpan?: string;
  author: string;
  album: string;
  duration: string;
  liked?: boolean;
}

export default function Track({
  title,
  titleSpan,
  author,
  album,
  duration,
  liked = false,
}: TrackProps) {
  const dispatch = useAppDispatch();

  const onClickTrack = () => {
    dispatch(
      setCurrentTrack({
        title,
        titleSpan,
        author,
        album,
        duration,
        liked: false,
      }),
    );
  };
  return (
    <div className={styles.playlist__track} onClick={onClickTrack}>
      <div className={styles.track__title}>
        <div className={styles.track__titleImage}>
          <svg className={styles.track__titleSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
          </svg>
        </div>
        <div className={styles.track__titleText}>
          <Link className={styles.track__titleLink} href="">
            {title}
            {titleSpan && (
              <span className={styles.track__titleSpan}>{titleSpan}</span>
            )}
          </Link>
        </div>
      </div>
      <div className={styles.track__author}>
        <Link className={styles.track__authorLink} href="">
          {author}
        </Link>
      </div>
      <div className={styles.track__album}>
        <Link className={styles.track__albumLink} href="">
          {album}
        </Link>
      </div>
      <div className={styles.track__time}>
        <svg
          className={`${styles.track__timeSvg} ${styles.btnIcon} ${liked ? styles.liked : ''}`}
        >
          <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
        </svg>
        <span className={styles.track__timeText}>{duration}</span>
      </div>
    </div>
  );
}
