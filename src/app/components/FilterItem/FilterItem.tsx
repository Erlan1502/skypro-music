import classnames from 'classnames';
import styles from './filterItem.module.css';

interface FilterItemProps {
  name: string;
}
export default function FilterItem({ name }: FilterItemProps){
    return(        
    <div className={classnames(styles.filter__button, styles.btn)}>
          {name}
    </div>);
}