from rest_framework import permissions
from rest_framework import generics

from .models import FeaturedContent
from .serializers import FeaturedContentSerializer

class FeaturedContentListView(generics.ListAPIView):
    """Lists all featured content."""

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = FeaturedContent.objects.all()
    serializer_class = FeaturedContentSerializer