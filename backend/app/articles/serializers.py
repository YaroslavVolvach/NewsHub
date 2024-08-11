from rest_framework import serializers
from .models import Article

from rest_framework.exceptions import ValidationError
import logging
logger = logging.getLogger('article') 

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'link', 'description', 'publication_date', 'image_url']

    def validate(self, data):
        try:
            super().validate(data)
        except serializers.ValidationError as e:
            logger.error(f"Validation error: {e}")
            raise e
        return data