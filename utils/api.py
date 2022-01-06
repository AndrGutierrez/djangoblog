"""CRUD utilities"""
from rest_framework.response import Response
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from users.models import Profile, User
from users.serializers import UserSerializer, ProfileSerializer
from posts.models import Post
from posts.serializers import PostSerializer


class Request:
    """creates a fake request just for not doing weird stuff in store_model"""
    def __init__(self, data):
        self.data = data


def store_user(request):
    email = request.data['email']
    password = request.data['password']
    password_confirmation = request.data['password_confirmation']
    email_exists = User.objects.filter(email=email).exists()

    if email_exists or password != password_confirmation:
        response = Response("email already exist",
                            status=status.HTTP_400_BAD_REQUEST)
        return response
    response = store_model(request, UserSerializer)

    return response


def get_model_by_pk(request, serializer, model, pk):
    """Gets model by pk"""
    try:
        my_model = model.objects.get(pk=pk)
        serialized_model = serializer(my_model, context={'request': request})
        return Response(serialized_model.data)

    except model.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


def get_user_by_email(request, email):
    '''gets user by email'''
    user = User.objects.get(email=email)
    serializer = UserSerializer(user, context={'request': request})
    return Response(serializer.data)


def get_post(request, slug):
    '''get post by username and slug'''
    post = Post.objects.get(slug=slug)
    try:
        serialized_post = PostSerializer(post, context={'request': request})
        return Response(serialized_post.data)

    except post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


def list_model(request, model_serializer, model, model_name):
    """
    List database entity
    """
    data = []
    next_page = 1
    previous_page = 1
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


def get_model(request, model, model_serializer, pk):
    """
    Retrieve a model by id/pk
    """
    model = get_model_by_pk(model, pk)
    serializer = model_serializer(model, context={'request': request})
    return Response(serializer.data)


def delete_model(model, pk):
    """Deletes the model by the id/pk"""
    model = get_model_by_pk(model, pk)
    model.delete()
    response = Response(status=status.HTTP_204_NO_CONTENT)
    return response


def update_model(request, model, model_serializer, pk):
    """update model by id/pk"""
    model = get_model_by_pk(model, pk)
    serializer = model_serializer(model,
                                  data=request.data,
                                  context={'request': request})
    if serializer.is_valid():
        serializer.save()
        response = Response(serializer.data)
    response = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return response
