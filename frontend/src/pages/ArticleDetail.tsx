import { useParams } from 'react-router-dom';
import { useArticle } from '@/hooks/usePosts';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();

  const numberId = Number(id);
  if (isNaN(numberId)) {
    return (
      <div>
        <p>Incorrect Article ID</p>
      </div>
    );
  }
  const { data: article, isLoading, error } = useArticle(numberId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading article details</p>;
  if (!article) return <p>No article found</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      {article.image_url && <img src={article.image_url} alt={article.title} />}
      <p>{article.description}</p>
      {article.link && (
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      )}
    </div>
  );
};

export default ArticleDetail;
