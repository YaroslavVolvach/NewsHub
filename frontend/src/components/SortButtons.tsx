import React, { useState } from 'react';
import styles from './SortButton.module.css';

interface SortButtonsProps {
  onSortChange: (sortBy: string, sortOrder: string) => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({ onSortChange }) => {
  const [localSortBy, setLocalSortBy] = useState<string>('publication_date');
  const [localSortOrder, setLocalSortOrder] = useState<string>('desc');

  const handleSortByChange = (sortBy: string) => {
    setLocalSortBy(sortBy);
  };

  const handleSortOrderChange = (sortOrder: string) => {
    setLocalSortOrder(sortOrder);
  };

  const applySort = () => {
    onSortChange(localSortBy, localSortOrder);
  };

  return (
    <div className={styles['sort-buttons']}>
      <select
        value={localSortBy}
        onChange={(e) => handleSortByChange(e.target.value)}
        className={styles['sort-select']}
      >
        <option value="publication_date">Date</option>
        <option value="title">Title</option>
      </select>
      <select
        value={localSortOrder}
        onChange={(e) => handleSortOrderChange(e.target.value)}
        className={styles['sort-select']}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button onClick={applySort} className={styles['sort-button']}>
        Sort
      </button>
    </div>
  );
};

export default SortButtons;
