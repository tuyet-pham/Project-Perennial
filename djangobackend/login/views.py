from django.http import HttpResponse
from rest_framework.response import Response

def login(request):
    return HttpResponse('Login Page')