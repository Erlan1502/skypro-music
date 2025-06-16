import styles from './centerblock.module.css';
import classnames from 'classnames';
import TrackList from '../TrackList/TrackList';
import { trackListData } from '../TrackListData/TrackListData';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
      <Search />
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter tracks={trackListData} />
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
        <TrackList tracks={trackListData} />
        <TrackList tracks={trackListData} />
      </div>
    </div>
  );
}
