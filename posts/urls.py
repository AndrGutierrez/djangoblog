'''Post views'''
from django.urls import path
from posts import views
from djangoblog.views import index

urlpatterns = [
    path('api/posts/', views.posts, name='posts'),
    path('api/posts/<slug:slug>', views.posts, name="single_post"),
    path('api/user/posts/<int:userid>', views.user_posts, name="single_post"),
    path('api/comments/', views.comments, name='comments'),
    # frontend urls
    path('posts/', index),
    path('posts/create', index),
    path('posts/<slug:username>/<slug:post_title>/', index)
]
