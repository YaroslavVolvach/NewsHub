import React from 'react';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import styles from './ArticleList.module.css';
import { Response } from '../types';

interface ArticleListProps {
  response: Response;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({
  response,
  currentPage,
  onPageChange,
}) => {
  const { count, results } = response;
  const totalPages = Math.ceil(count / 10);

  return (
    <div className={styles.articleListContainer}>
      <div className={styles.articleList}>
        {results.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ArticleList;
