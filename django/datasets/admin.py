from django.contrib import admin
from datasets.models import Dataset


class DatasetAdmin(admin.ModelAdmin):
    list_display = ("display_name", "data_store_path")


admin.site.register(Dataset, DatasetAdmin)
