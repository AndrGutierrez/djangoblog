'''Post views'''
from django.urls import path
from posts import views

urlpatterns = [
    path('api/posts', views.posts, name='posts'),
    path('api/comments', views.comments, name='comments')
]
