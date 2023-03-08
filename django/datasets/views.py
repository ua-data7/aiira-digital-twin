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
from .helpers import format_size


class DatasetListView(generics.ListAPIView):
    """Lists all Datasets."""

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Dataset.objects.all()
    serializer_class = DatasetListSerializer


class DatasetRetrieveView(generics.RetrieveAPIView):
    """ """

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Dataset.objects.all()
    serializer_class = DatasetRetrieveSerializer


class DatasetDirectoryView(APIView):
    """Lists contents of Dataset directory."""

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        """
        Returns all files and folders in the specified directory.

        See CyVerse Terrain API Documentation:
        https://de.cyverse.org/terrain/docs/index.html#!/filesystem/get_terrain_filesystem_paged_directory
        """

        dataset = Dataset.objects.get(pk=pk)

        path = request.GET.get("path", dataset.data_store_path)

        query_params = {
            "path": path,
            "limit": 100,
            "offset": 0,
        }

        try:
            url = "https://de.cyverse.org/terrain/filesystem/paged-directory"
            res = requests.get(url, params=query_params)
            # res.raise_for_status()
            print(res)

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

            for item in res.json()["files"]:
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

            response = {"file_list": file_list, "current_path": path}

            return Response(response)

        except requests.exceptions.RequestException as e:  # This is the correct syntax
            raise (e)
            # print(e)
            # return HttpResponse(e)
