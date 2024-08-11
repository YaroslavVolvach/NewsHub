from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsAdminUserOrReadOnly
import logging


logger = logging.getLogger(__name__)

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('id')
    serializer_class = ArticleSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['id', 'publication_date', 'title']
    ordering = ['id']
    search_fields = ['title', 'description']
    permission_classes = [IsAdminUserOrReadOnly]

    def create(self, request, *args, **kwargs):
        logger.debug(f"Request data: {request.data}")
        return super().create(request, *args, **kwargs)