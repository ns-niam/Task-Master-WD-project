import json
from team.serializers import TeamModelSerializer
from team.models import Team
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(["GET", "POST"])
def team_list(request):
    if request.method == "GET":
        teams = Team.objects.all()
        serializer = TeamModelSerializer(teams, many = True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = TeamModelSerializer(
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'err' : 'method not allowed'},
                    status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(["GET", "PUT", "DELETE"])
def team_detail(request, id):
    try:
        team = Team.objects.get(id=id)
    except Team.DoesNotExist as e:
        return Response({'error' : str(e)}, status = status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        serializer = TeamModelSerializer(team)
        return Response(serializer.data)
    
    if request.method == "PUT":
        serializer = TeamModelSerializer(
            instance=team,
            data = request.data
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "DELETE":
        team.delete()
        return Response({"deleted" : True})