# mydjangoapp/serializers.py
from rest_framework import serializers
from .models import *

class SeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seed
        fields = '__all__'




