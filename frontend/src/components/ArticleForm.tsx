import { useForm } from 'react-hook-form';
import { useUpsertArticle } from '@/hooks/useUpsertArticle';
import { Article } from '../types';

const ArticleForm = ({ article }: { article?: Article }) => {
  const { register, handleSubmit } = useForm<Article>({
    defaultValues: article || {
      title: '',
      link: '',
      description: '',
      publication_date: '',
      image_url: '',
    },
  });
  const mutation = useUpsertArticle();

  const onSubmit = (data: Article) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" {...register('title')} />
      </div>
      <div className="mb-3">
        <label className="form-label">Link</label>
        <input type="url" className="form-control" {...register('link')} />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          {...register('description')}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Publication Date</label>
        <input
          type="datetime-local"
          className="form-control"
          {...register('publication_date')}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input type="url" className="form-control" {...register('image_url')} />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ArticleForm;
