'''Post views'''
from django.urls import path
from posts import views
from djangoblog.views import index

urlpatterns = [
    path('api/posts/', views.posts, name='posts'),
    path('api/comments/', views.comments, name='comments'),
    # frontend urls
    path('posts/', index),
    path('posts/<slug:username>/<slug:post_title>/', index)
]
