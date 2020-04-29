# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
import requests
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
# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client



'''
@sms()
api call requires body fields
    (1). message
    (2). phonenumber
'''
@csrf_exempt
def sms(request):

    message = ''
    phonenumber = ''
    try:
        message = request.POST.get('message')
        phonenumber = request.POST.get('phonenumber')
    except Exception as e:
        print(e)


    # Your Account Sid and Auth Token from twilio.com/console
    # DANGER! This is insecure. See http://twil.io/secure
    account_sid = 'AC86cceba053bbfa4cd601df202da97b13'
    auth_token = '2de74e4a63cae341bde395e9714e59a1'
    client = Client(account_sid, auth_token)

    message = client.messages \
                    .create(
                        body= message,
                        from_='+12182315131',
                        to= phonenumber,
                    )
   
    return HttpResponse(message.sid, status=HTTP_200_OK)



'''
@email()
api call requires body fields
    (1). message
    (2). receiver
    (3). subject
'''
@csrf_exempt
def email(request):

    message = ''
    reciever = ''
    subject = 'Perennial Alert'
    try:
        message = request.POST.get('message')
        receiver = request.POST.get('receiver')
        subject = request.POST.get('subject')
    except Exception as e:
        print(e)

    r = requests.post(
        "https://api.mailgun.net/v3/sandboxbd29fb16aaa2404288724db86f1f1c0c.mailgun.org/messages",
        auth=("api", "dc1f071f9fc0a270465668e5ffaec2be-65b08458-0c101961"),
        data={"from": "Perennial <mailgun@sandboxbd29fb16aaa2404288724db86f1f1c0c.mailgun.org>",
              "to": [receiver],
              "subject": subject,
              "text": message})
    
    return HttpResponse(r.status_code)
