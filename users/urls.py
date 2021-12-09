'''User urls'''
from django.urls import path
from users import views

urlpatterns = [
    path('api/users/', views.users, name="users"),
    path('api/auth/', views.login_view, name="login"),
    path('api/logout/', views.logout_view, name="logout")
]
