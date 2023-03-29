  
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Itinerary(models.Model):
    itinerary_name = models.CharField(max_length=250)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    summary = models.TextField(null=True)

    def __str__(self) -> str:
        return self.itinerary_name

class Hotel(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    itinerary_id = models.ForeignKey(Itinerary, on_delete=models.CASCADE)
    hotel_name = models.CharField(max_length=250)
    location = models.CharField(max_length=250) 
    check_in_date = models.DateField(auto_now=False, auto_now_add=False) 
    check_out_date = models.DateField(auto_now=False, auto_now_add=False)

    def __str__(self) -> str:
        return self.hotel_name

class Flight(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    itinerary_id = models.ForeignKey(Itinerary, on_delete=models.CASCADE)
    flight_type = models.CharField(max_length=250) 
    departure = models.CharField(max_length=250)
    destination = models.CharField(max_length=250)
    arrival_date = models.DateField(auto_now=False, auto_now_add=False) 
    departure_date = models.DateField(auto_now=False, auto_now_add=False) 

    def __str__(self) -> str:
        return f"itinerary:{self.itinerary_id}, {self.departure} - {self.destination}"


class Rental(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    itinerary_id = models.ForeignKey(Itinerary, on_delete=models.CASCADE)
    rental_company = models.CharField(max_length=250, default='')
    pick_up_location = models.CharField(max_length=250)
    return_location = models.CharField(max_length=250)
    pick_up_date = models.DateField(auto_now=False, auto_now_add=False)
    return_date = models.DateField(auto_now=False, auto_now_add=False)

    def __str__(self) -> str:
        return f"itinerary:{self.itinerary_id}, {self.rental_company}"

class Affinity(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    itinerary_id = models.ForeignKey(Itinerary, on_delete=models.CASCADE)
    affinity_type = models.CharField(max_length=250)
    def __str__(self) -> str:
        return f"itinerary:{self.itinerary_id}, {self.affinity_type}"


class Sight(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    itinerary_id = models.ForeignKey(Itinerary, on_delete=models.CASCADE)
    sight_name = models.CharField(max_length=250)
    def __str__(self) -> str:
        return f"itinerary:{self.itinerary_id}, {self.sight_name}"