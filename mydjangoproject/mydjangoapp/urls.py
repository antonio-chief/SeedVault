'''from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SeedViewSet

router = DefaultRouter()
router.register(r'seeds', SeedViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
'''