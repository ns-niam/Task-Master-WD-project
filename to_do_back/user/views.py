from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializer import (
    UserSerializer,
    UserSerializerModel,
    MyTokenObtainPairSerializer,
    UserSerializer2,
    UserSerializerModel2, UserSerializerModel3
)
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()


class UserDetailView(APIView):

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        serializer = UserSerializerModel(user)
        return Response(serializer.data)

    def put(self, request, username):
        user = get_object_or_404(User, username=username)
        serializer = UserSerializerModel(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET", "POST"])
def user_list_by_team(request, team_id):
    if request.method == "GET":
        users_by_team = User.objects.filter(team_id=team_id)
        serializer = UserSerializer2(users_by_team, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = UserSerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Changed status
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "POST"])
def user_detail_by_username(request, username):
    if request.method == "GET":
        user = User.objects.get(username=username)
        serializer = UserSerializerModel2(user)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = UserSerializerModel2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Changed status
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET", "POST"])
def user_list(request):
    if request.method == "GET":
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = UserSerializerModel2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Changed status
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(["GET"])
def user_detail_by_id(request, user_id):
    if request.method == "GET":
        user = get_object_or_404(User, id=user_id)
        serializer = UserSerializerModel(user)
        return Response(serializer.data)
