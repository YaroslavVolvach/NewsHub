import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Article, Response } from '@/types';

const BaseAPI = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchArticles = async (page: number): Promise<Response> => {
  const response = await axios.get<Response>(`${BaseAPI}/api/articles/`, {
    params: { page },
  });
  return response.data;
};

export const useArticles = (page: number) => {
  return useQuery({
    queryKey: ['articles', page],
    queryFn: () => fetchArticles(page),
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
