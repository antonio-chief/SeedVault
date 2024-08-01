# mydjangoapp/views.py
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from .models import *
from .serializers import *

class SeedViewSet(viewsets.ModelViewSet):
    queryset = seeds.objects.all()
    serializer_class = SeedSerializer
    def perform_create(self, serializer):
        seed = serializer.save()
        totals = Totals.objects.first()
        totals.in_inventory += seed.SeedQuantity
        totals.save()

class MonitoringViewSet(viewsets.ModelViewSet):
    queryset = Monitoring.objects.all()
    serializer_class = MonitoringSerializer

class AdminFeedbackViewSet(viewsets.ModelViewSet):
    queryset = AdminFeedback.objects.all()
    serializer_class = AdminFeedbackSerializer

class AdminSeedCatalogViewSet(viewsets.ModelViewSet):
    queryset = AdminSeedCatalog.objects.all()
    serializer_class = AdminSeedCatalogSerializer

class AdminSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = AdminSubscription.objects.all()
    serializer_class = AdminSubscriptionSerializer

class EventsViewSet(viewsets.ModelViewSet):
    queryset = Events.objects.all()
    serializer_class = EventsSerializer


class SecurityViewSet(viewsets.ModelViewSet):
    queryset = Security.objects.all()
    serializer_class = SecuritySerializer

class StorageViewSet(viewsets.ModelViewSet):
    queryset = Storage.objects.all()
    serializer_class = StorageSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    

class WeatherViewSet(viewsets.ModelViewSet):
    queryset = Weather.objects.all()
    serializer_class = WeatherSerializer




class WorkerViewSet(viewsets.ModelViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer

class RestrictedAreaViewSet(viewsets.ModelViewSet):
    queryset = RestrictedArea.objects.all()
    serializer_class = RestrictedAreaSerializer

class SecurityBreachViewSet(viewsets.ModelViewSet):
    queryset = SecurityBreach.objects.all()
    serializer_class = SecurityBreachSerializer

class EquipmentStatusViewSet(viewsets.ModelViewSet):
    queryset = EquipmentStatus.objects.all()
    serializer_class = EquipmentStatusSerializer



class TotalsViewSet(viewsets.ModelViewSet):
    queryset = Totals.objects.all()
    serializer_class = TotalsSerializer

class StorageFacilitiesViewSet(viewsets.ModelViewSet):
    queryset = StorageFacilities.objects.all()
    serializer_class = StorageFacilitiesSerializer



class AdminRecommendationsViewSet(viewsets.ModelViewSet):
    queryset = AdminRecommendations.objects.all()
    serializer_class = AdminRecommendationsSerializer

    def list(self, request):
        seed_name = request.query_params.get('seed_name', None)
        text_snippet = request.query_params.get('text_snippet', None)

        if seed_name:
            queryset = self.queryset.filter(seed_name__icontains=seed_name)
        elif text_snippet:
            queryset = self.queryset.filter(recommendation__icontains=text_snippet)
        else:
            queryset = self.queryset

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    @action(detail=True, methods=['post'])
    def resolve(self, request, pk=None):
        notification = self.get_object()
        # Logic to interact with IoT devices based on notification type
        if 'temperature' in notification.message.lower():
            # Call to turn on the heater
            # Example: send_command_to_device('heater', 'on')
            pass
        # Add logic for other types of notifications
        notification.delete()  # Remove resolved notification
        return Response(status=status.HTTP_204_NO_CONTENT)

class SeedAPIView(APIView):
    def get(self, request):
        seeds = seeds.objects.all()
        serializer = SeedSerializer(seeds, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SeedSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            totals = Totals.objects.first()
            totals.in_inventory += seeds.SeedQuantity #was seed.SeedQuantity
            totals.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MonitoringAPIView(APIView):
    def get(self, request):
        monitoring_data = Monitoring.objects.all()
        serializer = MonitoringSerializer(monitoring_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MonitoringSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminFeedbackAPIView(APIView):
    def get(self, request):
        feedbacks = AdminFeedback.objects.all()
        serializer = AdminFeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AdminFeedbackSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminSeedCatalogAPIView(APIView):
    def get(self, request):
        seed_catalog = AdminSeedCatalog.objects.all()
        serializer = AdminSeedCatalogSerializer(seed_catalog, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AdminSeedCatalogSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminSubscriptionAPIView(APIView):
    def get(self, request):
        subscriptions = AdminSubscription.objects.all()
        serializer = AdminSubscriptionSerializer(subscriptions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AdminSubscriptionSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class EventsAPIView(APIView):
    def get(self, request):
        events = Events.objects.all()
        serializer = EventsSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EventsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SecurityAPIView(APIView):
    def get(self, request):
        security_data = Security.objects.all()
        serializer = SecuritySerializer(security_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SecuritySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StorageAPIView(APIView):
    def get(self, request):
        storage_data = Storage.objects.all()
        serializer = StorageSerializer(storage_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = StorageSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = User.objects.get(UserID=request.user.UserID)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class UserUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request):
        user = User.objects.get(UserID=request.user.UserID)
        username = request.data.get('UserName')
        if username:
            user.UserName = username
            user.save()
            return Response({'status': 'Username updated'})
        return Response({'error': 'Username not provided'}, status=400)
    
    
class UploadProfilePictureView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        file = request.FILES.get('profilePicture')
        if file:
            file_name = default_storage.save(file.name, file)
            file_url = default_storage.url(file_name)
            # Save file_url to user profile here if needed
            return Response({'profilePictureUrl': file_url})
        return Response({'error': 'No file uploaded'}, status=400)



class WeatherAPIView(APIView):
    def get(self, request):
        weather_data = Weather.objects.all()
        serializer = WeatherSerializer(weather_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = WeatherSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WorkerAPIView(APIView):
    def get(self, request):
        workers = Worker.objects.all()
        serializer = WorkerSerializer(workers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = WorkerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RestrictedAreaAPIView(APIView):
    def get(self, request):
        areas = RestrictedArea.objects.all()
        serializer = RestrictedAreaSerializer(areas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = RestrictedAreaSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SecurityBreachAPIView(APIView):
    def get(self, request):
        breaches = SecurityBreach.objects.all()
        serializer = SecurityBreachSerializer(breaches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SecurityBreachSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EquipmentStatusAPIView(APIView):
    def get(self, request):
        equipment_statuses = EquipmentStatus.objects.all()
        serializer = EquipmentStatusSerializer(equipment_statuses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EquipmentStatusSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TotalsAPIView(APIView):
    def get(self, request):
        totals = Totals.objects.first()
        serializer = TotalsSerializer(totals)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TotalsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StorageFacilitiesAPIView(APIView):
    def get(self, request):
        storage = StorageFacilities.objects.first()
        serializer = StorageFacilitiesSerializer(storage)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = StorageFacilitiesSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class RecommendationsAPIView(APIView):
    def get(self, request):
        seed_name = request.query_params.get('seed_name', None)
        text_snippet = request.query_params.get('text_snippet', None)

        if seed_name:
            recommendations = AdminRecommendations.objects.filter(seed_name__icontains=seed_name)
        elif text_snippet:
            recommendations = AdminRecommendations.objects.filter(recommendation__icontains=text_snippet)
        else:
            return Response({'error': 'No search criteria provided'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = AdminRecommendationsSerializer(recommendations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AdminRecommendationsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class NotificationAPIView(APIView):
    def get(self, request):
        notifications = Notification.objects.all()
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)