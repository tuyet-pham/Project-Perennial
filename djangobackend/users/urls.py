from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    url(r'^register/', views.registerUser , name='registerUser'),
    url(r'^login/', views.loginUser , name='loginUser'),
    url(r'^logout', views.logoutUser, name='logoutUser'),
]
