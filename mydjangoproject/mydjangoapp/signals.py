from django.db.models.signals import post_save
from django.dispatch import receiver
from mydjangoapp.models import AdminSeedCatalog, Monitoring
import logging

# Set up logging
logger = logging.getLogger(__name__)

@receiver(post_save, sender=Monitoring)
def update_monitoring_from_catalog(sender, instance, created, **kwargs):
    if created:
        # Fetch the corresponding entry from AdminSeedCatalog
        try:
            catalog_entry = AdminSeedCatalog.objects.get(SeedID=instance.SeedID)
            
            # Prepare a dictionary of fields to update
            updates = {}
            if not instance.OptimalTemperature:
                updates['OptimalTemperature'] = catalog_entry.OptimalTemperature
            if not instance.HighTemperatureLimit:
                updates['HighTemperatureLimit'] = catalog_entry.HighestTemp
            if not instance.LowTemperatureLimit:
                updates['LowTemperatureLimit'] = catalog_entry.LowestTemp
            if not instance.OptimalDampness:
                updates['OptimalDampness'] = catalog_entry.OptimalDampness
            if not instance.HighDampnessLimit:
                updates['HighDampnessLimit'] = catalog_entry.HighestDampness
            if not instance.LowDampnessLimit:
                updates['LowDampnessLimit'] = catalog_entry.LowestDampness
            if not instance.OptimalLight:
                updates['OptimalLight'] = catalog_entry.OptimalLight
            if not instance.HighLightLimit:
                updates['HighLightLimit'] = catalog_entry.HighestLight
            if not instance.LowLightLimit:
                updates['LowLightLimit'] = catalog_entry.LowestLight
            
            # Update only the fields that are missing values
            if updates:
                Monitoring.objects.filter(pk=instance.pk).update(**updates)
        
        except AdminSeedCatalog.DoesNotExist:
            # Log the case where the catalog entry does not exist
            logger.error(f"AdminSeedCatalog entry with SeedID {instance.SeedID} does not exist.")
        except Exception as e:
            # Log unexpected errors
            logger.error(f"Error updating Monitoring entry: {e}")
