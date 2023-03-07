import requests
import time

from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import generics

from .models import Dataset
from .serializers import DatasetListSerializer, DatasetRetrieveSerializer


class DatasetListView(generics.ListAPIView):
    """Lists all Datasets."""

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Dataset.objects.all()
    serializer_class = DatasetListSerializer


def format_size(num, suffix="B"):
    """"""
    for unit in ["", "K", "M", "G", "T", "P", "E", "Z"]:
        if abs(num) < 1024.0:
            return "%3.1f%s%s" % (num, unit, suffix)
        num /= 1024.0
    return "%.1f %s%s" % (num, "Yi", suffix)


class DatasetRetrieveView(generics.RetrieveAPIView):
    """ """

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    queryset = Dataset.objects.all()
    serializer_class = DatasetRetrieveSerializer


class DatasetDirectoryView(APIView):
    """Lists contents of Dataset directory."""

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request):
        """
        Returns all files and folders in the specified directory.
        """

        path = request.GET.get(
            "path", "/iplant/home/shared/commons_repo/curated/mosaic_raamp2"
        )

        query_params = {
            "path": path,
            "limit": 100,
            "offset": 0,
        }

        try:
            url = "https://de.cyverse.org/terrain/filesystem/paged-directory"
            res = requests.get(url, params=query_params)
            res.raise_for_status()

            file_list = []

            for item in res.json()["folders"]:
                updated = time.strftime(
                    "%Y-%m-%d %H:%M:%S", time.gmtime(item["date-modified"] / 1000.0)
                )

                file_list.append(
                    {
                        "name": item["label"],
                        "last_updated": updated,
                        "type": "folder",
                        "path": item["path"],
                        "id": item["id"],
                    }
                )

            for item in r.json()["files"]:
                updated = time.strftime(
                    "%Y-%m-%d %H:%M:%S", time.gmtime(item["date-modified"] / 1000.0)
                )

                size = format_size(item["file-size"])

                file_list.append(
                    {
                        "name": item["label"],
                        "last_updated": updated,
                        "size": size,
                        "type": "file",
                        "path": item["path"],
                        "id": item["id"],
                    }
                )

            response = {"fileList": file_list, "currentPath": path}

            return Response(response)

        except Exception as e:
            print(e)
            return HttpResponse(e)
