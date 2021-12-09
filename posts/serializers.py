"""Post serializers"""
from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    """Post JSON serializer"""
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'user')
