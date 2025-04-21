from django.urls import path
from team.views import team_list, team_detail

urlpatterns = [
    path('teams/', team_list),
    path('teams/<int:id>/', team_detail)
]