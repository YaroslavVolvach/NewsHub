import { useRouter } from 'next/router';
import { useArticle } from '@/hooks/usePosts';

const ArticlePage = () => {
  const { query } = useRouter();
  const { id } = query;
  const { data: article, isLoading, error } = useArticle(Number(id));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading article</p>;

  return (
    <div>
      <h1>{article?.title}</h1>
      <p>{article?.content}</p>
    </div>
  );
};

export default ArticlePage;
