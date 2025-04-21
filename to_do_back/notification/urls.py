from django.urls import path
from notification.views import notification_list, notification_detail, notifications_users

urlpatterns = [
    path('notifications/', notification_list),
    path('notifications/<int:id>/', notification_detail),
    path('notifications/users/<int:id>/', notifications_users)
]