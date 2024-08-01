from rest_framework import serializers
from .models import *

class AdminAllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminAllUsers
        fields = '__all__'

class SeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = seeds
        fields = '__all__'

class MonitoringSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monitoring
        fields = '__all__'

# Add the other serializers

class AdminFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminFeedback
        fields = '__all__'

class AdminSeedCatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminSeedCatalog
        fields = '__all__'

class AdminSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminSubscription
        fields = '__all__'


class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'



class SecuritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Security
        fields = '__all__'

class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        fields = ['UserID', 'UserName', 'UserEmail', 'UserPassword']

class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weather
        fields = '__all__'



class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ['WorkerID', 'Name', 'AssignedPlace', 'Image']

class RestrictedAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestrictedArea
        fields = ['AreaName', 'Reason']

class SecurityBreachSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecurityBreach
        fields = ['BreachID', 'Date', 'Time', 'Description']

class EquipmentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentStatus
        fields = ['EquipmentID', 'Status', 'LastUpdated']




class TotalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Totals
        fields = '__all__'

class StorageFacilitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StorageFacilities
        fields = '__all__'


class AdminRecommendationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminRecommendations
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'