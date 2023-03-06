import requests
import time

from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import generics

from .models import Dataset
from .serializers import DatasetSerializer


class DatasetListView(generics.ListAPIView):
    """
    Lists all Datasets.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer

def format_size(num, suffix='B'):
    for unit in ['','K','M','G','T','P','E','Z']:
        if abs(num) < 1024.0:
            return "%3.1f%s%s" % (num, unit, suffix)
        num /= 1024.0
    return "%.1f %s%s" % (num, 'Yi', suffix)

class DatasetDirectoryView(APIView):
    """
    Lists contents of Dataset directory.
    """

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        """
        Returns all files and folders in specified directory.
        """
    
        path = request.GET.get('path', '/iplant/home/shared/commons_repo/curated/mosaic_raamp2')
        
        query_params = {
            "path": path,
            "limit": 100,
            "offset": 0,
        }

        try:
            url = "https://de.cyverse.org/terrain/filesystem/paged-directory"
            r = requests.get(url, params=query_params)
            r.raise_for_status()

            fileList = []

            for item in r.json()['folders']:

                updated = time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime(item['date-modified']/1000.0))

                fileList.append({
                    "name": item['label'],
                    "last_updated": updated,
                    "type": "folder",
                    "path": item['path'],
                    "id": item['id']
                })
            
            for item in r.json()['files']:
                    
                updated = time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime(item['date-modified']/1000.0))
                size = format_size(item['file-size'])

                fileList.append({
                    "name": item['label'],
                    "last_updated": updated,
                    "size": size,
                    "type": "file",
                    "path": item['path'],
                    "id": item['id']
                })
            
            response = {
                'fileList': fileList,
                'currentPath': path
            }

            return Response(response)

        except Exception as e:
            print(e)
            return HttpResponse(e)
