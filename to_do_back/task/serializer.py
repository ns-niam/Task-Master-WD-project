from rest_framework import serializers
from folder.models import Folder
from team.models import Team
from .models import User, Task


class TaskSerializer(serializers.Serializer):
    folder_id = serializers.PrimaryKeyRelatedField(source='folder', queryset=Folder.objects.all(), required=False)
    folder = serializers.SlugRelatedField(slug_field='name', required=False, queryset=Folder.objects.all())
    deadline = serializers.DateField(required=True)
    title = serializers.CharField(max_length=50, required=True)
    taskText = serializers.CharField(max_length=1000, required=True)
    created_by = serializers.SlugRelatedField('username', queryset=User.objects.all(), required=True)
    team = serializers.SlugRelatedField('id', queryset=Team.objects.all(), required=False)
    # file = serializers.FileField()

    def create(self, validated_data):
        # Implement the logic to create a new Task object based on validated data
        return Task.objects.create(**validated_data)