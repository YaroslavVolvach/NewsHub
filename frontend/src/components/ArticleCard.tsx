// src/components/ArticleCard.tsx
import React from 'react';
import styles from './ArticleCard.module.css';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className={styles.articleCard}>
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className={styles.articleImage}
        />
      )}
      <h2 className={styles.articleTitle}>{article.title}</h2>
      <p className={styles.articleContent}>{article.description}</p>
      <a href={`/article/${article.id}`} className={styles.detailButton}>
        Article Detail
      </a>
    </div>
  );
};

export default ArticleCard;
