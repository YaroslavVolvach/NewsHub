import feedparser
from celery import shared_task
from django.utils.dateparse import parse_datetime
from .models import Article

@shared_task
def fetch_and_save_articles():
    # URL RSS ленты
    rss_url = 'https://feeds.bbci.co.uk/news/world/rss.xml'

    # Парсим RSS ленту
    feed = feedparser.parse(rss_url)

    # Проходим по каждому элементу
    for entry in feed.entries:
        # Если поле 'published' отсутствует, пропустите запись
        publication_date = parse_datetime(entry.published) if 'published' in entry else None

        # Проверяем, существует ли уже статья с таким же идентификатором
        if not Article.objects.filter(link=entry.link).exists():
            # Создаем новую статью
            Article.objects.create(
                title=entry.title,
                link=entry.link,
                description=entry.description,
                publication_date=publication_date,
                image_url=entry.media_thumbnail[0]['url'] if 'media_thumbnail' in entry else None
            )