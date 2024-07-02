from django.shortcuts import render

# views.py
# mydjangoapp/views.py
from rest_framework import viewsets
from .models import *
from .serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response


class SeedViewSet(viewsets.ModelViewSet, APIView):
    queryset = Seed.objects.all()
    serializer_class = SeedSerializer


    def get(self, request):
        output = [{"employee":output.employee,
                   "department": output.department}
                   for output in Seed.objects.all()]
        return Response(output)
    def post(self, request):
        seralizer = Seed(data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)
