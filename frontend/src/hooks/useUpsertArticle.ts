import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import axios from 'axios';
import { Article } from '../types';
import { useState } from 'react';

const BaseAPI = process.env.NEXT_PUBLIC_API_BASE_URL;

const updateArticle = async (article: Article): Promise<Article> => {
  const { data } = await axios.put<Article>(
    `${BaseAPI}/api/articles/${article.id}/`,
    article
  );
  return data;
};

const createArticle = async (article: Article): Promise<Article> => {
  const { data } = await axios.post<Article>(
    `${BaseAPI}/api/articles/`,
    article
  );
  return data;
};

const upsertArticle = async (article: Article): Promise<Article> => {
  return article.id ? updateArticle(article) : createArticle(article);
};

export const useUpsertArticle = (
  options: UseMutationOptions<Article, Error, Article> = {}
) => {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const mutation = useMutation({
    mutationFn: upsertArticle,
    ...options,
    onMutate: () => {
      setIsUpdating(true); // Start loading
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
    },
    onSettled: () => {
      setIsUpdating(false); // End loading
    },
  });

  return {
    ...mutation,
    isUpdating,
  };
};
