from django.urls import path, re_path
from user.views import UserDetailView
from .views import user_list_by_team, MyTokenObtainPairView, user_detail_by_username, user_list
from rest_framework_simplejwt.views import TokenRefreshView
from . import views



urlpatterns = [
    path('users/team/<int:team_id>', user_list_by_team),
    path('login/', MyTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('users/<str:username>', UserDetailView.as_view()),
    path('user/<str:username>',user_detail_by_username),
    path('users/', user_list),
    path('users/<int:user_id>/', views.user_detail_by_id, name='user_detail_by_id'),
]

