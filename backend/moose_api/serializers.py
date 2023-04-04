from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class SignupSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "email"]

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password','email']

class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = '__all__'

    def create(self, validated_data):
        return Itinerary.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.itinerary_name = validated_data.get('itinerary_name', instance.itinerary_name)
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.save()
        return instance

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = "__all__"

    def create(self, validated_data):
        return Hotel.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.itinerary_id = validated_data.get('itinerary_id', instance.itinerary_id)
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.hotel_name = validated_data.get('hotel_name', instance.hotel_name)
        instance.location = validated_data.get('location', instance.location)
        instance.check_in_date = validated_data.get('check_in_date', instance.check_in_date)
        instance.check_out_date= validated_data.get('check_out_date', instance.check_out_date)
        instance.save()
        return instance

class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = "__all__"

    def create(self, validated_data):
        return Flight.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.itinerary_id = validated_data.get('itinerary_id', instance.itinerary_id)
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.flight_type = validated_data.get('flight_type', instance.flight_type)
        instance.departure = validated_data.get('departure', instance.departure)
        instance.destination = validated_data.get('destination', instance.destination)
        instance.arrival_date= validated_data.get('arrival_date', instance.arrival_date)
        instance.departure_date= validated_data.get('departure_date', instance.departure_date)
        instance.save()
        return instance

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = "__all__"

    def create(self, validated_data):
        return Rental.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.itinerary_id = validated_data.get('itinerary_id', instance.itinerary_id)
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.rental_company = validated_data.get('rental_company', instance.rental_company)
        instance.pick_up_location = validated_data.get('pick_up_location', instance.pick_up_location)
        instance.return_location = validated_data.get('return_location', instance.return_location)
        instance.pick_up_date= validated_data.get('pick_up_date', instance.pick_up_date)
        instance.return_date= validated_data.get('return_date', instance.return_date)
        instance.save()
        return instance

class AffinitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Affinity
        fields = "__all__"

    def create(self,    validated_data):
        return Affinity.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.itinerary_id = validated_data.get('itinerary_id', instance.itinerary_id)
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.affinity_type = validated_data.get('affinity_type', instance.affinity_type)
        instance.save()
        return instance

class SightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sight
        fields = "__all__"

    def create(self, validated_data):
        return Sight.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.itinerary_id = validated_data.get('itinerary_id', instance.itinerary_id)
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.sight_name = validated_data.get('sight_name', instance.sight_name)
        instance.save()
        return instance

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'vehicle_number', 'model', 'seating_capacity', 'rent_per_day']

class AvailableCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'vehicle_number', 'model', 'seating_capacity', 'rent_per_day', 'availability']

class CarReservationSerializer(serializers.Serializer):
    product = serializers.DictField(required=True)
    transaction = serializers.DictField(required=True)
    reservation = serializers.DictField(required=True)
    rate_totals = serializers.DictField(required=True)
    passenger = serializers.DictField(required=True)

    def create(self, validated_data):
        return CarReservation.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.product = validated_data.get('product', instance.product)
        instance.transaction = validated_data.get('transaction', instance.transaction)
        instance.reservation = validated_data.get('reservation', instance.reservation)
        instance.rate_totals = validated_data.get('rate_totals', instance.rate_totals)
        instance.passenger = validated_data.get('passenger', instance.passenger)
        instance.save()
        return instance

