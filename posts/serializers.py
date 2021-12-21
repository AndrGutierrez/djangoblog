"""Post and Comment serializers"""
from rest_framework import serializers
from .models import Post, Comment


class CommentSerializer(serializers.ModelSerializer):
    """Comment JSON serializer"""
    class Meta:
        model = Comment
        fields = ('id', 'content', 'user', 'post', 'created', 'modified')


class PostSerializer(serializers.ModelSerializer):
    """Post JSON serializer"""
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'thumbnail', 'user', 'created',
                  'modified', 'comments')
