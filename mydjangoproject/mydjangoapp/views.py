'''from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Seed
from .serializers import SeedSerializer

class SeedViewSet(viewsets.ModelViewSet):
    queryset = Seed.objects.all()
    serializer_class = SeedSerializer
'''