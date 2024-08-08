from __future__ import absolute_import, unicode_literals
# Это нужно для того, чтобы Celery мог импортировать задачи при запуске Django
import os
from celery import Celery

# Устанавливаем настройки Django для Celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'news_hub.settings')

app = Celery('news_hub')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()