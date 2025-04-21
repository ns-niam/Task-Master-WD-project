from django.db import models
from user.models import User
from folder.models import Folder
from team.models import Team


class Task(models.Model):
    folder = models.ForeignKey(
        Folder,
        on_delete=models.CASCADE,
        related_name='tasks',
        blank=True,
        null=True,
        db_column='folder_id'
    )
    deadline = models.DateField()
    title = models.CharField(max_length=255, blank=True, null=True)
    taskText = models.TextField(max_length=1000)
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='tasks',
        null=True,
        blank=True
    )
    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name='tasks',
        null=True,
        blank=True
    )
    # file = models.FileField(upload_to='uploads/')
    def __str__(self):
        return (
            self.title
        )
