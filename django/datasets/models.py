from django.db import models
from django.utils.translation import gettext_lazy as _


class Dataset(models.Model):
    """A Dataset represents a directory on the CyVerse Data Store."""

    class DatasetPermissions(models.TextChoices):
        """Choices for Datset permissions."""

        PUBLIC = "public", _("Public")
        PRIVATE = "private", _("Private")

    display_name = models.CharField(max_length=100)
    description = models.TextField()

    data_store_path = models.CharField(max_length=255)
    permissions = models.CharField(max_length=7, choices=DatasetPermissions.choices)
