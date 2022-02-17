from django.contrib import admin
from django.urls import path, include
from djangoblog.views import index
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path('', include(('users.urls', 'users'), namespace='users')),
    path('', include(('posts.urls', 'posts'), namespace='posts')),
]
urlpatterns += staticfiles_urlpatterns()
