import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sortOrder = url.searchParams.get('sortOrder') || 'asc';
  const page = parseInt(url.searchParams.get('page') || '1', 10);

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: sortOrder },
    skip: (page - 1) * 10,
    take: 10,
  });

  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  const article = await request.json();
  const newArticle = await prisma.article.create({ data: article });
  return NextResponse.json(newArticle);
}
