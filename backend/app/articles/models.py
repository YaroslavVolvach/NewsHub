from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=255)
    link = models.URLField(unique=True)
    description = models.TextField()
    publication_date = models.DateTimeField(null=True, blank=True)  
    image_url = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return self.title