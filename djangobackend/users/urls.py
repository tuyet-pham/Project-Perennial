from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    url(r'^register/$', views.register , name='register'),
    url(r'^login/$', views.loginu , name='loginu'),
    url(r'^logout/$', views.logoutu, name='logoutu'),
    # url(r'^current/$', views.UserView.as_view(), name='user-current'),
]


