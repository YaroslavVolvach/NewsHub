import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import axios from 'axios';
import { Article } from '../types';
import refreshAuthLogic from '@/utils/refresh-token';
import { useState } from 'react';

const BaseAPI = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

const updateArticle = async (
  article: Article,
  token: string = ''
): Promise<Article> => {
  let { data, status } = await axios.put<Article>(
    `${BaseAPI}/api/articles/${article.id}/`,
    article,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (status === 401) {
    refreshAuthLogic();
  }
  return data;
};

const createArticle = async (
  article: Article,
  token: string = ''
): Promise<Article> => {
  const { data, status } = await axios.post<Article>(
    `${BaseAPI}/api/articles/`,
    article,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (status === 401) {
    refreshAuthLogic();
  }
  return data;
};

const upsertArticle = async (
  article: Article,
  token: string = ''
): Promise<Article> => {
  return article.id
    ? updateArticle(article, token)
    : createArticle(article, token);
};

interface UseUpsertArticleOptions
  extends UseMutationOptions<Article, Error, Article> {
  token?: string;
}

export const useUpsertArticle = (options: UseUpsertArticleOptions = {}) => {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const mutation = useMutation({
    mutationFn: (article: Article) =>
      upsertArticle(article, options.token || ''),
    ...options,
    onMutate: () => {
      setIsUpdating(true);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
    },
    onSettled: () => {
      setIsUpdating(false);
    },
  });

  return {
    ...mutation,
    isUpdating,
  };
};
