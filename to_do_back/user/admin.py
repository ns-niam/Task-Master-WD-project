from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'name', 'lastname', 'email', 'team', 'isLeader', 'photoUrl')
    list_filter = ('team', 'isLeader')
    search_fields = ('firstname', 'lastname', 'email')


