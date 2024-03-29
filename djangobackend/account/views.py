"""Account views."""
from __future__ import unicode_literals
import traceback
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
    HTTP_200_OK,
    HTTP_202_ACCEPTED
)

import paho.mqtt.publish as mqtt

import sys
from os import environ
from time import time
sys.path.append('..')

from dbmanager import addPlant, updateoptions, findPlantByUser, findReadings, changepassword, findPlantByType, deletePlantByUser



"""
@addplants()
Param   : request
Purpose : Used to receive plant_device data from front-end
          (1). Does a request.POST.get to get data from front-end
          (2). Calls addPlant() with param data that contains plant device info
          (3). If addPlant() returns false, plant was updated
          (4). If addPlant() returns true, plant was newly added
Returns : (1). If false returns JsonResponse that contains data and 202 response
          (2). If true returns JsonResponse that contains data and 200 response
"""
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
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
        return JsonResponse(data, status=HTTP_202_ACCEPTED)
    else:
        return JsonResponse(data, status=HTTP_200_OK)





"""
@options()
Param   : request
Purpose : Used to receive options data from front-end
          (1). Does a request.POST.get to get data from front-end
          (2). Calls updateoptions() with param data that contains options info
          (3). If updateoptions() returns false, options was not updated
          (4). If updateoptions() returns true, options was updated
Returns : (1). If false returns HttpResponse that contains data and 400 response
          (2). If true returns JsonResponse that contains data and 200 response
"""
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def options(request):
    data = {}
    status = ''
    try:
        data = {
            'username': request.POST.get('username'),
            'emailAddress': request.POST.get('emailAddress'),
            'phoneNum': request.POST.get('phoneNum'),
            'notificationMethod': request.POST.get('notificationMethod'),
            'notificationTriggers': request.POST.get('notificationTriggers')
        }
        data['notificationTriggers'] = data['notificationTriggers'].split(",")
    except Exception as e:
        print("Error: Failed Request on %s", e)

    status = updateoptions(data)
    if status == True:
        return JsonResponse(data, status=HTTP_200_OK)
    else:
        return HttpResponse(data, status=HTTP_400_BAD_REQUEST)




"""
@updatepassword()
Param   : request
Purpose : Used to receive updated password data from front-end
          (1). Does a request.POST.get to get data from front-end
          (2). Calls changepassword() with param data that contains updated password info
          (3). If changepassword() returns false, password was not updated
          (4). If changepassword() returns true, password was updated and message is sent to front end
Returns : (1). If false returns JsonResponse that contains data and 400 response
          (2). If true returns JsonResponse that contains data and 200 response and message to user
"""
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updatepassword(request):
    data = {}
    status = ''

    try:
        data = {
            'username' : request.POST.get('username'),
            'password' : request.POST.get('password')
        }
    except Exception as e:
        print("[views.py] Error: Failed Request on %s", e)

    status = changepassword(data)
    if status:
        user = User.objects.get(username=data['username'])
        user.set_password(data['password'])
        user.save()

        message = {
            'username' : request.POST.get('username'),
            'status' : "Successfully changed password"
        }

        return JsonResponse(message,status=HTTP_200_OK)

    else:
        return JsonResponse(data, status=HTTP_400_BAD_REQUEST)



@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def monitorplants(request):
    """Monitor Plants rout.

    Args:
        request (obj): Request object

    Returns:
        obj: response ojbect
    """
    response = {}
    try:
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
            pump = list(findReadings(plantid, "pumpstatus"))
            if pump:
                time_reading = pump[0]['time_reading']
                time_diff = int(time()) - time_reading
                if time_diff < 60:
                    # Past minute
                    plant['last_watered'] = 'A few seconds ago.'
                elif time_diff < 3600:
                    # Past hour
                    plant['last_watered'] = str(int(time_diff / 60)) + ' minutes ago.'
                elif time_diff < 3600 * 48:
                    # Past 48 hours
                    plant['last_watered'] = str(int(time_diff / 60 / 60)) + ' hours ago.'
                elif time_diff < 86400 * 7:
                    # Past 7 days
                    plant['last_watered'] = str(int(time_diff / 60 / 60 / 24)) + ' days ago.'
                else:
                    # Longer than 7 days
                    plant['last_watered'] = 'A long time ago.'

                if time_reading > last_update:
                    last_update = time_reading
            else:
                plant['last_watered'] = 'Unknown'

            # Get reservoir status
            reservoir = list(findReadings(plantid, "reservoir"))
            if reservoir:
                time_reading = reservoir[0]['time_reading']
                if reservoir[0]['values']['reservoir_empty'] == 1:
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
                plant['updated'] = str(int(time_diff / 60)) + ' minutes ago.'
            elif time_diff < 3600 * 48:
                plant['updated'] = str(int(time_diff / 60 / 60)) + ' hours ago.'
            else:
                plant['updated'] = 'A long time ago.'
            print("Seconds ago:", time_diff)
            print('Updated:', plant['updated'])

        response = {'plants': plants}

        print(plants)

    except Exception as e:
        print("Error: Failed Request on", e)
        traceback.print_exc()

    return JsonResponse(response)



@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def manualwater(request):
    """Manually water plant.

    Args:
        request (obj): Request object

    Returns:
        json: Json response
    """
    print("Watering Manually")
    try:
        # planttype = {
        #     "plant": request.POST.get('plantname'),
        #     "username": request.POST.get('username')
        # }
        deviceid = request.POST.get('plantid')
        username = request.POST.get('username')
        print("Plantid:", deviceid)

        devices = findPlantByUser(username)

        for device in devices:
            if device.id == deviceid:
                topic = "perennial/" + deviceid + "/pump"
                mqtt.single(topic, payload="manualpump", hostname=environ.get("MQTT_BROKER"))

    except Exception as e:
        print("Error: Failed Request on %s", e)
        return JsonResponse({"error": str(e)}, status=HTTP_400_BAD_REQUEST)

    return JsonResponse({"plantid": deviceid}, status=HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getsuggested(request):

    planttype = ''
    response = {}
    try:
        planttype = request.POST.get('planttype')
    except Exception as e:
        print("Error: Failed Request on %s", e)

    level = findPlantByType(planttype)
    response = {'suggestedmoisture': level}
    if level is False:
        return JsonResponse(response, status=HTTP_404_NOT_FOUND)
    else:
        return JsonResponse(response, status=HTTP_200_OK)



"""
@deleteplant()
Param   : request
Purpose : Used to receive plant name that will get deleted from front-end
          (1). Does a request.POST.get to get data from front-end
          (2). Calls deletePlantByUser() with param data that contains plant name and username info
          (3). If deletePlantByUser() returns false, plantname was not deleted
          (4). If deletePlantByUser() returns true, plantname was deleted
Returns : (1). If false returns JsonResponse that contains data and 404 response
          (2). If true returns JsonResponse that contains data and 200 response
"""
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteplant(request):
    plant={}
    try:
        plant = {
            'username': request.POST.get('username'),
            'name': request.POST.get('name')
        }
    except Exception as e:
        print("Error: Failed Request on %s", e)

    status = deletePlantByUser(plant)
    if status is False:
            return JsonResponse(plant, status=HTTP_404_NOT_FOUND)
    else:
        return JsonResponse(plant, status=HTTP_200_OK)
