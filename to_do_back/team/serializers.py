from rest_framework import serializers
from team.models import Team
class TeamModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"