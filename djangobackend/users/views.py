from __future__ import unicode_literals
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response

import django
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

import sys
sys.path.append('..')
from dbmanager import *


@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny,))
def register(request):
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        User.objects.create_user(
            serialized.save()
        )
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
# @api_view(["POST"])
# @permission_classes((AllowAny,))
# @renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def login(request):
    
    username = ''
    password = ''
    try:
        username = request.POST.get('username')
        password = request.POST.get('password')
        
    except Exception as e:
        print(e)
     
    user = authenticate(username=username, password=password)

    if(authenticateUser(username, password) == True):
        if not user:
            newEntry = User.objects.create_user(username=username, password=password)
            newEntry.save()

            user = authenticate(username=username, password=password)
            login(request, user)

            token = Token.objects.get_or_create(user=user)
            return Response({'token': token}, status=HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Credentials'}, status=HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'Invalid Credentials'}, status=HTTP_404_NOT_FOUND)   
        


def logout(request):
    logout(request)
    return HttpResponse("logout")


# def current(request):
#     return HttpResponse("getting current")

