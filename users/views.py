'''User views (login, signup, logout, etc)'''
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.http import HttpResponse
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import login, logout, authenticate
from users.models import User
from utils.api import store_user, list_model, get_user_by_email, get_model_by_pk
from .serializers import UserSerializer


@api_view(['GET', 'POST'])
@csrf_protect
@ensure_csrf_cookie
@permission_classes([AllowAny])
def login_view(request):
    """login view"""

    try:
        if request.method == 'GET':
            if not request.user.is_authenticated:
                return HttpResponse("You are not logged in", status=401)
            response = get_user_by_email(request, request.user)

        if request.method == 'POST':
            user = authenticate(email=request.data.get('email'),
                                password=request.data.get('password'))

            if not isinstance(user, AnonymousUser) and user is not None:
                login(request, user)
                response = get_user_by_email(request, user)

            else:
                response = HttpResponse("failed to login", status=401)

    except:
        response = HttpResponse("Authentication failed", status=401)

    return response


@api_view(['GET', 'POST'])
@csrf_protect
@ensure_csrf_cookie
def users(request, id=None):
    '''signup or list users'''
    model_name = 'user'
    if request.method == 'POST':
        response = store_user(request)
    if request.method == 'GET':
        users_list = list_model(request, UserSerializer, User, model_name)
        single_user = get_model_by_pk(request, UserSerializer, User, id)
        response = users_list if id is None else single_user
    return response


@api_view(['GET'])
def logout_view(request):
    '''Logout user'''
    response = HttpResponse("logged out successfully", status=200)
    logout(request)
    return response
