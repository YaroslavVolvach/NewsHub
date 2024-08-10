// src/types/index.ts
export interface Article {
  id: number;
  title: string;
  link: string;
  description: string;
  publication_date: string;
  image_url: string;
}

export interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}
