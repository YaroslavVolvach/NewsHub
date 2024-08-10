import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Container, Table, Button, Pagination } from 'react-bootstrap';
import { useArticles } from '@/hooks/usePosts'; // Обновите путь при необходимости
import { Article } from '../../types'; // Определите типы для статей

const AdminPostsPage = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data: articles, isLoading } = useArticles(sortOrder, currentPage);

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/articles/${id}/`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articles'], // Исправленный вызов
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container>
      <h1>Manage Posts</h1>
      <Button variant="primary" href="/admin/posts/new">
        Create New Post
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles?.map((article: Article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>
                <Button variant="warning" href={`/admin/posts/${article.id}`}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteMutation.mutate(article.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        />
        <Pagination.Item>{currentPage}</Pagination.Item>
        <Pagination.Next onClick={() => setCurrentPage((prev) => prev + 1)} />
      </Pagination>
    </Container>
  );
};

export default AdminPostsPage;
