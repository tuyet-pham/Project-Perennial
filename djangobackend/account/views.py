from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.db import models

# csrf - Might need this later to provide Cross Site Request Forgery protection
# As of right now it is ignored
from django.views.decorators.csrf import csrf_exempt        

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

import sys
sys.path.append('..')
from dbmanager import addPlant, updateoptions, changepassword



@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addplants(request):
    data = {}
    check = True
    try:
        data = {
            'username' : request.POST.get('username'),
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
        return JsonResponse(data, status=HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse(data, status=HTTP_200_OK)





@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def options(request):
    data = {}
    status = ''
    try:
        data = { 
            'username' : request.POST.get('username'),
            'emailAddress' : request.POST.get('emailAddress'),
            'phoneNum' : request.POST.get('phoneNum'),
            'notificationMethod' : request.POST.get('notificationMethod'),
            'notificationTriggers' : request.POST.getlist('notificationTriggers')
        }
    except Exception as e:
        print("Error: Failed Request on %s", e)
    
    status = updateoptions(data)
    if status == True:
        return JsonResponse(data, status=HTTP_200_OK)
    else:
        return HttpResponse(status=HTTP_400_BAD_REQUEST)





@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def changecredentials(request):
    data = {}
    status = ''
    
    try:
        data = { 
            'username' : request.POST.get('username'),
            'newpassword' : request.POST.get('newpassword'),
        }
    except Exception as e:
        print("Error: Failed Request on %s", e)
    
    status = changepassword(data)
    if status == True:
        u = User.objects.get(username=data['username'])
        u.set_password(data['newpassword'])
        u.save()

        message = {
            'username' : request.POST.get('username'),
            'status' : "Successfully changed password"
        }

        return JsonResponse(message,status=HTTP_200_OK)
    else:
        return HttpResponse(status=HTTP_400_BAD_REQUEST)
    





@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
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
    