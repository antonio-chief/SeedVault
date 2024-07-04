# mydjangoapp/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SeedViewSet, MonitoringViewSet #,SeedAPIView, MonitoringAPIView

# Define your router for DRF viewsets
router = DefaultRouter()
router.register(r'seeds', SeedViewSet, basename='seeds')
router.register(r'monitoring', MonitoringViewSet, basename='monitoring')

urlpatterns = [
    path('', include(router.urls)),  # Include router URLs under 'api/' prefix
    #path('seeds/', SeedAPIView.as_view(), name='seed-list-create'),  # Using APIView for seeds endpoint
    #path('monitoring/', MonitoringAPIView.as_view(), name='monitoring-list-create'),  # Using APIView for monitoring endpoint
]
