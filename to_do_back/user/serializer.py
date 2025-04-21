from rest_framework import serializers
from team.models import Team
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        return data


class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50, required=False)
    id = serializers.IntegerField(read_only=False)
    name = serializers.CharField(max_length=50, required=False)
    lastname = serializers.CharField(max_length=50, required=False)
    password = serializers.CharField(max_length=20, required=False)
    email = serializers.EmailField(required=False)
    isLeader = serializers.BooleanField(required=False)
    photo = serializers.CharField(max_length=555, required=False)
    team = serializers.SlugRelatedField(slug_field='name', queryset=Team.objects, required=False)


    def create(self, validated_data):
        instance = User(name=validated_data.get('name'), lastname=validated_data.get('lastname'), password=validated_data.get('password'), email=validated_data.get('email'), isLeader=validated_data.get('isLeader'), team_id=validated_data.get('team_id'))
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name")
        instance.lastname = validated_data.get("lastname")
        # instance.password = validated_data.get("password")
        instance.email = validated_data.get("email")
        # instance.isLeader = validated_data.get("isLeader")
        # instance.photo = validated_data.get("photo")
        # instance.team_id = validated_data.get("team_id")
        instance.save()
        return instance


class UserSerializerModel(serializers.ModelSerializer):
    username = serializers.CharField(max_length=50, required=False)
    id = serializers.IntegerField(read_only=False, required=False)
    name = serializers.CharField(max_length=50, required=False)
    lastname = serializers.CharField(max_length=50, required=False)
    password = serializers.CharField(max_length=20, required=False)
    email = serializers.EmailField(required=False)
    isLeader = serializers.BooleanField(required=False)
    photo = serializers.CharField(max_length=5555, required=False)
    team = serializers.SlugRelatedField(slug_field='name', queryset=Team.objects, required=False)

    class Meta:
        model = User
        fields = ("__all__")


class UserSerializer2(serializers.Serializer):
    username = serializers.CharField(max_length=50, required=False)
    id = serializers.IntegerField(read_only=False)
    name = serializers.CharField(max_length=50, required=False)
    lastname = serializers.CharField(max_length=50, required=False)
    password = serializers.CharField(max_length=20, required=False)
    email = serializers.EmailField(required=False)
    isLeader = serializers.BooleanField(required=False)
    photo = serializers.CharField(max_length=555, required=False)
    team = serializers.SlugRelatedField(slug_field='id', queryset=Team.objects, required=False)


    def create(self, validated_data):
        instance = User(name=validated_data.get('name'), lastname=validated_data.get('lastname'), password=validated_data.get('password'), email=validated_data.get('email'), isLeader=validated_data.get('isLeader'), team_id=validated_data.get('team_id'))
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name")
        instance.lastname = validated_data.get("lastname")
        # instance.password = validated_data.get("password")
        instance.email = validated_data.get("email")
        # instance.isLeader = validated_data.get("isLeader")
        # instance.photo = validated_data.get("photo")
        # instance.team_id = validated_data.get("team_id")
        instance.save()
        return instance


class UserSerializerModel2(serializers.ModelSerializer):
    username = serializers.CharField(max_length=50, required=False)
    id = serializers.IntegerField(read_only=False, required=False)
    name = serializers.CharField(max_length=50, required=False)
    lastname = serializers.CharField(max_length=50, required=False)
    password = serializers.CharField(max_length=20, required=False)
    email = serializers.EmailField(required=False)
    isLeader = serializers.BooleanField(required=False)
    photo = serializers.CharField(max_length=5555, required=False)
    team = serializers.SlugRelatedField(slug_field='id', queryset=Team.objects, required=False)

    class Meta:
        model = User
        fields = ("__all__")


class UserSerializerModel3(serializers.ModelSerializer):
    username = serializers.CharField(max_length=50, required=False)
    password = serializers.CharField(max_length=20, required=False)
    email = serializers.EmailField(required=False)

    class Meta:
        model = User
        fields = ("__all__")
