import axios from 'axios';
import { renderHook, act } from '@testing-library/react-hooks';
import { Article } from '../types';

const BaseAPI = process.env.NEXT_PUBLIC_API_BASE_URL;

// Определяем Mock-объект
const MockArticle: Article = {
  id: 1,
  title: 'Updated',
  link: 'https://www.bbc.com/news/articles/cwy4er50ejro',
  description:
    'Officials say Mr Puigdemont is on the run and have ordered police to set up roadblocks around the city.',
  publication_date: '2024-08-08T14:40:00Z',
  image_url:
    'https://ichef.bbci.co.uk/news/240/cpsprodpb/bb28/live/ebdd9210-5561-11ef-8f0f-0577398c3339.jpg',
};

// Мокируем axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const upsertArticle = async (article: Article): Promise<any> => {
  try {
    let response;
    if (article.id) {
      response = await axios.put(
        `${BaseAPI}/api/articles/${article.id}/`,
        article
      );
      console.log('Update Response Data:', response.data);
    } else {
      response = await axios.post(`${BaseAPI}/api/articles/`, article);
      console.log('Create Response Data:', response.data);
    }

    // Возвращаем все данные из ответа
    return response.data;
  } catch (error) {
    console.error('Error in upsertArticle:', error);
    throw error;
  }
};

describe('useArticle', () => {
  it('should return the correct article object', async () => {
    // Мокируем ответ от axios

    // Вызов хука
    const { result, waitForNextUpdate } = renderHook(() =>
      upsertArticle(MockArticle)
    );

    // Ожидаем обновления хука
    await waitForNextUpdate();

    // Логирование ответа
    console.log('Hook Response:', result.current);
    console.log('Response Data:', MockArticle); // Вывод MockArticle, который является содержимым response.data

    // Проверяем, что функция правильно обработала MockArticle
    expect(mockedAxios.get).toHaveBeenCalledWith(`/api/articles/1`);
    expect(result.current).toEqual(MockArticle);
  });
});
