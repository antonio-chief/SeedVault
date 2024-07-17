# mydjangoapp/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SeedViewSet, MonitoringViewSet, AdminFeedbackViewSet, AdminSeedCatalogViewSet,
    AdminSubscriptionViewSet, DampnessAnalyticsViewSet, EventsViewSet, 
    LightExposureAnalyticsViewSet, SecurityViewSet, StorageViewSet, 
    TemperatureAnalyticsViewSet, UserViewSet, WeatherViewSet,
    SeedAPIView, MonitoringAPIView, AdminFeedbackAPIView, AdminSeedCatalogAPIView,
    AdminSubscriptionAPIView, DampnessAnalyticsAPIView, EventsAPIView,
    LightExposureAnalyticsAPIView, SecurityAPIView, StorageAPIView,
    TemperatureAnalyticsAPIView, UserAPIView, WeatherAPIView
)

# Define your router for DRF viewsets
router = DefaultRouter()
router.register(r'seeds', SeedViewSet, basename='seeds')
router.register(r'monitoring', MonitoringViewSet, basename='monitoring')
router.register(r'admin-feedback', AdminFeedbackViewSet, basename='admin-feedback')
router.register(r'admin-seed-catalog', AdminSeedCatalogViewSet, basename='admin-seed-catalog')
router.register(r'admin-subscription', AdminSubscriptionViewSet, basename='admin-subscription')
router.register(r'dampness-analytics', DampnessAnalyticsViewSet, basename='dampness-analytics')
router.register(r'events', EventsViewSet, basename='events')
router.register(r'light-exposure-analytics', LightExposureAnalyticsViewSet, basename='light-exposure-analytics')
router.register(r'security', SecurityViewSet, basename='security')
router.register(r'storage', StorageViewSet, basename='storage')
router.register(r'temperature-analytics', TemperatureAnalyticsViewSet, basename='temperature-analytics')
router.register(r'user', UserViewSet, basename='user')
router.register(r'weather', WeatherViewSet, basename='weather')

urlpatterns = [
    path('', include(router.urls)),  # Include router URLs under 'api/' prefix

    # APIView endpoints
    path('seeds/', SeedAPIView.as_view(), name='seed-list-create'),
    path('monitoring/', MonitoringAPIView.as_view(), name='monitoring-list-create'),
    path('admin-feedback/', AdminFeedbackAPIView.as_view(), name='admin-feedback-list-create'),
    path('admin-seed-catalog/', AdminSeedCatalogAPIView.as_view(), name='admin-seed-catalog-list-create'),
    path('admin-subscription/', AdminSubscriptionAPIView.as_view(), name='admin-subscription-list-create'),
    path('dampness-analytics/', DampnessAnalyticsAPIView.as_view(), name='dampness-analytics-list-create'),
    path('events/', EventsAPIView.as_view(), name='events-list-create'),
    path('light-exposure-analytics/', LightExposureAnalyticsAPIView.as_view(), name='light-exposure-analytics-list-create'),
    path('security/', SecurityAPIView.as_view(), name='security-list-create'),
    path('storage/', StorageAPIView.as_view(), name='storage-list-create'),
    path('temperature-analytics/', TemperatureAnalyticsAPIView.as_view(), name='temperature-analytics-list-create'),
    path('user/', UserAPIView.as_view(), name='user-list-create'),
    path('weather/', WeatherAPIView.as_view(), name='weather-list-create'),
]

