from django.shortcuts import render
from rest_framework import generics

from .models import Dataset
from .serializers import DatasetSerializer

class DatasetListView(generics.ListAPIView):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer

# class Dataset(generics.RetrieveAPIView):
#     lookup_field = "slug"
#     queryset = Dataset.objects.all()
#     serializer_class = DatasetListSerializer
