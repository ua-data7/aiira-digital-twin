from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class FeaturedContent(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=256, blank=True, null=True)
    
    content_type_limit = models.Q(app_label='datasets', model='dataset') \
        | models.Q(app_label='software', model='software') \
        | models.Q(app_label='software', model='application')

    content_type = models.ForeignKey(ContentType, limit_choices_to=content_type_limit, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "featured content"
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
        ]
    