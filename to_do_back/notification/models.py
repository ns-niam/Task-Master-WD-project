from django.db import models
from user.models import User
# Create your models here.


class Notification(models.Model):
    id = models.BigAutoField(primary_key=True)
    message = models.TextField()
    created_at = models.DateField(auto_now_add=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user'
    )
