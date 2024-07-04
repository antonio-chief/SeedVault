# mydjangoapp/views.py
from rest_framework import viewsets
#from rest_framework.views import APIView
#from rest_framework.response import Response
#from rest_framework import status
from .models import Seed, Monitoring
from .serializers import SeedSerializer, MonitoringSerializer

class SeedViewSet(viewsets.ModelViewSet):
    queryset = Seed.objects.all()
    serializer_class = SeedSerializer

class MonitoringViewSet(viewsets.ModelViewSet):
    queryset = Monitoring.objects.all()
    serializer_class = MonitoringSerializer

'''class SeedAPIView(viewsets.ModelViewSet, APIView):
    def get(self, request):
        seeds = Seed.objects.all()
        output = [{"employee": seed.employee, "department": seed.department} for seed in seeds]
        return Response(output, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SeedSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MonitoringAPIView(viewsets.ModelViewSet, APIView):
    def get(self, request):
        monitoring_data = Monitoring.objects.all()
        output = [{"employee": data.employee, "department": data.department} for data in monitoring_data]
        return Response(output, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MonitoringSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''