from functools import wraps
import requests
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .api_utils import CAR_AVAILABILITY_API, CAR_LOCATIONS_API, CAR_RESERVATIONS_API, get_access_token, CLIENT_ID as client_id, CLIENT_SECRET as client_secret
from .models import *
from .serializers import *



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username #grabs the specified attributes of the user model. 'token' here is basically in encripted dictionary
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):   #creates a new view for the serialized information that's based off the old template by inheriting the old method ('template')
    serializer_class = MyTokenObtainPairSerializer

class SignupView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    # this is all it needs to make a user. Doesn't use other stuff because?? remember serializer maps model to json
    # try adding email since its included in the modesl
    def perform_create(self, serializer):   
        if serializer.is_valid(raise_exception=True):
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            email = serializer.validated_data["email"]
            try:
                User.objects.create_user(username=username, password=password, email=email)
            except:
                return Response({'error': 'Username already exists'})

# view, update user personal information
@api_view(['GET','PUT'])
def view_or_update_user (request, user_id):
    if request.method == 'GET':
        user_info = User.objects.get(id=user_id)
        serializer = UserSerializer(user_info)
        return Response(serializer.data)
    elif request.method == 'PUT':
        user_info = User.objects.get(id=user_id)
        serializer = UserSerializer(instance = user_info,data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    
# view, create,update or delete itinerary
@api_view(['GET','POST','PUT','DELETE'])
def itinerary(request, itinerary_id=None):
    # see all
    if request.method == 'GET':
        if itinerary_id:
            data = Itinerary.objects.get(id=itinerary_id)
            serializer = ItinerarySerializer(data)
        else:
            itineraries = Itinerary.objects.all()
            serializer = ItinerarySerializer(itineraries, many = True)
        return Response(serializer.data)
    #update 
    elif request.method == 'PUT':
        itinerary = Itinerary.objects.get(id = itinerary_id)
        serializer = ItinerarySerializer(instance = itinerary,data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    # create
    elif request.method == 'POST':
        serializer = ItinerarySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    # delete
    elif request.method == 'DELETE':
        itinerary = Itinerary.objects.get(id = itinerary_id)
        itinerary.delete()
        return Response('Itinerary has been deleted.')

# view, create, update or delete flight
@api_view(['GET','POST','PUT','DELETE'])
def flight(request, itinerary_id, flight_id=None):
    # see all 
    if request.method == 'GET':
        if flight_id:
            data = Flight.objects.get(id=flight_id)
            serializer = FlightSerializer(data)
        else:
            flights = Flight.objects.filter(itinerary_id=itinerary_id)
            serializer = FlightSerializer(flights, many = True)
        return Response(serializer.data)
    #update
    elif request.method == 'PUT':
        flight = Flight.objects.get(id = flight_id)
        serializer = FlightSerializer(instance = flight,data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    # create
    elif request.method == 'POST':
        serializer = FlightSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    # delete
    elif request.method == 'DELETE':
        flight = Flight.objects.get(id = flight_id)
        flight.delete()
        return Response('Flight has been deleted.')

# view, create, update or delete hotel
@api_view(['GET','POST','PUT','DELETE'])
def hotel(request, itinerary_id, hotel_id=None):
    # see all 
    if request.method == 'GET':
        if hotel_id:
            data = Hotel.objects.get(id=hotel_id)
            serializer = HotelSerializer(data)
        else:
            hotels = Hotel.objects.filter(itinerary_id=itinerary_id)
            serializer = HotelSerializer(hotels, many = True)
        return Response(serializer.data)
    #update 
    elif request.method == 'PUT':
        hotel = Hotel.objects.get(id = hotel_id)
        serializer = HotelSerializer(instance = hotel,data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    # create
    elif request.method == 'POST':
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    # delete
    elif request.method == 'DELETE':
        hotel = Hotel.objects.get(id = hotel_id)
        hotel.delete()
        return Response('Hotel has been deleted.')

# view, create, update or delete affinity
@api_view(['GET','POST','PUT','DELETE'])
def affinity(request, itinerary_id, affinity_id=None):
    # see all 
    if request.method == 'GET':
        if affinity_id:
            data = Affinity.objects.get(id=affinity_id)
            serializer = AffinitySerializer(data)
        else:
            affinities = Affinity.objects.filter(itinerary_id=itinerary_id)
            serializer = AffinitySerializer(affinities, many = True)
        return Response(serializer.data)
    #update 
    elif request.method == 'PUT':
        affinity = Affinity.objects.get(id = affinity_id)
        serializer = AffinitySerializer(instance = affinity,data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    # create
    elif request.method == 'POST':
        serializer = AffinitySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    # delete
    elif request.method == 'DELETE':
        affinity = Affinity.objects.get(id = affinity_id)
        affinity.delete()
        return Response('affinity has been deleted.')
    
# view, create, update or delete sight
@api_view(['GET','POST','PUT','DELETE'])
def sight(request, itinerary_id, sight_id=None):
    # see all 
    if request.method == 'GET':
        if sight_id:
            data = Sight.objects.get(id=sight_id)
            serializer = SightSerializer(data)
        else:
            sights = Sight.objects.filter(itinerary_id=itinerary_id)
            serializer = SightSerializer(sights, many = True)
        return Response(serializer.data)
    #update 
    elif request.method == 'PUT':
        sight = Sight.objects.get(id = sight_id)
        serializer = SightSerializer(instance = sight,data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    # create
    elif request.method == 'POST':
        serializer = SightSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    # delete
    elif request.method == 'DELETE':
        sight = Sight.objects.get(id = sight_id)
        sight.delete()
        return Response('Sight has been deleted.')

############################################
# AVIS API STUFF
############################################

# view, create, update or delete rental
@api_view(['GET','POST','PUT','DELETE'])
def rental(request, itinerary_id, rental_id=None):
    # see all 
    if request.method == 'GET':
        if rental_id:
            data = Rental.objects.get(id=rental_id)
            serializer = RentalSerializer(data)
        else:
            rentals = Rental.objects.filter(itinerary_id=itinerary_id)
            serializer = RentalSerializer(rentals, many = True)
        return Response(serializer.data)
    #update 
    elif request.method == 'PUT':
        rental = Rental.objects.get(id = rental_id)
        serializer = RentalSerializer(instance = rental,data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    # create
    elif request.method == 'POST':
        serializer = RentalSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
    # delete
    elif request.method == 'DELETE':
        rental = Rental.objects.get(id = rental_id)
        rental.delete()
        return Response('Rental has been deleted.')

def require_method(method):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            request = args[0]
            if request.method == method:
                return func(*args, **kwargs)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return wrapper
    return decorator

@api_view(['GET'])
def get_car_locations(country_code, brand, keyword):
    access_token = get_access_token()

    headers = {
        'client_id': client_id,
        'Authorization': f'Bearer {access_token}'
    }

    params = {
        'country_code': country_code,
        'brand': brand,
        'keyword': keyword
    }

    response = requests.get(CAR_LOCATIONS_API, headers=headers, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception("Error getting car locations: " + response.text)

@api_view(['GET'])
def home(request):
    data = [{'message': 'Welcome to Car-Rental-Agency'}]
    return JsonResponse(data, safe=False)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def car_endpoint(request, car_pk=None):
    if request.method == 'GET':
        if car_pk is None:
            cars = Car.objects.all()
            serializer = CarSerializer(cars, many=True)
        else:
            car = Car.objects.get(id=car_pk)
            serializer = CarSerializer(car)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)

    elif request.method == 'PUT':
        car = Car.objects.get(id=car_pk)
        serializer = CarSerializer(instance=car, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)

    elif request.method == 'DELETE':
        car = Car.objects.get(id=car_pk)
        car.delete()
        return Response('Car has been deleted.')

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def reservation_endpoint(request, rent_pk=None):
    if request.method == 'GET':
        if rent_pk is None:
            reservations = Reservation.objects.all()
            serializer = ReservationSerializer(reservations, many=True)
        else:
            reservation = Reservation.objects.get(id=rent_pk)
            serializer = ReservationSerializer(reservation)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)

    elif request.method == 'PUT':
        reservation = Reservation.objects.get(id=rent_pk)
        serializer = ReservationSerializer(instance=reservation, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)

    elif request.method == 'DELETE':
        reservation = Reservation.objects.get(id=rent_pk)
        reservation.delete()
        return Response('Reservation has been deleted.')