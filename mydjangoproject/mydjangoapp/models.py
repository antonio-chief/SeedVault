'''from django.db import models

# Create your models here.
from djongo import models

class Seed(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    germination_rate = models.FloatField()

    def __str__(self):
        return self.name
'''