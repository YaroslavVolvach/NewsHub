// src/pages/index.tsx
import ArticleList from '@/components/ArticleList';
import SortButtons from '@/components/SortButtons';
import { useArticles } from '@/hooks/usePosts';
import { useState } from 'react';
import { Response } from '../types';

const defaultResponse: Response = {
  count: 1,
  next: null,
  previous: null,
  results: [],
};

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('publication_date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortTrigger, setSortTrigger] = useState(false);

  const getSortedByValue = () => {
    return sortOrder === 'desc' ? `-${sortBy}` : sortBy;
  };

  const { data: response = defaultResponse, isLoading, error } = useArticles(
    page,
    getSortedByValue()
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSortChange = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setSortTrigger((prev) => !prev);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading articles</p>;

  return (
    <div>
      <SortButtons onSortChange={handleSortChange} />
      <ArticleList
        response={response}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
