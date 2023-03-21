from rest_framework import permissions
from rest_framework import generics

from .models import Application, Software
from .serializers import (
    ApplicationSerializer,
    SoftwareSerializer,
)


class ApplicationListView(generics.ListAPIView):
    """Lists all Applications."""

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationRetrieveView(generics.RetrieveAPIView):
    """Retrieves a single Application."""

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class SoftwareListView(generics.ListAPIView):
    """Lists all Software objects."""

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Software.objects.all()
    serializer_class = SoftwareSerializer


class SoftwareRetrieveView(generics.RetrieveAPIView):
    """Retrieves a single Software object."""

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Software.objects.all()
    serializer_class = SoftwareSerializer
