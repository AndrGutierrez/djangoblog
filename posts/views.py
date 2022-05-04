'''Post and Comments views'''
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from utils.api import store_model, list_model, get_post, delete_checking_user, get_posts_by_userid
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment


@api_view(['GET', 'POST', 'DELETE'])
@csrf_protect
@ensure_csrf_cookie
def posts(request, slug=None):
    '''list and create posts'''
    model_name = 'post'

    if request.method == 'GET':
        list_posts = list_model(request, PostSerializer, Post, model_name)
        post = get_post(request, slug)
        response = post if slug is not None else list_posts

    elif request.method == 'POST' and request.user.is_authenticated:
        response = store_model(request, PostSerializer)

    elif request.method == 'DELETE' and request.user.is_authenticated:
        response = delete_checking_user(Post, request)
    else:
        response = Response(
            "You don't have the permissions to delete this post",
            status=status.HTTP_403_FORBIDDEN)

    return response

@api_view(['GET'])
def user_posts(request, userid=None):
    model_name = 'post'

    list_posts = list_model(request, PostSerializer, Post, model_name)
    post = get_posts_by_userid(request, userid=userid)
    response = post if userid is not None else list_posts
    return response



@api_view(['POST', 'DELETE'])
@csrf_protect
@ensure_csrf_cookie
@login_required
def comments(request):
    '''list and create comments'''
    if request.user.is_authenticated:
        if request.method == 'POST':
            response = store_model(request, CommentSerializer)

        if request.method == 'DELETE':
            response = delete_checking_user(Comment, request)
    else:
        response = Response(
            "You don't have the permissions to delete this post",
            status=status.HTTP_403_FORBIDDEN)
    return response
