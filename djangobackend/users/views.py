from __future__ import unicode_literals
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response


def register(request):
    return HttpResponse("hey")


def login(request):
    return HttpResponse("hey")



def logout(request):
    return HttpResponse("hey")

def current(request):
    return HttpResponse("hey")