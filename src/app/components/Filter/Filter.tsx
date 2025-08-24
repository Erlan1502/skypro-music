'use client';
import { useState } from 'react';
import styles from './filter.module.css';
import FilterItem from '../FilterItem/FilterItem';
import classNames from 'classnames';
import { Track } from '../../../services/api';

type FilterKey = 'author' | 'release_date' | 'genre';

interface FilterProps {
  tracks: Track[];
}

export default function Filter({ tracks }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null);
  const [selectedValue, setSelectedValue] = useState<{
    filter: FilterKey | null;
    value: string | null;
  }>({
    filter: null,
    value: null,
  });

  const handleFilterClick = (filterType: FilterKey) => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
  };

  const handleValueClick = (value: string) => {
    if (!activeFilter) return;

    setSelectedValue((prev) => {
      if (prev.filter === activeFilter && prev.value === value) {
        return { filter: null, value: null };
      }
      return { filter: activeFilter, value };
    });
  };

  const getFilterValues = (): string[] => {
    if (!activeFilter) return [];

    return Array.from(
      new Set(
        tracks
          .map((track) => {
            const value = track[activeFilter];
            return value ? value.toString() : '';
          })
          .filter(Boolean),
      ),
    );
  };

  const getFilterName = (type: FilterKey): string => {
    const names: Record<FilterKey, string> = {
      author: 'исполнителю',
      release_date: 'году выпуска',
      genre: 'жанру',
    };
    return names[type];
  };

  const isValueSelected = (value: string): boolean => {
    return (
      selectedValue.filter === activeFilter && selectedValue.value === value
    );
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <FilterItem
        name={getFilterName('author')}
        isActive={activeFilter === 'author'}
        onClick={() => handleFilterClick('author')}
      />
      <FilterItem
        name={getFilterName('release_date')}
        isActive={activeFilter === 'release_date'}
        onClick={() => handleFilterClick('release_date')}
      />
      <FilterItem
        name={getFilterName('genre')}
        isActive={activeFilter === 'genre'}
        onClick={() => handleFilterClick('genre')}
      />
      {activeFilter === 'author' && (
        <div className={styles.filter__list}>
          {getFilterValues().map((value, index) => (
            <div
              key={index}
              className={classNames(styles.filter__list_item, {
                [styles.active]: isValueSelected(value),
              })}
              onClick={() => handleValueClick(value)}
            >
              {value}
            </div>
          ))}
        </div>
      )}

      {activeFilter === 'genre' && (
        <div
          className={classNames(styles.filter__list, styles.filter__list_genre)}
        >
          <div
            className={classNames(styles.filter__list_item, {
              [styles.active]: isValueSelected('Классическая музыка'),
            })}
            onClick={() => handleValueClick('Классическая музыка')}
          >
            Классическая музыка
          </div>
        </div>
      )}

      {activeFilter === 'release_date' && (
        <div
          className={classNames(
            styles.filter__list,
            styles.filter__list_release,
          )}
        >
          <div
            className={classNames(styles.filter__list_item, {
              [styles.active]: isValueSelected('Более новые'),
            })}
            onClick={() => handleValueClick('Более новые')}
          >
            Более новые
          </div>
          <div
            className={classNames(styles.filter__list_item, {
              [styles.active]: isValueSelected('Более старые'),
            })}
            onClick={() => handleValueClick('Более старые')}
          >
            Более старые
          </div>
        </div>
      )}
    </div>
  );
}
