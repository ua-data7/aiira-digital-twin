from django.urls import path

from .views import (
    ApplicationListView,
    ApplicationRetrieveView,
    SoftwareListView,
    SoftwareRetrieveView,
)

urlpatterns = [
    path("applications", ApplicationListView.as_view()),
    path("applications/<int:pk>", ApplicationRetrieveView.as_view()),
    path("software", SoftwareListView.as_view()),
    path("software/<int:pk>", SoftwareRetrieveView.as_view()),
]
