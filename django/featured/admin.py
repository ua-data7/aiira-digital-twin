from django.contrib import admin
from .models import FeaturedContent


class FeaturedContentAdmin(admin.ModelAdmin):
    """Admin config for FeaturedContent model."""

    list_display = ("id", "title", "content_type", "object_id")


admin.site.register(FeaturedContent, FeaturedContentAdmin)