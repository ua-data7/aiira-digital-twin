from django.urls import path
from .views import DatasetListView, DatasetDirectoryView

urlpatterns = [
    path("", DatasetListView.as_view()),
    path("directory", DatasetDirectoryView.as_view()),
]
