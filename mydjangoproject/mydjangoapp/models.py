from django.db import models

# Create your models here.
from djongo import models

class Seed(models.Model):
    SeedID = models.CharField(max_length=100)
    SeedCategory = models.CharField(max_length=255)
    SeedType = models.CharField(max_length=255)
    DateBought = models.CharField(max_length=255)
    ExpiryDate = models.CharField(max_length=255)
    PlantingDate = models.CharField(max_length=255)
    TemperatureRequirement = models.CharField(max_length=255)
    LightRequirement = models.IntegerField()
    MoistureRequirement = models.IntegerField()
    SeedQuantity = models.IntegerField()


    def __str__(self):
        return self.name

    class Meta:
        db_table = 'UserSeedCatalog'  # MongoDB collection name
