from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
import . from views

urlpatterns = [
    url(r'^register/$', views.register , name='user-register'),
    url(r'^login/$', views.login , name='login'),
    url(r'^logout/$', views.logout, name='logout'),
    # url(r'^current/$', views.UserView.as_view(), name='user-current'),
]