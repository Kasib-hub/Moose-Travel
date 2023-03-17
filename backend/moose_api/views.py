
from rest_framework.response import Response
from rest_framework.decorators import api_view
#from the simpleJWT Docs 'Customizing token claims'
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import SignupSerializer
from .serializers import * 
from rest_framework.permissions import AllowAny

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
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            email = serializer.validated_data["email"]
            try:
                User.objects.create_user(username=username, password=password, email=email)
            except:
                return Response({'error': 'Username already exists'})

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh'

    ]

    return Response(routes)

# view, create,update or delete itinerary
@api_view(['GET','POST','PUT','DELETE'])
def itinerary(request):
    # see all
    if request.method == 'GET':
        itineraries = Itinerary.objects.all()
        serializer = ItinerarySerializer(itineraries, many = True)
        return Response(serializer.data)
    #update 
    elif request.method == 'PUT':
        itinerary_id = request.data['id']
        itinerary = Itinerary.objects.get(id = itinerary_id)
        serializer = ItinerarySerializer(instance = itinerary,data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    # create
    elif request.method == 'POST':
        serializer = ItinerarySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    # delete
    elif request.method == 'DELETE':
        itinerary_id = request.data['id']
        itinerary = Itinerary.objects.get(id = itinerary_id)
        itinerary.delete()
        return Response('Itinerary has been deleted.')

# view, create, update or delete flight
@api_view(['GET','POST','PUT','DELETE'])
def flight(request):
    # see all 
    if request.method == 'GET':
        flights = Flight.objects.all()
        serializer = FlightSerializer(flights, many = True)
        return Response(serializer.data)
    #update
    elif request.method == 'PUT':
        flight_id = request.data['id']
        flight = Flight.objects.get(id = flight_id)
        serializer = FlightSerializer(instance = flight,data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    # create
    elif request.method == 'POST':
        serializer = FlightSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    # delete
    elif request.method == 'DELETE':
        flight_id = request.data['id']
        flight = Flight.objects.get(id = flight_id)
        Flight.delete()
        return Response('Flight has been deleted.')

# view, create, update or delete hotel
@api_view(['GET','POST','PUT','DELETE'])
def hotel(request):
    # see all 
    if request.method == 'GET':
        hotels = Hotel.objects.all()
        serializer = HotelSerializer(hotels, many = True)
        return Response(serializer.data)
    #update 
    elif request.method == 'PUT':
        hotel_id = request.data['id']
        hotel = Hotel.objects.get(id = hotel_id)
        serializer = HotelSerializer(instance = hotel,data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    # create
    elif request.method == 'POST':
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    # delete
    elif request.method == 'DELETE':
        hotel_id = request.data['id']
        hotel = Hotel.objects.get(id = hotel_id)
        Hotel.delete()
        return Response('Hotel has been deleted.')

# view, create, update or delete rental
@api_view(['GET','POST','PUT','DELETE'])
def rental(request):
    # see all 
    if request.method == 'GET':
        rentals = Rental.objects.all()
        serializer = RentalSerializer(rentals, many = True)
        return Response(serializer.data)
    #update 
    elif request.method == 'PUT':
        rental_id = request.data['id']
        rental = Rental.objects.get(id = rental_id)
        serializer = RentalSerializer(instance = rental,data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    # create
    elif request.method == 'POST':
        serializer = RentalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    # delete
    elif request.method == 'DELETE':
        rental_id = request.data['id']
        rental = Rental.objects.get(id = rental_id)
        Rental.delete()
        return Response('Rental has been deleted.')

# view, create, update or delete affinity
@api_view(['GET','POST','PUT','DELETE'])
def affinity(request):
    # see all 
    if request.method == 'GET':
        affinities = Affinity.objects.all()
        serializer = AffinitySerializer(affinities, many = True)
        return Response(serializer.data)
    #update 
    elif request.method == 'PUT':
        affinity_id = request.data['id']
        affinity = Affinity.objects.get(id = affinity_id)
        serializer = AffinitySerializer(instance = affinity,data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    # create
    elif request.method == 'POST':
        serializer = AffinitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    # delete
    elif request.method == 'DELETE':
        affinity_id = request.data['id']
        affinity = Affinity.objects.get(id = affinity_id)
        Affinity.delete()
        return Response('Rental has been deleted.')
    
# view, create, update or delete sight
@api_view(['GET','POST','PUT','DELETE'])
def sight(request):
    # see all 
    if request.method == 'GET':
        sights = Sight.objects.all()
        serializer = SightSerializer(sights, many = True)
        return Response(serializer.data)
    #update 
    elif request.method == 'PUT':
        sight_id = request.data['id']
        sight = Sight.objects.get(id = sight_id)
        serializer = SightSerializer(instance = sight,data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    # create
    elif request.method == 'POST':
        serializer = SightSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    # delete
    elif request.method == 'DELETE':
        sight_id = request.data['id']
        sight = Sight.objects.get(id = sight_id)
        Sight.delete()
        return Response('Rental has been deleted.')