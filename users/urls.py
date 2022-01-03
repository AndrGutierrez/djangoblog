'''User urls'''
from django.urls import path
from users import views
from djangoblog.views import index

urlpatterns = [
    # API views
    path('api/users/<int:id>', views.users, name="users"),
    path('api/auth/', views.login_view, name="login"),
    path('api/logout/', views.logout_view, name="logout"),

    # FRONTEND views
    path('login/', index),
    path('signup/', index),
]
