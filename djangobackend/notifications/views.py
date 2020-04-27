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


@csrf_exempt
def sms(request):
    data = {}
    try:
        data = request.POST.get('device_id')
    except Exception as e:
        print(e)
    return HttpResponse(data, status=HTTP_200_OK)





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
