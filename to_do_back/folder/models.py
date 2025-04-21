from django.db import models
from user.models import User


class Folder(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='users',
        null=True,
        blank=True
    )

    def __str__(self):
        return (
            self.name
        )


