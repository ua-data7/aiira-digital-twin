from django.urls import path

from .views import FeaturedContentListView

urlpatterns = [
    path("featured", FeaturedContentListView.as_view()),
]
