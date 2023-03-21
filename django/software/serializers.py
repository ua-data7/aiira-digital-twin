from rest_framework import serializers
from .models import Application, Software


class ApplicationSerializer(serializers.ModelSerializer):
    """DRF serializer for Application model."""

    class Meta:
        model = Application
        fields = "__all__"


class SoftwareSerializer(serializers.ModelSerializer):
    """DRF serializer for Software model."""

    class Meta:
        model = Software
        fields = "__all__"
