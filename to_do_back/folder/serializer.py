from rest_framework import serializers

from user.models import User
from .models import Folder


class FolderSerializerModel(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50, required=True)
    user = serializers.SlugRelatedField(slug_field='id', queryset=User.objects)

    class Meta:
        model = Folder
        fields = ("id", "name", "user")