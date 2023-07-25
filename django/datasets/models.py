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
    display_image = models.ImageField(upload_to='datasets', blank=True)

    data_store_path = models.CharField(max_length=255, blank=True, null=True)
    url = models.URLField(max_length=255, blank=True, null=True)

    permissions = models.CharField(max_length=7, choices=DatasetPermissions.choices)
    description_file = models.FileField(upload_to='datasets/descriptions', blank=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                name="%(app_label)s_%(class)s_has_source",
                check=(
                    models.Q(data_store_path__isnull=True, url__isnull=False)
                    | models.Q(data_store_path__isnull=False, url__isnull=True)
                ),
                violation_error_message="Dataset must have either 'Data store path' or 'URL' specified."
            )
        ]


