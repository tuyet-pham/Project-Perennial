"""djangobackend URL Configuration.

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
from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    # url(r'^$', views.Account.as_view(), name='account'),
    url(r'^monitorplants', views.monitorplants, name='monitorplants'),
    url(r'^addplants', views.addplants, name='addplants'),
    url(r'^options', views.options, name='options'),
    url(r'^updatepassword', views.updatepassword, name='updatepassword'),
    url(r'^manualwater', views.manualwater, name='manualwater'),
    url(r'^getsuggested', views.getsuggested, name='getsuggested'),
    url(r'^deleteplant', views.deleteplant, name='deleteplant'),
]
