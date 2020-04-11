from __future__ import unicode_literals
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import sys
sys.path.append('..')
from dbmanager import *


def register(request):
    # adduser()
    return HttpResponse("register")

@csrf_exempt
def login(request):
    username = ''
    password = ''

    try:
        username = request.POST.get('username')
        password = request.POST.get('password')
    except Exception as e:
        print(e)

    # if(authenticate(uname,upass) == True):
    data = {
        'AuthenticationToken' : username
    }
    
    return JsonResponse(data)
    


def logout(request):

    return HttpResponse("logout")


# def current(request):
#     return HttpResponse("getting current")