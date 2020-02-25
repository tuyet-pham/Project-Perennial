from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  # Protecting API endpoint so we can implement the token authentication:

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)             # Required
    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)