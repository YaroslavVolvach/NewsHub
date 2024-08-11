import React from 'react';
import styles from './ArticleForm.module.css';

interface ArticleFormProps {
  title: string;
  link: string;
  description: string;
  publicationDate: string;
  imageUrl: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPublicationDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  error: string | null;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  title,
  link,
  description,
  publicationDate,
  imageUrl,
  onTitleChange,
  onLinkChange,
  onDescriptionChange,
  onPublicationDateChange,
  onImageUrlChange,
  onSubmit,
  isSubmitting,
  error,
}) => {
  return (
    <div className={styles.formWrapper}>
      <h3 className={styles.formTitle}>Create Article</h3>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.formLabel}>
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={onTitleChange}
            className={styles.formInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="link" className={styles.formLabel}>
            Link
          </label>
          <input
            id="link"
            type="text"
            value={link}
            onChange={onLinkChange}
            className={styles.formInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.formLabel}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={onDescriptionChange}
            className={styles.formTextarea}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="publicationDate" className={styles.formLabel}>
            Publication Date
          </label>
          <input
            id="publicationDate"
            type="date"
            value={publicationDate}
            onChange={onPublicationDateChange}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="imageUrl" className={styles.formLabel}>
            Image URL
          </label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={onImageUrlChange}
            className={styles.formInput}
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
};

export default ArticleForm;
