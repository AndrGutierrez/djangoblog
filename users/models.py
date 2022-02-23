'''User profile model'''
from django.db import models
from django.db.models import ImageField, TextField, OneToOneField, DateTimeField, EmailField
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from cloudinary.models import CloudinaryField


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token_and_profile(sender,
                                  instance=None,
                                  created=False,
                                  **kwargs):
    """Asign an and profile for every user"""
    if created:
        Profile.objects.create(user=instance)


class User(AbstractUser):
    """Custom Admin User Model for authentication"""
    email = EmailField(blank=False, null=False, unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.email


class Profile(models.Model):
    '''User Profile model'''
    user = OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = CloudinaryField("image")
    banner = CloudinaryField("image")
    biography = TextField(blank=True)
    created = DateTimeField(auto_now_add=True)
    modified = DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        """Return username"""
        return self.user.username
