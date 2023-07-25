from django.contrib import admin
from datasets.models import Dataset


class DatasetAdmin(admin.ModelAdmin):
    list_display = ("id", "display_name", "data_store_path", "url")


admin.site.register(Dataset, DatasetAdmin)
