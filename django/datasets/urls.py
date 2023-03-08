from django.urls import path

from .views import (
    DatasetListView,
    DatasetDirectoryView,
    DatasetRetrieveView,
)

urlpatterns = [
    path("", DatasetListView.as_view()),
    path("<int:pk>", DatasetRetrieveView.as_view()),
    path("<int:pk>/directory", DatasetDirectoryView.as_view()),
]
