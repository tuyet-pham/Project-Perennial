from django.http import HttpResponse
from rest_framework.response import Response

def register(request):
    return HttpResponse('hey')