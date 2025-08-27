'use client';
import styles from './bar.module.css';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useEffect, useRef, useState } from 'react';
import { setIsPlay, playNextTrack, playPrevTrack, toggleShuffle } from '../../../store/features/trackSlice';


const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlay);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isLoop, setIsLoop] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.src = currentTrack.track_file;
    audio.load();
    
    const handleCanPlay = () => {
      if (isPlaying) {
        audio.play().catch((error) => console.error('Ошибка воспроизведения:', error));
      }
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
    }

    const handleEnded = () => {
        dispatch(playNextTrack());
    }

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.readyState < 2) {
      return;
    }

    if (isPlaying) {
      audio.play().catch((error) => console.error('Ошибка воспроизведения:', error));
    } else {
      audio.pause();
    }
  }, [isPlaying]);
  
  // Громкость
  useEffect(() => {
      if(audioRef.current) {
          audioRef.current.volume = volume;
      }
  }, [volume]);

  // Луп
  useEffect(() => {
    if(audioRef.current) {
        audioRef.current.loop = isLoop;
    }
  }, [isLoop]);


  // Пауза
  const handlePlayPause = () => {
    if (!currentTrack) return;
    dispatch(setIsPlay(!isPlaying));
  };

  // Перемотка
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
      if(audioRef.current) {
          audioRef.current.currentTime = Number(event.target.value);
      }
  }

  if (!currentTrack) return null;

  return (
    <div className={styles.bar}>
      <audio ref={audioRef} style={{ display: 'none' }} />
      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress_time}>
            {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <input 
            type="range" 
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className={styles.bar__playerProgress}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div
                className={styles.player__btnPrev}
                onClick={() => dispatch(playPrevTrack())}
              >
                <svg className={styles.player__btnPrevSvg}>
                  <use href="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.player__btnPlay, styles.btn)}
                onClick={handlePlayPause}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    href={`/img/icon/sprite.svg#icon-${isPlaying ? 'pause' : 'play'}`}
                  ></use>
                </svg>
              </div>
              <div
                className={styles.player__btnNext}
                onClick={() => dispatch(playNextTrack())}
              >
                <svg className={styles.player__btnNextSvg}>
                  <use href="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.player__btnRepeat, styles.btnIcon)}
                onClick={() => setIsLoop(!isLoop)}
              >
                <svg className={isLoop ? styles.player__btnRepeatSvg_active : styles.player__btnRepeatSvg}>
                  <use href="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classnames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
                onClick={() => dispatch(toggleShuffle())}
              >
                <svg className={isShuffle ? styles.player__btnShuffleSvg_active : styles.player__btnShuffleSvg}>
                  <use href="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use href="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <span className={styles.trackPlay__authorLink}>
                    {currentTrack.name}
                  </span>
                </div>
                <div className={styles.trackPlay__album}>
                  <span className={styles.trackPlay__albumLink}>
                    {currentTrack.author}
                  </span>
                </div>
              </div>
              <div className={styles.trackPlay__dislike}>
                <div
                  className={classnames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classnames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classnames(styles.volume__progress, styles.btn)}>
                <input
                  className={classnames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
