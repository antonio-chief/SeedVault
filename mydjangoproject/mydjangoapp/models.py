from django.db import models
from django.utils import timezone
# Create your models here.

#UserSeedCatalog
class mydjangoapp_seeds(models.Model):

    CATEGORIES = [
        ('seed', 'Seed'),
        ('germplasm', 'Germplasm'),
    ]
    TYPES = [
        ('herb', 'Herb'),
        ('other', 'Other'),
    ]

    SeedID = models.CharField(max_length=100)
    SeedCategory = models.CharField(max_length=255)
    SeedType = models.CharField(max_length=255)
    DateBought = models.DateTimeField(default= timezone.now)
    ExpiryDate = models.DateTimeField(default= timezone.now)
    PlantingDate = models.DateTimeField(default= timezone.now)
    TemperatureRequirement = models.FloatField()
    LightRequirement = models.FloatField()
    MoistureRequirement = models.FloatField()
    SeedQuantity = models.IntegerField()


    def __str__(self):
        return self.SeedType

   

#Monitoring
class Monitoring(models.Model):
    SeedID = models.CharField(max_length=100)
    CurrentTemperature = models.CharField(max_length=100)
    OptimalTemperature = models.CharField(max_length=100)
    LowTemperatureLimit = models.CharField(max_length=100)
    HighTemperatureLimit = models.CharField(max_length=100)
    CurrentDampness = models.FloatField()
    OptimalDampness = models.FloatField()
    LowDampnessLimit = models.FloatField()
    HighDampnessLimit = models.FloatField()
    CurrentLight = models.FloatField()
    OptimalLight = models.FloatField()
    LowLightLimit = models.FloatField()
    HighLightLimit = models.FloatField()

    def __str__(self):
        return self.SeedID

  

# AdminAllUsers Model
class AdminAllUsers(models.Model):
    UserID = models.CharField(max_length=100, unique=True)
    UserName = models.CharField(max_length=100)
    UserEmail = models.EmailField(max_length=100)
    UserPassword = models.CharField(max_length=100)  # Use CharField for password
    SubscriptionStatus = models.CharField(max_length=50)
    Location = models.CharField(max_length=255)
    Age = models.IntegerField()
    Gender = models.CharField(max_length=10)

    def __str__(self):
        return self.UserName
# AdminFeedback Model
class AdminFeedback(models.Model):
    UserID = models.CharField(max_length=100)
    Feedback = models.TextField()
    Responses = models.TextField()
    Reports = models.TextField()

    def __str__(self):
        return self.UserID

# AdminSeedCatalog Model
class AdminSeedCatalog(models.Model):
    SeedID = models.CharField(max_length=100)
    Category = models.CharField(max_length=50)
    SeedType = models.CharField(max_length=50)
    SeedName = models.CharField(max_length=100)
    OptimalTemperature = models.CharField(max_length=50)
    LowestTemp = models.CharField(max_length=50)
    HighestTemp = models.CharField(max_length=50)
    OptimalDampness = models.FloatField()
    LowestDampness = models.FloatField()
    HighestDampness = models.FloatField()
    OptimalLight = models.FloatField()
    LowestLight = models.FloatField()
    HighestLight = models.FloatField()
    BestPlantingWeather = models.CharField(max_length=50)
    BestPlantingMonth = models.CharField(max_length=50)
    AreaMostPlanted = models.CharField(max_length=100)

    def __str__(self):
        return self.SeedName

# AdminSubscription Model
class AdminSubscription(models.Model):
    UserID = models.CharField(max_length=100)
    UserName = models.CharField(max_length=100)
    UserEmail = models.EmailField(max_length=100)
    SubscriptionStatus = models.CharField(max_length=50)
    Premium = models.CharField(max_length=10)
    Payment = models.CharField(max_length=50)
    Billing = models.CharField(max_length=50)

    def __str__(self):
        return self.UserName

# DampnessAnalytics Model
class DampnessAnalytics(models.Model):
    SeedID = models.CharField(max_length=100)
    SeedCategory = models.CharField(max_length=50)
    SeedName = models.CharField(max_length=100)
    CurrentDampness = models.FloatField()
    OptimalDampness = models.FloatField()
    LowDampnessLimit = models.FloatField()
    HighDampnessLimit = models.FloatField()
    MorningDampness = models.FloatField()
    NoonDampness = models.FloatField()
    EveningDampness = models.FloatField()
    NightDampness = models.FloatField()
    DampnessToday = models.FloatField()
    DampnessYesterday = models.FloatField()
    DampnessLastWeek = models.FloatField()
    DampnessLastMonth = models.FloatField()

    def __str__(self):
        return self.DampnessToday

# Events Model
class Events(models.Model):
    Date = models.CharField(max_length=50)
    Event = models.CharField(max_length=100)
    EventLocation = models.CharField(max_length=255)
    AreasWithEvents = models.CharField(max_length=255)
    SeedToPlant = models.CharField(max_length=100)
    SeedID = models.CharField(max_length=100)

    def __str__(self):
        return self.Event

