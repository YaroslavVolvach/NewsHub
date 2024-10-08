from pathlib import Path
from decouple import config
from celery.schedules import crontab  

from datetime import timedelta

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Security settings
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='', cast=lambda v: [s.strip() for s in v.split(',')])

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
     "http://localhost:3001",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_ALL_ORIGINS = True


# Installed applications
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'django_celery_beat',
    'django_filters',
    'corsheaders',
    'debug_toolbar',
    'user.apps.UserConfig',
    'articles',
]

# Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URL configuration
ROOT_URLCONF = 'news_hub.urls'

# Templates configuration
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI application
WSGI_APPLICATION = 'news_hub.wsgi.application'

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',  # Change to the database you are using
        'NAME': config('DATABASE_NAME'),
        'USER': config('DATABASE_USER'),
        'PASSWORD': config('DATABASE_PASSWORD'),
        'HOST': config('DATABASE_HOST', default='localhost'),
        'PORT': config('DATABASE_PORT', default='5432'),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.OrderingFilter',
        'rest_framework.filters.SearchFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}

# Celery settings
CELERY_BROKER_URL = 'redis://localhost:6379/0'  
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'  
CELERY_BEAT_SCHEDULE = {
    'fetch-articles-every-hour': {
        'task': 'articles.tasks.fetch_and_save_articles',
        'schedule': crontab(minute=0, hour='*/1'),
    },
}
CELERY_TIMEZONE = 'UTC'
CELERY_BROKER_CONNECTION_RETRY_ON_STARTUP = True

JWT_ACCESS_TOKEN_LIFETIME = config('JWT_ACCESS_TOKEN_LIFETIME', default=5, cast=int)
JWT_REFRESH_TOKEN_LIFETIME = config('JWT_REFRESH_TOKEN_LIFETIME', default=1440, cast=int)
JWT_ROTATE_REFRESH_TOKENS = config('JWT_ROTATE_REFRESH_TOKENS', default=True, cast=bool)
JWT_BLACKLIST_AFTER_ROTATION = config('JWT_BLACKLIST_AFTER_ROTATION', default=True, cast=bool)
JWT_UPDATE_LAST_LOGIN = config('JWT_UPDATE_LAST_LOGIN', default=False, cast=bool)
JWT_ALGORITHM = config('JWT_ALGORITHM', default='HS256')

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=JWT_ACCESS_TOKEN_LIFETIME),
    'REFRESH_TOKEN_LIFETIME': timedelta(minutes=JWT_REFRESH_TOKEN_LIFETIME),
    'ROTATE_REFRESH_TOKENS': JWT_ROTATE_REFRESH_TOKENS,
    'BLACKLIST_AFTER_ROTATION': JWT_BLACKLIST_AFTER_ROTATION,
    'UPDATE_LAST_LOGIN': JWT_UPDATE_LAST_LOGIN,
    'ALGORITHM': JWT_ALGORITHM,
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
}

import os

# Убедитесь, что у вас установлен путь для логов
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'django_debug.log'),
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'django.request': {
            'handlers': ['file', 'console'],
            'level': 'ERROR',
            'propagate': False,
        },
    },
}