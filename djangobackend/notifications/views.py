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



@csrf_exempt
def sms(request):

    # Your Account Sid and Auth Token from twilio.com/console
    # DANGER! This is insecure. See http://twil.io/secure
    account_sid = 'AC86cceba053bbfa4cd601df202da97b13'
    auth_token = '2de74e4a63cae341bde395e9714e59a1'
    client = Client(account_sid, auth_token)

    message = client.messages \
                    .create(
                        body= request.POST.get('message'),
                        from_='+12182315131',
                        to='8178706288'
                    )

    # data = {}
    # try:
    #     data = request.POST.get('device_id')
    # except Exception as e:
    #     print(e)
    return HttpResponse(message.sid, status=HTTP_200_OK)





@csrf_exempt
def email(request):
	return requests.post(
		"https://api.mailgun.net/v3/sandbox2abd532106654910aca06b63e6b4d46d.mailgun.org/messages",
		auth=("api", "c053bfc0c16dc4f497192184e35cff4b-f135b0f1-542b57b9"),
		data={"from": "Excited User <Avery@https://api.mailgun.net/v3/sandbox2abd532106654910aca06b63e6b4d46d.mailgun.org>",
			"to": "averyclariday44@gmail.com",
			"subject": "Mailgun Test",
			"text": "Testing Mailgun"
			}
    )
