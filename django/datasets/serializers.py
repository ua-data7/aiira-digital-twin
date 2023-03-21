from rest_framework import serializers
from .models import Dataset


class DatasetSerializer(serializers.ModelSerializer):
    """DRF serializer for Dataset model."""

    class Meta:
        model = Dataset
        fields = "__all__"
