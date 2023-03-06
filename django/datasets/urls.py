from django.urls import path
from .views import DatasetListView

urlpatterns = [
    path('', DatasetListView.as_view()),
]