"""djangobackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from djangobackend.djangoapi import views
from rest_framework.authtoken.views import obtain_auth_token  # <-- Here

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),  # <-- And here
]

urlpatterns = [
    path('login/', views.HelloView.as_view(), name='login'),
]

urlpatterns = [
    path('home/', views.HelloView.as_view(), name='home'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),  # <-- And here
]

urlpatterns = [
    path('monitorplant/', views.HelloView.as_view(), name='monitorplant'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),  # <-- And here
]

urlpatterns = [
    path('addPlant/', views.HelloView.as_view(), name='addPlant'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),  # <-- And here
]

urlpatterns = [
    path('options/', views.HelloView.as_view(), name='options'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),  # <-- And here
]

urlpatterns = [
    path('registry/', views.HelloView.as_view(), name='registry'),
]
