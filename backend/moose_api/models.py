from django.db import models
from django.contrib.auth.models import User

class Itinerary(models.Model):
    itinerary_name = models.CharField(max_length=250)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    summary = models.TextField(null=True)

    def __str__(self) -> str:
        return self.itinerary_name

class Hotel(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    itinerary_id = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='hotels')
    hotel_name = models.CharField(max_length=250)
    location = models.CharField(max_length=250) 
    check_in_date = models.DateField(auto_now=False, auto_now_add=False) 
    check_out_date = models.DateField(auto_now=False, auto_now_add=False)

    def __str__(self) -> str:
        return self.hotel_name

class Flight(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    itinerary_id = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='flights')
    flight_type = models.CharField(max_length=250) 
    departure = models.CharField(max_length=250)
    destination = models.CharField(max_length=250)
    price = models.CharField(max_length=250, null=True)
    return_date = models.DateField(auto_now=False, auto_now_add=False, null=True) 
    departure_date = models.DateField(auto_now=False, auto_now_add=False, null=True) 

    def __str__(self) -> str:
        return f"itinerary:{self.itinerary_id}, {self.departure} - {self.destination}"

class Affinity(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    itinerary_id = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='affinities')
    affinity_type = models.CharField(max_length=250)
    def __str__(self) -> str:
        return f"itinerary:{self.itinerary_id}, {self.affinity_type}"


class Sight(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    itinerary_id = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='sights')
    sight_name = models.CharField(max_length=250)
    lat = models.CharField(max_length=20)
    long = models.CharField(max_length=20)
    def __str__(self) -> str:
        return f"itinerary:{self.itinerary_id}, {self.sight_name}"
    
    
class Car(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    itinerary_id = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='cars')
    model = models.CharField(max_length=50)
    make = models.CharField(max_length=50)
    price = models.CharField(max_length=50)
    rental_company = models.CharField(max_length=50)
    pick_up_location = models.CharField(max_length=250)
    return_location = models.CharField(max_length=250)
    pick_up_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    return_date = models.DateTimeField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return self.model

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    issue_date = models.DateField()
    return_date = models.DateField()

    def __str__(self):
        return str(self.user) + "- " + str(self.car)