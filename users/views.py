'''User views (login, signup, logout, etc)'''
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.http import HttpResponse
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import login, logout, authenticate
from varname import nameof
from users.models import User
from utils.api import store_user, list_model
from .serializers import UserSerializer


@api_view(['GET', 'POST'])
@csrf_protect
@ensure_csrf_cookie
@permission_classes([AllowAny])
def login_view(request):
    """login view"""
    response = HttpResponse("logged in successfully", status=200)
    try:
        user = authenticate(email=request.data.get('email'),
                            password=request.data.get('password'))
        if not isinstance(user, AnonymousUser) and user is not None:
            login(request, user)
        else:
            response = HttpResponse("failed to login", status=401)

    except:
        response = HttpResponse("failed to login", status=401)

    return response


@api_view(['GET', 'POST'])
@csrf_protect
@ensure_csrf_cookie
def users(request):
    '''store or list users'''
    model_name = nameof(User)
    if request.method == 'POST':
        response = store_user(request)
    if request.method == 'GET':
        response = list_model(request, UserSerializer, User, model_name)
    return response


@api_view(['GET'])
def logout_view(request):
    '''Logout user'''
    response = HttpResponse("logged out successfully", status=200)
    logout(request)
    return response
