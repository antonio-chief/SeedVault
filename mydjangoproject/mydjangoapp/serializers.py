# mydjangoapp/serializers.py
from rest_framework import serializers
from .models import *

class SeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seed
        fields = '__all__'
        collection = 'UserSeedCatalog'  # Specify your collection name

class MonitoringSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monitoring
        fields = '__all__'
        collection = 'Monitoring'  # Specify your collection name
