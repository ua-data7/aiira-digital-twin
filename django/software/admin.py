from django.contrib import admin
from .models import Application, Software


class ApplicationAdmin(admin.ModelAdmin):
    """Admin config for Application model."""

    list_display = ("id", "display_name", "application_type")


class SoftwareAdmin(admin.ModelAdmin):
    """Admin config for SoftwareAdmin model."""

    list_display = ("id", "display_name")


admin.site.register(Application, ApplicationAdmin)
admin.site.register(Software, SoftwareAdmin)
