from django.contrib import admin

# Register your models here.
# mydjangoapp/admin.py


from .models import (
    mydjangoapp_seeds, Monitoring, AdminFeedback, AdminSeedCatalog, AdminSubscription,
    DampnessAnalytics, Events, LightExposureAnalytics, Security, Storage,
    TemperatureAnalytics, User, Weather
)

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
