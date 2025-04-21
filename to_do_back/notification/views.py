from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from notification.serializers import NotificationModelSerializer
from notification.models import Notification

@api_view(["GET", "POST"])
def notification_list(request):
    if request.method == "GET":
        notifications = Notification.objects.all()
        serializer = NotificationModelSerializer(notifications, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = NotificationModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(["GET", "PUT", "DELETE"])
def notification_detail(request, id):
    try:
        notification = Notification.objects.get(id=id)
    except Notification.DoesNotExist as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = NotificationModelSerializer(notification)
        return Response(serializer.data)
    
    elif request.method == "PUT":
        serializer = NotificationModelSerializer(instance=notification, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        notification.delete()
        return Response({'deleted': True}, status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def notifications_users(request, id):
    if request.method == "GET":
        notifications = Notification.objects.filter(user_id = id)
        serializer = NotificationModelSerializer(notifications, many=True)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)