from django.urls import path
from . import views


urlpatterns = [
    path('user/<int:user_id>/tasks', views.task_list_by_user),
    path('user/<int:user_id>/folder/<int:folder_id>/', views.tasks_by_user_and_folder, name='tasks_by_user_and_folder'),
]