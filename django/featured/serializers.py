from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType

from .models import FeaturedContent
from software.models import Application, Software
from datasets.models import Dataset

from software.serializers import ApplicationSerializer, SoftwareSerializer
from datasets.serializers import DatasetSerializer


class FeaturedContentRelatedField(serializers.RelatedField):
    """
    A custom field to use for the `featured_content` generic relationship.
    """

    def to_representation(self, value):
        """
        Serialize featured content based on content type.
        """
        if isinstance(value, Application):
            serializer = ApplicationSerializer(value)
        elif isinstance(value, Software):
            serializer = SoftwareSerializer(value)
        elif isinstance(value, Dataset):
            serializer = DatasetSerializer(value)
        else:
            raise Exception('Unexpected type of tagged object')

        return serializer.data


class FeaturedContentSerializer(serializers.ModelSerializer):
    """DRF serializer for FeaturedContent model."""

    content_object = FeaturedContentRelatedField(read_only=True) 
    content_type = serializers.SlugRelatedField(
        read_only=True,
        slug_field='model'
    )  
    
    class Meta:
        model = FeaturedContent
        fields = ["id", "content_object", "title", "description", "content_type"]
