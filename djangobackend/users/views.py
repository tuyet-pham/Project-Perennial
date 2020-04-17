from __future__ import unicode_literals
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer


from django.db import models

# Might need this later to provide Cross Site Request Forgery protection
# As of right now it is ignored

from django.views.decorators.csrf import csrf_exempt        
from django.core import serializers

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, AnonymousUser

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

import sys
sys.path.append('..')
from dbmanager import authenticateUser

@csrf_exempt
def register(request):
    return JsonResponse("ok")

@csrf_exempt
def loginu(request):
    
    username = ''
    password = ''

    try:
        username = request.POST.get('username')
        password = request.POST.get('password')
    except Exception as e:
        print("Error : Failed Request on %s", e)
     
    # authenticate the user in django
    user = authenticate(request, username=username, password=password)

    # authenticate the user in couchdb
    status = authenticateUser(username, password)

    # if both true
    if status == True:
        if user is not None:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse(
                {
                    "user": username,
                    "token": token.key
                },
                status=HTTP_200_OK)
                

        if user is None:
            created = User.objects.create_user(username=username, password=password)
            login(request, user=created)
            token, _ = Token.objects.get_or_create(user=created)
            return JsonResponse(
            {
                "user": username,
                "token": token.key
            },
            status=HTTP_200_OK)
    else:
        return JsonResponse({'error': 'Invalid Credentials'}, status=HTTP_404_NOT_FOUND)


        


def logoutu(request):
    logout(request)
    return JsonResponse(
        {
            "user": username,
            "message": "logged out"
        },
        status=HTTP_200_OK)

# def current(request):
#     return HttpResponse("getting current")

