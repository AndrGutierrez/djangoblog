"""CRUD utilities"""
from rest_framework.response import Response
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from users.models import Profile, User
from users.serializers import UserSerializer, ProfileSerializer
from posts.models import Post
from posts.serializers import PostSerializer


def store_user(request):
    """store user model only"""
    email = request.data['email']
    password = request.data['password']
    password_confirmation = request.data['password_confirmation']
    email_exists = User.objects.filter(email=email).exists()

    if email_exists:
        response = Response({'email': "Email already exists!"},
                            status=status.HTTP_400_BAD_REQUEST)
    elif password != password_confirmation:
        response = Response({'password': "passwords don't match"},
                            status=status.HTTP_400_BAD_REQUEST)
    else:
        response = store_model(request, UserSerializer)

    return response


def get_model_by_pk(request, serializer, model, pk):
    """Gets model by pk"""
    try:
        my_model = model.objects.get(pk=pk)
        serialized_model = serializer(my_model, context={'request': request})
        return Response(serialized_model.data)

    except model.DoesNotExist:
        return Response("error 404 not found",
                        status=status.HTTP_404_NOT_FOUND)


def get_user_by_email(request, email):
    '''gets user by email'''
    user = User.objects.get(email=email)
    serializer = UserSerializer(user, context={'request': request})
    return Response(serializer.data)


def get_post(request, slug):
    '''get post by username and slug'''
    try:
        post = Post.objects.get(slug=slug)
        serialized_post = PostSerializer(post, context={'request': request})
        return Response(serialized_post.data)

    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

def get_posts_by_userid(request, userid):
    '''get post by user id'''
    try:
        post = Post.objects.filter(user=userid)
        serialized_posts = list_model(request, PostSerializer, Post, 'post', post)
        return Response(serialized_posts.data)

    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

def list_model(request, model_serializer, model, model_name, models=None):
    """
    List database entity
    """
    data = []
    next_page = 1
    previous_page = 1
    if models is None:
        models = model.objects.all()
    page = request.GET.get('page', 1)
    paginator = Paginator(models, 10)
    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)

    serializer = model_serializer(data,
                                  context={'request': request},
                                  many=True)
    if data.has_next():
        next_page = data.next_page_number()

    if data.has_previous():
        previous_page = data.previous_page_number()

    data = {
        'body': serializer.data,
        'count': paginator.count,
        'numpages': paginator.num_pages,
        'nextlink': f'/api/{model_name.lower()}/?page=' + str(next_page),
        'prevlink': f'api/{model_name.lower()}/?page=' + str(previous_page)
    }

    response = Response({
        'body':
        serializer.data,
        'count':
        paginator.count,
        'numpages':
        paginator.num_pages,
        'nextlink':
        f'/api/{model_name.lower()}/?page=' + str(next_page),
        'prevlink':
        f'api/{model_name.lower()}/?page=' + str(previous_page)
    })

    return response


def store_model(request, model_serializer):
    """stores the model in db"""
    serializer = model_serializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        response = Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        response = Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
    return response


def delete_model(model, pk):
    """Deletes the model"""
    try:
        model = model.objects.get(id=pk)
        model.delete()
        response = Response("item deleted successfuly",
                            status=status.HTTP_204_NO_CONTENT)
    except model.DoesNotExist:
        response = Response("Error 404, item not found",
                            status=status.HTTP_404_NOT_FOUND)

    return response


def delete_checking_user(model, request):
    '''delete model if current user is the owner of it'''
    try:
        model = model.objects.get(id=request.data['id'])
        if request.user.id is model.user_id or request.user.is_superuser:
            model.delete()
            response = Response("item deleted successfuly",
                                status=status.HTTP_204_NO_CONTENT)
        else:
            response = Response(
                "You don't have the permissions to delete this post",
                status=status.HTTP_403_FORBIDDEN)
    except model.DoesNotExist:
        response = Response("Error 404, item not found",
                            status=status.HTTP_404_NOT_FOUND)
    return response


def update_model(request, model, model_serializer, pk):
    """update model by id/pk"""
    model = model.objects.get(id=pk)
    serializer = model_serializer(model,
                                  data=request.data,
                                  context={'request': request})
    if serializer.is_valid():
        serializer.save()
        response = Response(serializer.data)
    else:

        response = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return response
