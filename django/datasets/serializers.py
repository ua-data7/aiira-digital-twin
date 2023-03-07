from rest_framework import serializers
from .models import Dataset


class DatasetListSerializer(serializers.ModelSerializer):
    """DRF serializer for a list of datasets."""

    class Meta:
        model = Dataset
        fields = ["display_name", "description"]


class DatasetRetrieveSerializer(serializers.ModelSerializer):
    """DRF serializer for retrieving one dataset."""

    class Meta:
        model = Dataset
