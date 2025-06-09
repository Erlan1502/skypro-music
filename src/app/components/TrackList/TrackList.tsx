import styles from './TrackList.module.css';
import Track, { TrackProps } from '../Track/Track';

interface TrackListItem extends TrackProps {
  id: string;
}

interface TrackListProps {
  tracks: TrackListItem[];
}

export default function TrackList({ tracks }: TrackListProps) {
  return (
    <div className={styles.content__playlist}>
      {tracks.map((track) => (
        <div key={track.id} className={styles.playlist__item}>
          <Track 
            title={track.title}
            titleSpan={track.titleSpan}
            author={track.author}
            album={track.album}
            duration={track.duration}
            liked={track.liked}
          />
        </div>
      ))}
    </div>
  );
}