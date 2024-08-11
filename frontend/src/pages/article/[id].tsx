import React, { useState, useEffect, useCallback } from 'react';
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
import Link from 'next/link';

const ArticleDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const articleId = id ? parseInt(id as string, 10) : null;
  const [token, setToken] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Get token from localStorage and admin status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = window.localStorage.getItem('token');
      if (typeof storedToken === 'string') {
        setToken(storedToken);
      }
      const adminStatus = localStorage.getItem('isAdmin') === 'true';
      setIsAdmin(adminStatus);
    }
  }, []);

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

  const updateArticleMutation = useUpsertArticle({ token });
  const deleteArticleMutation = useDeleteArticle();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const onSubmit = useCallback(
    (data: Article) => {
      if (!article) return;

      setIsUpdating(true);
      setUpdateError(null);

      updateArticleMutation.mutate(
        { ...article, ...data },
        {
          onSuccess: () => {
            setIsUpdating(false);
            router.push('/');
          },
          onError: (error: Error) => {
            console.error('Error updating article:', error);
            setIsUpdating(false);
            setUpdateError('Failed to update the article. Please try again.');
          },
        }
      );
    },
    [article, updateArticleMutation, router]
  );

  const handleDelete = useCallback(() => {
    if (!article || !token) return;

    setIsDeleting(true);
    setDeleteError(null);

    deleteArticleMutation.mutate(
      { articleId: article.id, token },
      {
        onSuccess: () => {
          setIsDeleting(false);
          router.push('/');
        },
        onError: (error: Error) => {
          console.error('Error deleting article:', error);
          setIsDeleting(false);
          setDeleteError('Failed to delete the article. Please try again.');
        },
      }
    );
  }, [article, deleteArticleMutation, token, router]);

  useEffect(() => {
    if (article) {
      reset(article);
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
              {!isAdmin && (
                <>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.description}</Card.Text>
                </>
              )}
              {article.link && (
                <Link
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-block mt-2"
                >
                  Read More
                </Link>
              )}
              {isAdmin && (
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('title', { required: 'Title is required' })}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      {...register('description', {
                        required: 'Description is required',
                      })}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description?.message}
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
              )}

              {isAdmin && (
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
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleDetail;
