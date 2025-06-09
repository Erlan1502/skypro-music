import styles from './filter.module.css';
import FilterItem from '../FilterItem/FilterItem';
export default function Filter() {
    return (              <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
        <FilterItem name='исполнителю'/>
        <FilterItem name='году выпуска'/>        
        <FilterItem name='по жанру'/>
    </div>);
   
}