'''from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SeedViewSet

router = DefaultRouter()
router.register(r'seeds', SeedViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
'''
# mydjangoapp/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SeedViewSet

router = DefaultRouter()
router.register(r'seedvault', SeedViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
