from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt

import sys
sys.path.append('..')
from dbmanager import *



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

    try:
        data = { 
            name : request.POST.get('name'),
            species : request.POST.get('species'),
            geolocationCity : request.POST.get('geolocationCity'),
            geolocationState : request.POST.get('geolocationState'),
            indoorsOutdoors : request.POST.get('indoorsOutdoors'),
            wateringConditionTrigger : request.POST.get('wateringConditionTrigger'),
            wateringConditionValue : request.POST.get('wateringConditionValue'),
            additionalNotes : request.POST.get('additionalNotes'),
        }
        # passing data to addplant function in dbmanager.py in djangobackend
        # addplant(data)
    except Exception as e:
        print(e)

    
    return HttpResponse('200')



@csrf_exempt
def options(request):
    data = {}

    try:
        data = { 
            name : request.POST.get('name'),
            species : request.POST.get('species'),
            geolocationCity : request.POST.get('geolocationCity'),
            geolocationState : request.POST.get('geolocationState'),
            indoorsOutdoors : request.POST.get('indoorsOutdoors'),
            wateringConditionTrigger : request.POST.get('wateringConditionTrigger'),
            wateringConditionValue : request.POST.get('wateringConditionValue'),
            additionalNotes : request.POST.get('additionalNotes'),
        }
    except Exception as e:
        print(e)

        # passing data to options function in dbmanager.py in djangobackend
        # options(data)
    return HttpResponse('200')




@csrf_exempt
def monitorplants(request):
    data = {}

    try:
        data = { 
            name : request.POST.get('name'),
            species : request.POST.get('species'),
            geolocationCity : request.POST.get('geolocationCity'),
            geolocationState : request.POST.get('geolocationState'),
            indoorsOutdoors : request.POST.get('indoorsOutdoors'),
            wateringConditionTrigger : request.POST.get('wateringConditionTrigger'),
            wateringConditionValue : request.POST.get('wateringConditionValue'),
            additionalNotes : request.POST.get('additionalNotes'),
        }
    except Exception as e:
        print(e)

        # passing data to monitorplants function in dbmanager.py in djangobackend
        # monitorplants(data)
    return HttpResponse('200')