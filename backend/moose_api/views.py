from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from .serializers import SignupSerializer
from .serializers import *
import datetime
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
# from .sabre import search_rental_cars


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
            itineraries = Itinerary.objects.filter(user_id=request.user.id)
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

@api_view(['POST'])
def rental_car_search(request):
    location = request.data.get('location')
    pickup_date = request.data.get('pickup_date')
    dropoff_date = request.data.get('dropoff_date')

    try:
        access_token = 'T1RLAQK9Nxp2ebr3kkR2PxF1UoSBAEV4XUfLbrh0AEoDQasfERCfBCPK0orePAe/63bbdpWqAADgSTUaP+035C9mKvWzSSdtXv2WpeLgBaZcLbuMC9HlvuC/KXezYWSyEklgKBBNnV2LHy0ulw0Sy0PVvZk/pDp367/1BjHc07hD3ldc5xP7isWzWm0Kzvb792dA6AtNic2VftZTXax+asTX4kf5cIkbJonj285S1ouf/7fqTEaNwkyUS2glC2fBzfTjQN50kUVcGWlsNUpeEbW4MG2UilzVnvrYXiDOeOku6IQpKjEmQGmv7xbzEuXneeiT0eiK5P0uTqXAOPM5E+tGGePc8MAT+O9FYFswZ9cdY1+8EGclhwk*'

        response_data = search_rental_cars(location, pickup_date, dropoff_date, access_token)
        return Response(response_data)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['POST'])
def rental_car_submission(request):
    # Collect user information from request data
    name = request.data.get('name')
    email = request.data.get('email')
    phone = request.data.get('phone')
    pickup_location = request.data.get('pickup_location')
    pickup_date = request.data.get('pickup_date')
    dropoff_location = request.data.get('dropoff_location')
    dropoff_date = request.data.get('dropoff_date')

    # Validate user information
    if not name or not email or not phone or not pickup_location or not pickup_date or not dropoff_location or not dropoff_date:
        return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
    # Check that pickup and dropoff dates are valid and in the future
    today = datetime.date.today()
    try:
        pickup_date = datetime.datetime.strptime(pickup_date, '%Y-%m-%d').date()
        dropoff_date = datetime.datetime.strptime(dropoff_date, '%Y-%m-%d').date()
    except ValueError:
        return Response({'error': 'Invalid date format. Please use yyyy-mm-dd.'}, status=status.HTTP_400_BAD_REQUEST)
    if pickup_date <= today or dropoff_date <= today:
        return Response({'error': 'Pickup and dropoff dates must be in the future.'}, status=status.HTTP_400_BAD_REQUEST)

    # Submit rental request
    rental_request = {
        'name': name,
        'email': email,
        'phone': phone,
        'pickup_location': pickup_location,
        'pickup_date': pickup_date.strftime('%Y-%m-%d'),
        'dropoff_location': dropoff_location,
        'dropoff_date': dropoff_date.strftime('%Y-%m-%d')
    }
    response = request.post('https://api.rentalcaragency.com/rental_requests', json=rental_request)
    if response.status_code == 200:
        # Display confirmation message to user
        return Response({'message': 'Rental request submitted successfully.'}, status=status.HTTP_200_OK)
    else:
        # Handle errors from the API
        return Response({'error': 'Failed to submit rental request.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
