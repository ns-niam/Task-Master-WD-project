# from django.contrib.auth.hashers import make_password, check_password
# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# from django.db import models
# from django.utils.translation import gettext_lazy as _
# from team.models import Team
# from django.utils import timezone
#
#
# class CustomUserManager(BaseUserManager):
#     def create_user(self, username, password=None, **extra_fields):
#         if not username:
#             raise ValueError(_('The Username must be set'))
#         user = self.model(username=username, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user
#
#     def create_superuser(self, username, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#
#         if extra_fields.get('is_staff') is not True:
#             raise ValueError(_('Superuser must have is_staff=True.'))
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError(_('Superuser must have is_superuser=True.'))
#
#         return self.create_user(username, password, **extra_fields)
#
#
# class User(AbstractBaseUser):
#     username = models.CharField(_('Username'), max_length=50, unique=True)
#     name = models.CharField(_('Name'), max_length=50)
#     lastname = models.CharField(_('Last Name'), max_length=50, blank=True)
#     email = models.EmailField(_('Email address'), unique=True)
#     team = models.ForeignKey(
#         Team,
#         on_delete=models.CASCADE,
#         related_name='users',
#         null=True, blank=True
#     )
#     isLeader = models.BooleanField(_('Is Leader'), default=False)
#     photo = models.ImageField(_('Photo'), null=True, blank=True)
#     is_active = models.BooleanField(_('Is active'), default=True)
#     is_staff = models.BooleanField(_('Is staff'), default=False)
#     date_joined = models.DateTimeField(_('Date joined'), default=timezone.now)
#     objects = CustomUserManager()
#
#     USERNAME_FIELD = 'username'
#     REQUIRED_FIELDS = ['email']
#
#     def __str__(self):
#         return self.username
#
#     def get_full_name(self):
#         return self.name
#
#     def get_short_name(self):
#         return self.name
#
#     def has_perm(self, perm, obj=None):
#         return self.is_staff
#
#     def has_module_perms(self, app_label):
#         return self.is_staff
#
#     @property
#     def is_superuser(self):
#         return self.is_staff
#
#     @property
#     def is_anonymous(self):
#         return False
#
#     @property
#     def is_authenticated(self):
#         return True
#
#     def set_password(self, raw_password):
#         self.password = make_password(raw_password)
#
#     def check_password(self, raw_password):
#         return check_password(raw_password, self.password)



from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from team.models import Team


class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if not username:
            raise ValueError(_('The Username must be set'))
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(_('Username'), max_length=50, unique=True)
    name = models.CharField(_('Name'), max_length=50)
    lastname = models.CharField(_('Last Name'), max_length=50, blank=True)
    email = models.EmailField(_('Email address'), unique=True)
    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name='users',
        null=True, blank=True
    )
    isLeader = models.BooleanField(_('Is Leader'), default=False)
    photoUrl = models.CharField(max_length=5555, null=True, blank=True)
    is_active = models.BooleanField(_('Is active'), default=True)
    is_staff = models.BooleanField(_('Is staff'), default=False)
    date_joined = models.DateTimeField(_('Date joined'), default=timezone.now)
    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name
