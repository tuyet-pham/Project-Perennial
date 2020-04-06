from __future__ import unicode_literals
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from . import serializers
# from models import User
import sys
sys.path.append('..')
from dbmanager import *


def register(request):
    adduser('sam44','Bg@mail.com', 'password23!')
    return HttpResponse("register")


def login(request):
    
    return HttpResponse("404")


def logout(request):

    return HttpResponse("logout")


# def current(request):
#     return HttpResponse("getting current")