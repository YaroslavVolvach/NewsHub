import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import axios from 'axios';
import refreshAuthLogic from '@/utils/refresh-token';
import { useState } from 'react';

const BaseAPI = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

const deleteArticle = async (articleId: number, token: string) => {
  try {
    const { status } = await axios.delete(
      `${BaseAPI}/api/articles/${articleId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (status === 401) {
      refreshAuthLogic();
    }
  } catch (error) {
    throw new Error('Failed to delete the article');
  }
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, token }: { articleId: number; token: string }) =>
      deleteArticle(articleId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

interface UseDeleteArticleOptions
  extends UseMutationOptions<
    void,
    Error,
    { articleId: number; token: string }
  > {}
