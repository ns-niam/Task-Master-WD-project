from django.contrib import admin
from folder.models import Folder


@admin.register(Folder)
class FolderAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user')
    search_fields = ('name',)