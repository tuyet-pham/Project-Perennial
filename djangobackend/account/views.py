"""Account views."""
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
from django.contrib.auth.models import AnonymousUser


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
from time import time
sys.path.append('..')
from dbmanager import addPlant, updateoptions, findPlantByUser, findReadings

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
            'username': request.POST.get('username'),
            'name': request.POST.get('name'),
            'species': request.POST.get('species'),
            'geolocationCity': request.POST.get('geolocationCity'),
            'geolocationState': request.POST.get('geolocationState'),
            'indoorsOutdoors': request.POST.get('indoorsOutdoors'),
            'wateringConditionTrigger': request.POST.get('wateringConditionTrigger'),
            'wateringConditionValue': request.POST.get('wateringConditionValue'),
            'additionalNotes': request.POST.get('additionalNotes'),
        }
        # passing data to addplant function in dbmanager.py in djangobackend
    except Exception as e:
        print("Error: Failed Request on %s", e)

    if (addPlant(data) is False):
        check = False
    if (check is False):
        return JsonResponse(data, status=HTTP_404_NOT_FOUND)
    else:
        return JsonResponse(data, status=HTTP_200_OK)


@csrf_exempt
def options(request):
    data = {}

    try:
        data = {
            'username': request.POST.get('username'),
            'emailAddress': request.POST.get('emailAddress'),
            'phoneNum': request.POST.get('phoneNum'),
            'notificationMethod': request.POST.get('notificationMethod'),
            'notificationTriggers': request.POST.getlist('notificationTriggers')
        }
        updateoptions(data)
    except Exception as e:
        print("Error: Failed Request on %s", e)

    return JsonResponse(data)


@csrf_exempt
def monitorplants(request):
    """Monitor Plants rout.

    Args:
        request (obj): Request object

    Returns:
        obj: response ojbect
    """
    response = {}
    try:
        # data = {
        #     'username': request.POST.get('username')
        # }

        # Get plants by username
        plants = list(findPlantByUser(request.POST.get('username')))

        # Get plant readings
        for plant in plants:
            last_update = 0
            plant['updated'] = 'never.'
            plantid = plant['_id']
            plant['key'] = plantid
            plant['temperature'] = '--'
            plant['humidity'] = '--'
            plant['reservoirEmpty'] = 1

            # Get moisture
            moisture = list(findReadings(plantid, "moisture"))
            print(moisture)
            if moisture:
                plant['moisture'] = moisture[0]['values']['moisture_level']
                time_reading = moisture[0]['time_reading']
                if time_reading > last_update:
                    last_update = time_reading
            else:
                plant['moisture'] = '--'

            # Get online/offline
            online = list(findReadings(plantid, "availability"))
            print("Online:", online)
            if (online) and (online[0]['values']['device_availability'] == 'online'):
                plant['online'] = 'Online'
                time_reading = online[0]['time_reading']
                if time_reading > last_update:
                    last_update = time_reading
            else:
                plant['online'] = 'Offline'

            # get last wattering time
            pump = list(findReadings(plantid, "pump"))
            if pump:
                time_reading = pump[0]['time_reading']
                time_diff = int(time()) - last_update
                if time_diff < 60:
                    plant['last_watered'] = 'A few seconds ago.'
                elif time_diff < 3600:
                    plant['last_watered'] = str(time_diff / 60) + ' minutes ago.'
                elif time_diff < 3600 * 48:
                    plant['last_watered'] = str(time_diff / 60 / 60) + ' hours ago.'
                else:
                    plant['last_watered'] = 'A long time ago.'

                if time_reading > last_update:
                    last_update = time_reading
            else:
                plant['last_watered'] = 'Unknown'

            # Get reservoir status
            reservoir = list(findReadings(plantid, "reservoir"))
            if reservoir:
                time_reading = pump[0]['time_reading']
                if reservoir[0]['values']['empty']:
                    plant['reservoirEmpty'] = 1
                else:
                    plant['reservoirEmpty'] = 0

                if time_reading > last_update:
                    last_update = time_reading

            # Set Updated Time
            time_diff = int(time()) - last_update
            if time_diff < 60:
                plant['updated'] = 'A few seconds ago.'
            elif time_diff < 3600:
                plant['updated'] = str(time_diff / 60) + ' minutes ago.'
            elif time_diff < 3600 * 48:
                plant['updated'] = str(time_diff / 60 / 60) + ' hours ago.'
            else:
                plant['updated'] = 'A long time ago.'
            print("Seconds ago:", time_diff)
            print('Updated:', plant['updated'])

        response = {'plants': plants}

        print(plants)

    except Exception as e:
        print("Error: Failed Request on", e)

    return JsonResponse(response)
