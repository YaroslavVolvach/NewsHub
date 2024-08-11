import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Article, Response } from '@/types';

const BaseAPI = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

const fetchArticles = async (page: number, sortBy: string) => {
  const response = await axios.get<Response>(`${BaseAPI}/api/articles/`, {
    params: {
      page,
      ordering: sortBy,
    },
  });
  return response.data;
};

export const useArticles = (page: number, sortBy: string) => {
  return useQuery<Response>({
    queryKey: ['articles', page, sortBy],
    queryFn: () => fetchArticles(page, sortBy),
  });
};

const fetchArticle = async (id: number): Promise<Article> => {
  const response = await axios.get<Article>(`${BaseAPI}/api/articles/${id}/`);
  return response.data;
};

export const useArticle = (id: number | null) => {
  return useQuery<Article, Error>({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(id as number),
    enabled: Number.isFinite(id),
  });
};
