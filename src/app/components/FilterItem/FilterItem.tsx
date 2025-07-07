import classNames from 'classnames';
import styles from './filterItem.module.css';

interface FilterItemProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}
export interface TrackProps {
  author: string;
}

export default function FilterItem({
  name,
  isActive,
  onClick,
}: FilterItemProps) {
  return (
    <div
      className={classNames(styles.filter__button, styles.btn, {
        [styles.active]: isActive,
      })}
      onClick={onClick}
    >
      {name}
    </div>
  );
}
