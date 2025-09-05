'use client';
import {
  setCurrentTrack,
  setCurrentPlaylist,
  setIsPlay,
} from '../../../store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import styles from './track.module.css';
import { Track as TrackProps } from '../../../services/track/apiTrack';
import classNames from 'classnames';
import { useLikeTrack } from '@/hooks/useLikeTracks';

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function Track({
  track,
  tracks,
}: {
  track: TrackProps;
  tracks: TrackProps[];
}) {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlay);
  const { toggleLike, isLike } = useLikeTrack(track);
  const isCurrentTrack = currentTrack?._id === track._id;
  const accessToken = localStorage.getItem('accessToken');
  const handleClick = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentPlaylist(tracks));
    dispatch(setIsPlay(true));
  };
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!accessToken) {
      return;
    }
    toggleLike();
  };
  const getLikeIcon = () => {
    if (!accessToken) {
      return 'icon-dislike';
    }
    return 'icon-like';
  };
  return (
    <div className={styles.playlist__track} onClick={handleClick}>
      <div className={styles.track__title}>
        <div className={styles.track__titleImage}>
          {isCurrentTrack ? (
            <div
              className={classNames(styles.playingDot, {
                [styles.pulsingDot]: isPlaying,
              })}
            />
          ) : (
            <svg className={styles.track__titleSvg}>
              <use href="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          )}
        </div>
        <div className={styles.track__titleText}>{track.name}</div>
      </div>
      <div className={styles.track__author}>{track.author}</div>
      <div className={styles.track__album}>{track.album}</div>
      <div
        className={`${styles.track__time} ${!accessToken ? styles.btnIcon_disabled : ''}`}
        onClick={handleLikeClick}
      >
        <svg
          className={`${styles.track__timeSvg} ${styles.btnIcon} ${track.liked ? styles.liked : ''} ${isLike ? styles.trackPlay__likeSvg : styles.trackPlay__dislikeSvg} `}
        >
          <use xlinkHref={`/img/icon/sprite.svg#${getLikeIcon()}`}></use>
        </svg>
        <span className={styles.track__timeText}>
          {formatDuration(track.duration_in_seconds)}
        </span>
      </div>
    </div>
  );
}
