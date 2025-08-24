'use client';
import styles from './bar.module.css';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useEffect, useRef } from 'react';
import { setIsPlay } from '../../../store/features/trackSlice';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlay);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Этот useEffect отвечает за управление воспроизведением (Play/Pause)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => console.error('Ошибка воспроизведения:', error));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Этот useEffect отвечает за смену трека
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    // Устанавливаем новый источник звука
    audio.src = currentTrack.track_file;
    audio.currentTime = 0; // Сбрасываем плеер на начало

    // Запускаем воспроизведение, если isPlaying === true
    if (isPlaying) {
      audio.play().catch((error) => console.error('Ошибка воспроизведения:', error));
    }
  }, [currentTrack]);


  // Обработчик для кнопки Play/Pause
  const handlePlayPause = () => {
    if (!currentTrack) return;
    dispatch(setIsPlay(!isPlaying));
  };

  // Обработчики для нереализованных кнопок согласно ТЗ
  const handleNotImplemented = () => {
    alert('Еще не реализовано');
  };

  if (!currentTrack) return null;

  return (
    <div className={styles.bar}>
      {/* Скрытый аудио элемент, которым мы управляем */}
      <audio ref={audioRef} style={{ display: 'none' }} />
      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}></div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={handleNotImplemented}>
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
              <div className={styles.player__btnNext} onClick={handleNotImplemented}>
                <svg className={styles.player__btnNextSvg}>
                  <use href="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.player__btnRepeat, styles.btnIcon)}
                onClick={handleNotImplemented}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use href="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classnames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
                onClick={handleNotImplemented}
              >
                <svg className={styles.player__btnShuffleSvg}>
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
