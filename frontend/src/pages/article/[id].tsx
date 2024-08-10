// src/pages/article/[id].tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useArticle } from '@/hooks/usePosts';
import { useUpsertArticle } from '@/hooks/useUpsertArticle';
import { useDeleteArticle } from '@/hooks/useDeleteArticle';
import { Article } from '@/types';

const ArticleDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const articleId = id ? parseInt(id as string, 10) : null;

  const { data: article, error, isLoading } = useArticle(articleId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Article>({
    defaultValues: article || {
      title: '',
      description: '',
      image_url: '',
      link: '',
      publication_date: '',
    },
  });

  const updateArticleMutation = useUpsertArticle();
  const deleteArticleMutation = useDeleteArticle();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const onSubmit = (data: Article) => {
    if (!article) return; // Prevent submission if no article data is available

    setIsUpdating(true);
    setUpdateError(null); // Reset previous error

    updateArticleMutation.mutate(
      { ...article, ...data },
      {
        onSuccess: () => {
          setIsUpdating(false);
          router.push('/'); // Redirect after successful update
        },
        onError: (error: Error) => {
          console.error('Error updating article:', error);
          setIsUpdating(false);
          setUpdateError('Failed to update the article. Please try again.');
        },
      }
    );
  };

  const handleDelete = () => {
    if (!article) return; // Prevent deletion if no article data is available

    setIsDeleting(true);
    setDeleteError(null); // Reset previous error

    deleteArticleMutation.mutate(article.id, {
      onSuccess: () => {
        setIsDeleting(false);
        router.push('/'); // Redirect after successful deletion
      },
      onError: (error: Error) => {
        console.error('Error deleting article:', error);
        setIsDeleting(false);
        setDeleteError('Failed to delete the article. Please try again.');
      },
    });
  };

  React.useEffect(() => {
    if (article) {
      reset(article); // Update form values when article data changes
    }
  }, [article, reset]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error loading article:', error);
    return <div>Error loading article.</div>;
  }
  if (!article) return <div>No article found.</div>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Img
              variant="top"
              src={article.image_url || 'default-image-url.jpg'}
              alt={article.title}
            />
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.description}</Card.Text>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    {...register('title', { required: true })}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    Title is required.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register('description', { required: true })}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    Description is required.
                  </Form.Control.Feedback>
                </Form.Group>

                {updateError && <Alert variant="danger">{updateError}</Alert>}

                <Button variant="primary" type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Updating...
                    </>
                  ) : (
                    'Update Article'
                  )}
                </Button>
              </Form>
              {deleteError && <Alert variant="danger">{deleteError}</Alert>}
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={isDeleting}
                className="mt-3"
              >
                {isDeleting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Deleting...
                  </>
                ) : (
                  'Delete Article'
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleDetail;
