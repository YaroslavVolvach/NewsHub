import React from 'react';
import styles from './ArticleCard.module.css';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className={styles.articleListItem}>
      <img src={article.image_url} alt={article.image_url} />
      <div className={styles.articleCardContent}>
        <h3 className={styles.articleCardTitle}>{article.title}</h3>
        <p className={styles.articleCardDescription}>{article.description}</p>
        <a href={`article/${article.id}`} className={styles.articleCardLink}>
          Detail
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
