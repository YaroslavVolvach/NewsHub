from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings
from celery.schedules import crontab  

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'news_hub.settings')

app = Celery('news_hub')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_schedule = {
    'fetch-articles-every-hour': {
        'task': 'articles.tasks.fetch_and_save_articles',
        'schedule': crontab(minute=0, hour='*/1'),
    },
}
app.conf.timezone = 'UTC'