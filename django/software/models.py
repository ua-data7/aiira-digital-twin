from django.db import models
from django.utils.translation import gettext_lazy as _


class Application(models.Model):
    """An Application represents a web application or CyVerse app."""

    class ApplicationTypes(models.TextChoices):
        """Choices for application type."""

        VICE = "vice", _("CyVerse VICE app")
        WEB = "web", _("Web app")

    display_name = models.CharField(max_length=100)
    description = models.TextField()
    display_image = models.ImageField(upload_to='software/images', blank=True)
    description_file = models.FileField(upload_to='software/descriptions', blank=True)

    url = models.URLField(max_length=255)
    application_type = models.CharField(max_length=4, choices=ApplicationTypes.choices)


class Software(models.Model):
    """A set of source code, executables, documentation."""

    display_name = models.CharField(max_length=100)
    description = models.TextField()
    display_image = models.ImageField(upload_to='software/images', blank=True)
    description_file = models.FileField(upload_to='datasets/descriptions', blank=True)

    url = models.URLField(max_length=255)
