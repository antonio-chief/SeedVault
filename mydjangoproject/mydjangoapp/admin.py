from django.contrib import admin

# Register your models here.
# mydjangoapp/admin.py


from .models import *

admin.site.register(mydjangoapp_seeds)
admin.site.register(Monitoring)
admin.site.register(AdminFeedback)
admin.site.register(AdminSeedCatalog)
admin.site.register(AdminSubscription)
admin.site.register(DampnessAnalytics)
admin.site.register(Events)
admin.site.register(LightExposureAnalytics)
admin.site.register(Security)
admin.site.register(Storage)
admin.site.register(TemperatureAnalytics)
admin.site.register(User)
admin.site.register(Weather)
admin.site.register(Worker)
admin.site.register(RestrictedArea)
admin.site.register(SecurityBreach)
admin.site.register(EquipmentStatus)
admin.site.register(Totals)
admin.site.register(StorageFacilities)
admin.site.register(AdminRecommendations)