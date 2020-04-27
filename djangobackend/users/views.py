from __future__ import unicode_literals
from django.http import HttpResponse, JsonResponse
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
# 
# Might need this later to provide Cross Site Request Forgery protection
# As of right now it is ignored
from django.views.decorators.csrf import csrf_exempt        

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, AnonymousUser

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

import sys
sys.path.append('..')
from dbmanager import authenticateUser
from dbmanager import adduser



@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def registerUser(request):
     
    username = ''
    password = ''
    email = ''
    route = "/login"

    try:
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')

    except Exception as e:
        print("Error : Failed Request on %s", e)

    status = adduser(uname=username, uemail=email, upass=password)

    # if both true
    if status == '3':
        return JsonResponse({"type": status}, status=HTTP_400_NOT_FOUND)
    elif status == '2':
        return JsonResponse({"type": status}, status=HTTP_400_NOT_FOUND)
    else:
        user = authenticate(request, username=username, password=password)
        if user is None:
            created = User.objects.create_user(username=username, password=password)
        return JsonResponse(
            {
                "type": status,
                "route": route,
            }, 
            status=HTTP_200_OK)


'''
loginUser()
Param   : username
Purpose : Used to find a user.
          (1). Checks to see if the user exists in couchdb.
          (2). If the user exists then return a True flag
          (3). If the user doesn't exist returns False flag
Returns : (1)users id, (2)False
'''
@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def loginUser(request):
    
    username = ''
    password = ''
    route = "/home"

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
                    "username": username,
                    "token": token.key,
                    "route" : route,
                },
                status=HTTP_200_OK)
                
        if user is None:
            created = User.objects.create_user(username=username, password=password)
            login(request, user=created)
            token, _ = Token.objects.get_or_create(user=created)
            return JsonResponse(
            {
                "username": username,
                "token": token.key,
                "route" : route,
            },
            status=HTTP_200_OK)
    else:
        return JsonResponse({'error': 'Invalid Credentials'}, status=HTTP_404_NOT_FOUND)




@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logoutUser(request):
    try:
       request.user.auth_token.delete()
    except (AttributeError, ObjectDoesNotExist):
        pass

    logout(request)
    return JsonResponse(
            {
                "user": "logged out",
            },
            status=HTTP_200_OK)