# LightExposureAnalytics Model
class LightExposureAnalytics(models.Model):
    SeedID = models.CharField(max_length=100)
    SeedCategory = models.CharField(max_length=50)
    SeedName = models.CharField(max_length=100)
    CurrentLight = models.FloatField()
    OptimalLight = models.FloatField()
    LowLightLimit = models.FloatField()
    HighLightLimit = models.FloatField()
    MorningLight = models.FloatField()
    NoonLight = models.FloatField()
    EveningLight = models.FloatField()
    NightLight = models.FloatField()
    LightToday = models.FloatField()
    LightYesterday = models.FloatField()
    LightLastWeek = models.FloatField()
    LightLastMonth = models.FloatField()

    def __str__(self):
        return self.LightToday

# Security Model
class Security(models.Model):
    PersonID = models.CharField(max_length=50)
    DateAccessed = models.CharField(max_length=50)
    TimeAccessed = models.CharField(max_length=50)
    RestrictedAreas = models.CharField(max_length=255)
    PlaceAccessed = models.CharField(max_length=255)

    def __str__(self):
        return self.PersonID

# Storage Model
class Storage(models.Model):
    SeedID = models.CharField(max_length=100)
    WarehouseName = models.CharField(max_length=100)
    WarehouseNo = models.IntegerField()
    ShelfNo = models.IntegerField()
    UnitNo = models.IntegerField()
    VaultName = models.CharField(max_length=100)
    VaultNo = models.IntegerField()
    SeedBankName = models.CharField(max_length=100)
    SeedBankNo = models.IntegerField()
    SeedCaseNo = models.IntegerField()
    CaseSectionNo = models.IntegerField()
    SeedBoxNo = models.IntegerField()
    BoxUnitNo = models.IntegerField()
    SeedAlbumNo = models.IntegerField()
    PageNo = models.IntegerField()

    def __str__(self):
        return self.SeedID

# TemperatureAnalytics Model
class TemperatureAnalytics(models.Model):
    SeedID = models.CharField(max_length=100)
    SeedCategory = models.CharField(max_length=50)
    SeedName = models.CharField(max_length=100)
    CurrentTemperature = models.CharField(max_length=50)
    OptimalTemperature = models.CharField(max_length=50)
    LowTemperatureLimit = models.CharField(max_length=50)
    HighTemperatureLimit = models.CharField(max_length=50)
    MorningTemperature = models.CharField(max_length=50)
    NoonTemperature = models.CharField(max_length=50)
    EveningTemperature = models.CharField(max_length=50)
    NightTemperature = models.CharField(max_length=50)
    TemperatureToday = models.CharField(max_length=50)
    TemperatureYesterday = models.CharField(max_length=50)
    TemperatureLastWeek = models.CharField(max_length=50)
    TemperatureLastMonth = models.CharField(max_length=50)

    def __str__(self):
        return self.CurrentTemperature

# User Model
class User(models.Model):
    UserID = models.CharField(max_length=100, unique=True)
    UserName = models.CharField(max_length=100)
    UserEmail = models.EmailField(max_length=100)
    UserPassword = models.CharField(max_length=100)  # Use CharField for password

    def __str__(self):
        return self.UserName

# Weather Model
class Weather(models.Model):
    WeatherToday = models.CharField(max_length=50)
    WeatherTomorrow = models.CharField(max_length=50)
    WeatherNextWeek = models.CharField(max_length=50)
    WeatherNextMonth = models.CharField(max_length=50)
    SuitablePlant = models.CharField(max_length=100)
    SunnyTemperature = models.CharField(max_length=50)
    SunnyDampness = models.FloatField()
    SunnyLight = models.FloatField()
    RainyTemperature = models.CharField(max_length=50)
    RainyDampness = models.FloatField()
    RainyLight = models.FloatField()
    CloudyTemperature = models.CharField(max_length=50)
    CloudyDampness = models.FloatField()
    CloudyLight = models.FloatField()
    SeedID = models.CharField(max_length=100)
    SuitabilityToSeed = models.CharField(max_length=50)
    SeedToCheck = models.CharField(max_length=100)

    def __str__(self):
        return self.WeatherToday




#models to add: workers, equipment_status, 


class Worker(models.Model):
    WorkerID = models.CharField(max_length=50)
    Name = models.CharField(max_length=100)
    AssignedPlace = models.CharField(max_length=255)
    Image = models.ImageField(upload_to='worker_images/', blank=True, null=True)

    def __str__(self):
        return self.Name

class RestrictedArea(models.Model):
    AreaName = models.CharField(max_length=100)
    Reason = models.TextField()

    def __str__(self):
        return self.AreaName

class SecurityBreach(models.Model):
    BreachID = models.CharField(max_length=50)
    Date = models.DateField()
    Time = models.TimeField()
    Description = models.TextField()

    def __str__(self):
        return self.BreachID

class EquipmentStatus(models.Model):
    EquipmentID = models.CharField(max_length=50)
    Status = models.CharField(max_length=100)
    LastUpdated = models.DateTimeField()

    def __str__(self):
        return self.EquipmentID




class Totals(models.Model):
    planted = models.IntegerField(default=0)
    in_inventory = models.IntegerField(default=0)
    older = models.IntegerField(default=0)
    newer = models.IntegerField(default=0)

    def __str__(self):
        return "Totals"

class StorageFacilities(models.Model):
    used = models.IntegerField(default=0)
    free = models.IntegerField(default=0)

    def __str__(self):
        return "StorageFacilities"

 
class AdminRecommendations(models.Model):
    seed_name = models.CharField(max_length=255)
    text_snippet = models.TextField()
    

    def __str__(self):
        return f'Recommendation for {self.seed_name}'