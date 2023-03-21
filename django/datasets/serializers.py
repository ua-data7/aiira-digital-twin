from rest_framework import serializers
from .models import Dataset


class DatasetListSerializer(serializers.ModelSerializer):
    """DRF serializer for a list of datasets."""

    class Meta:
        model = Dataset
        fields = "__all__"


class DatasetRetrieveSerializer(serializers.ModelSerializer):
    """DRF serializer for retrieving one dataset."""

    class Meta:
        model = Dataset
        fields = "__all__"
