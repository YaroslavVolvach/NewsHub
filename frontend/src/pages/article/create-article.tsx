import React from 'react';
import ArticleForm from '@/components/ArticleForm';
import { useArticleForm } from '@/hooks/useArticleForm';

const CreateArticlePage: React.FC = () => {
  const {
    title,
    link,
    description,
    publicationDate,
    imageUrl,
    setTitle,
    setLink,
    setDescription,
    setPublicationDate,
    setImageUrl,
    handleSubmit,
    isSubmitting,
    error,
  } = useArticleForm();

  return (
    <div>
      <ArticleForm
        title={title}
        link={link}
        description={description}
        publicationDate={publicationDate}
        imageUrl={imageUrl}
        onTitleChange={(e) => setTitle(e.target.value)}
        onLinkChange={(e) => setLink(e.target.value)}
        onDescriptionChange={(e) => setDescription(e.target.value)}
        onPublicationDateChange={(e) => setPublicationDate(e.target.value)}
        onImageUrlChange={(e) => setImageUrl(e.target.value)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </div>
  );
};

export default CreateArticlePage;
