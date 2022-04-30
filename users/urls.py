'''User urls'''
from django.urls import path
from users import views
from djangoblog.views import index

urlpatterns = [
    # API views
    path('api/users/', views.users, name="users"),
    path('api/profile/<int:id>', views.profile, name="profile"),
    path('api/users/<int:id>', views.users, name="single_user"),
    path('api/auth/', views.login_view, name="login"),
    path('api/logout/', views.logout_view, name="logout"),

    # FRONTEND views
    path('login/', index),
    path('signup/', index),
    path('signup/success/<str:username>', index),
    path('user/profile/', index),
]
