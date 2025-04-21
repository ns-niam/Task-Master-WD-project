from rest_framework import serializers
from notification.models import Notification
class NotificationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"