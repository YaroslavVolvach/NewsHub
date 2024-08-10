// src/pages/index.tsx
import ArticleList from '@/components/ArticleList';
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
  const { data: response = defaultResponse, isLoading, error } = useArticles(
    page
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading articles</p>;

  return (
    <div>
      <ArticleList
        response={response}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
