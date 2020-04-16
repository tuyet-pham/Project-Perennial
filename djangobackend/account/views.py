from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.db import models

# csrf - Might need this later to provide Cross Site Request Forgery protection
# As of right now it is ignored
from django.views.decorators.csrf import csrf_exempt        
from django.core import serializers

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

import sys
sys.path.append('..')
import dbmanager

'''
Authentication is currently not working.
Routes can added to the class below when authentication is working. 
Write your corresponding routes at the bottom of the page.

**IMPORTANT**
(1). Change data to match your incoming requests
(2). Add the correct HttpResponse, JsonResponse or Response needed.
'''



# '''
# '''
# class Account(APIView):
#     authentication_classes = (SessionAuthentication, BasicAuthentication)
#     permission_classes = (IsAuthenticated,)

#     def get(self, request, format=None):
#         content = {
#             'username': unicode(request.user),  # `django.contrib.auth.User` instance.
#             'auth': unicode(request.auth),  # None
#         }
#         return Response(content)
    


# '''
# '''
# class MonitorPlants(APIView):
#     authentication_classes = (SessionAuthentication, BasicAuthentication)
#     permission_classes = (IsAuthenticated,)

#     def get(self, request, format=None):
#         content = {
#             'username': unicode(request.user),  # `django.contrib.auth.User` instance.
#             'auth': unicode(request.auth),  # None
#         }
#         return Response(content)



# '''
# '''
# class AddPlant(APIView):
#     authentication_classes = (SessionAuthentication, BasicAuthentication)
#     permission_classes = (IsAuthenticated,)
    
#     def post(self, request, format=None):
#         content = {
#             'username': unicode(request.user),  # `django.contrib.auth.User` instance.
#             'auth': unicode(request.auth),  # None
#         }
#         return Response(content)


# '''
# '''
# class Options(APIView):
#     authentication_classes = (SessionAuthentication, BasicAuthentication)
#     permission_classes = (IsAuthenticated,)

#     def post(self, request, format=None):
#         content = {
#             'username': unicode(request.user),  # `django.contrib.auth.User` instance.
#             'auth': unicode(request.auth),  # None
#         }
#         return Response(content)




@csrf_exempt
def addplants(request):
    data = {}
    check = True
    try:
        data = { 
            'name' : request.POST.get('name'),
            'species' : request.POST.get('species'),
            'geolocationCity' : request.POST.get('geolocationCity'),
            'geolocationState' : request.POST.get('geolocationState'),
            'indoorsOutdoors' : request.POST.get('indoorsOutdoors'),
            'wateringConditionTrigger' : request.POST.get('wateringConditionTrigger'),
            'wateringConditionValue' : request.POST.get('wateringConditionValue'),
            'additionalNotes' : request.POST.get('additionalNotes'),
        }
        # passing data to addplant function in dbmanager.py in djangobackend
    except Exception as e:
        print("Error: Failed Request on %s", e)
        
    if (addPlant(data) == False):
        check = False
    if (check == False):
        return JsonResponse(data, status=HTTP_404_NOT_FOUND)
    else:
        return JsonResponse(data, status=HTTP_200_OK)


@csrf_exempt
def options(request):
    data = {}

    try:
        data = { 
            'name' : request.POST.get('name'),
            'species' : request.POST.get('species'),
            'geolocationCity' : request.POST.get('geolocationCity'),
            'geolocationState' : request.POST.get('geolocationState'),
            'indoorsOutdoors' : request.POST.get('indoorsOutdoors'),
            'wateringConditionTrigger' : request.POST.get('wateringConditionTrigger'),
            'wateringConditionValue' : request.POST.get('wateringConditionValue'),
            'additionalNotes' : request.POST.get('additionalNotes'),
        }
        # passing data to options function in dbmanager.py in djangobackend
        # options(data) - make in dbmanager.py
    except Exception as e:
        print("Error: Failed Request on %s", e)

    
    return JsonResponse(data)




@csrf_exempt
def monitorplants(request):
    data = {}

    try:
        data = { 
            'name' : request.POST.get('name'),
            'species' : request.POST.get('species'),
            'geolocationCity' : request.POST.get('geolocationCity'),
            'geolocationState' : request.POST.get('geolocationState'),
            'indoorsOutdoors' : request.POST.get('indoorsOutdoors'),
            'wateringConditionTrigger' : request.POST.get('wateringConditionTrigger'),
            'wateringConditionValue' : request.POST.get('wateringConditionValue'),
            'additionalNotes' : request.POST.get('additionalNotes'),
        }
        # passing data to monitorplants function in dbmanager.py in djangobackend
        # monitorplants(data) - make in dbmanager.py
    except Exception as e:
        print("Error: Failed Request on %s", e)

    
    return JsonResponse(data)
