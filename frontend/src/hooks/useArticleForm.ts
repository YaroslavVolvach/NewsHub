import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const BaseAPI = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export const useArticleForm = () => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const token = localStorage.getItem('token') || '';

    const formattedPublicationDate = new Date(publicationDate).toISOString();

    try {
      const response = await axios.post(
        `${BaseAPI}/api/articles/`,
        {
          title,
          link,
          description,
          publication_date: formattedPublicationDate, // Use the formatted date
          image_url: imageUrl,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Article created successfully:', response.data);
      router.push('/');
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
};
