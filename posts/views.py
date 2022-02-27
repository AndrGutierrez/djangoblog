'''Post and Comments views'''
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from utils.api import store_model, list_model, get_post, delete_model
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment


@api_view(['GET', 'POST', 'DELETE'])
@csrf_protect
@ensure_csrf_cookie
def posts(request, slug=None):
    '''list and create posts'''
    model_name = 'post'
    if request.method == 'POST':
        response = store_model(request, PostSerializer)
    elif request.method == 'DELETE':
        response = delete_model(Post, request.data['id'])
    elif request.method == 'GET':
        list_posts = list_model(request, PostSerializer, Post, model_name)
        post = get_post(request, slug)
        response = post if slug is not None else list_posts

    return response


@api_view(['POST'])
@csrf_protect
@ensure_csrf_cookie
@login_required
def comments(request):
    '''list and create comments'''
    if request.method == 'POST':
        response = store_model(request, CommentSerializer)
    return response
