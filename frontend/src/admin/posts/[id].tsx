import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Container, Button, Form } from 'react-bootstrap';
import { useArticle } from '@/hooks/usePosts'; // Обновите путь при необходимости

const PostForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: article, isLoading } = useArticle(Number(id));
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: { title: string; content: string }) => {
      if (id) {
        await fetch(`/api/articles/${id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        await fetch('/api/articles/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
    },
    onSuccess: () => {
      router.push('/admin/posts');
    },
  });

  const onSubmit = (data: { title: string; content: string }) => {
    mutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container>
      <h1>{id ? 'Edit Post' : 'Create New Post'}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            {...register('title')}
          />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Content"
            {...register('content')}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? 'Update Post' : 'Create Post'}
        </Button>
      </Form>
    </Container>
  );
};

export default PostForm;
