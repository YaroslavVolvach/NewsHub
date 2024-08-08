from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'link', 'image_url', 'publication_date')
    search_fields = ('title', 'description')
    list_filter = ('publication_date',)  
    ordering = ('-publication_date',) 
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'link', 'image_url', 'publication_date')
        }),
    )