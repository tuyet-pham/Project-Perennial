from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response


def login(request):
    text = request.GET.get("text", "")
    return JsonResponse({"count": len(text)}) 
