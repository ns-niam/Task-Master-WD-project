from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .models import Folder
from .serializer import FolderSerializerModel


class FolderListAPIView(APIView):

    queryset = Folder.objects.all()
    serializer_class = FolderSerializerModel

    def get(self, request, user_id):
        folders = Folder.objects.filter(user_id=user_id)
        serializer = FolderSerializerModel(folders, many=True)
        return Response(serializer.data)

    def post(self, request, user_id):
        request.data['user'] = int(user_id)
        serializer = FolderSerializerModel(data=request.data)
        if serializer.is_valid():
            serializer.save()  # insert into ...
            return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, folder_id):
        try:
            folder = Folder.objects.get(pk=folder_id)
        except Folder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        folder.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
