from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  # Protecting API endpoint so we can implement the token authentication:
from django.http import Http404,HttpResponseRedirect
from django.shortcuts import render_to_response
from couchdb import Server                              #couchdb connections
from couchdb.client import ResourceNotFound             #errors



SERVER = Server('http://dbData:5984')
if (len(SERVER) == 0):
    SERVER.create('docs')
    SERVER.create('plant')

def index(request):
    docs = SERVER['docs']
    if request.method == "POST":
        title = request.POST['title'].replace(' ','')
        docs[title] = {'title':title,'text':""}
        return HttpResponseRedirect(u"/doc/%s/" % title)
    return render_to_response('djangobackend/index.html',{'rows':docs})


# def detail(request,id):
#     docs = SERVER['docs']
#     try:
#         doc = docs[id]
#     except ResourceNotFound:
#         raise Http404        
#     if request.method =="POST":
#         doc['title'] = request.POST['title'].replace(' ','')
#         doc['text'] = request.POST['text']
#         docs[id] = doc
#     return render_to_response('djangobackend/detail.html',{'row':doc})


class HelloView(APIView):
    permission_classes = (IsAuthenticated,)             # Required
    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)