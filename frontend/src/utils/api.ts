import axios from 'axios';
import { Article } from '@/types';

// Установите базовый URL для Axios
axios.defaults.baseURL = 'http://localhost:8000'; // Замените на URL вашего бэкэнда

// Функция для получения списка статей
export const fetchArticles = async (
  sortOrder: 'asc' | 'desc',
  page: number
): Promise<Article[]> => {
  const response = await axios.get<{ articles: Article[] }>('/api/articles', {
    params: { sortOrder, page },
  });
  return response.data.articles; // Возвращаем массив статей
};

// Функция для получения одной статьи
export const fetchArticle = async (id: number): Promise<Article> => {
  const response = await axios.get<Article>(`/api/articles/${id}`);
  return response.data;
};

// Функция для создания или обновления статьи
export const upsertArticle = async (article: Article): Promise<Article> => {
  const response = await axios.post<Article>('/api/articles', article);
  return response.data;
};
