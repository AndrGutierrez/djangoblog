from rest_framework import serializers
from .models import Profile
from users.models import User
from django.contrib.auth.hashers import make_password
from posts.serializers import PostSerializer


class ProfileSerializer(serializers.ModelSerializer):
    """User Profile model JSON serializer"""
    class Meta:
        model = Profile
        ordering = ['-id']
        fields = ('id', 'biography', 'profile_picture', 'banner', 'created',
                  'modified')


class UserSerializer(serializers.ModelSerializer):
    """User model JSON serializer"""
    # StringRelatedField may be used to represent the target of the relationship using its __str__ method.
    profile = ProfileSerializer(many=False, read_only=True)
    posts = PostSerializer(many=True, read_only=True)

    class Meta:
        model = User
        ordering = ['-id']
        fields = ('id', 'password', 'last_login', 'is_superuser', 'username',
                  'first_name', 'last_name', 'email', 'is_staff', 'is_active',
                  'date_joined', 'profile', 'posts')

    def create(self, validate_data):
        """Password hash"""
        validate_data['password'] = make_password(
            validate_data.get('password'))
        return super(UserSerializer, self).create(validate_data)
