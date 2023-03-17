
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
#from the simpleJWT Docs 'Customizing token claims'
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import HttpResponse

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
    # see all itineraries
    if request.method == 'GET':
        itineraries = Itinerary.objects.all()
        serializer = ItinerarySerializer(itineraries, many = True)
        return Response(serializer.data)
    #update new itinerary
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
        object_id = request.data['id']
        # def delete_object(request, object_id):
        try:
            itinerary_to_delete = Itinerary.objects.get(id=object_id)
            itinerary_to_delete.delete()
            return HttpResponse("Itinerary deleted successfully")
        except Itinerary.DoesNotExist:
            return HttpResponse("Itinerary does not exist")
        except MultiValueDictKeyError:
            return HttpResponse("Invalid form data")
        # itinerary_id = request.data['id']
        # itinerary = Itinerary.objects.get(id = itinerary_id)
        # itinerary.delete()
        # return Response('Itinerary has been deleted.')



# @api_view(['GET'])
# def view_itinerary(request, pk):
#     itinerary = Itinerary.objects.get(id = pk)
#     serializer = ItinerarySerializer(itinerary, many = False)
#     return Response(serializer.data)

# @api_view(['POST'])
# def create_itinerary(request):
#     serializer = ItinerarySerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['POST'])
# def update_itinerary(request, pk):
#     itinerary = Itinerary.objects.get(id = pk)
#     serializer = ItinerarySerializer(instance = itinerary,data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['DELETE'])
# def delete_itinerary(request, pk):
#     itinerary = Itinerary.objects.get(id = pk)
#     itinerary.delete()
#     return Response('Itinerary has been deleted.')

# view, select,update or delete flight
# @api_view(['GET'])
# def view_all_flights(request):
#     flights = Flight.objects.all()
#     serializer = FlightSerializer(flights, many = True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def view_flight(request, pk):
#     flight = Flight.objects.get(id = pk)
#     serializer = FlightSerializer(flight, many = False)
#     return Response(serializer.data)

# @api_view(['POST'])
# def select_flight(request):
#     serializer = FlightSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['POST'])
# def update_flight(request, pk):
#     flight = Flight.objects.get(id = pk)
#     serializer = FlightSerializer(instance = flight, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['DELETE'])
# def delete_flight(request, pk):
#     flight = Flight.objects.get(id = pk)
#     flight.delete()
#     return Response('Flight has been deleted.')

# # view, select,update or delete hotel
# @api_view(['GET'])
# def view_all_hotels(request):
#     hotels = Hotel.objects.all()
#     serializer = HotelSerializer(hotels, many = True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def view_hotel(request, pk):
#     hotel = Hotel.objects.get(id = pk)
#     serializer = HotelSerializer(hotel, many = False)
#     return Response(serializer.data)

# @api_view(['POST'])
# def select_hotel(request):
#     serializer = HotelSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['POST'])
# def update_hotel(request, pk):
#     hotel = Hotel.objects.get(id = pk)
#     serializer = HotelSerializer(instance = hotel,data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['DELETE'])
# def delete_hotel(request, pk):
#     hotel = Hotel.objects.get(id = pk)
#     hotel.delete()
#     return Response('Hotel has been deleted.')

# # view, elect,update or delete rental
# @api_view(['GET'])
# def view_all_rentals(request):
#     rentals = Rental.objects.all()
#     serializer = RentalSerializer(rentals, many = True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def view_rental(request, pk):
#     rental = Rental.objects.get(id = pk)
#     serializer = RentalSerializer(rental, many = False)
#     return Response(serializer.data)

# @api_view(['POST'])
# def select_rental(request):
#     serializer = RentalSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['POST'])
# def update_rental(request, pk):
#     rental = Rental.objects.get(id = pk)
#     serializer = RentalSerializer(instance = rental, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['DELETE'])
# def delete_rental(request, pk):
#     rental = Rental.objects.get(id = pk)
#     rental.delete()
#     return Response('Rental has been deleted.')

# # view, select, update or delete Affinity
# @api_view(['GET'])
# def view_all_affinities(request):
#     affnities = Affinity.objects.all()
#     serializer = AffinitySerializer(affnities, many = True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def view_affinity(request, pk):
#     affinity = Affinity.objects.get(id = pk)
#     serializer = AffinitySerializer(affinity, many = False)
#     return Response(serializer.data)

# @api_view(['POST'])
# def select_affinity(request):
#     serializer = AffinitySerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['POST'])
# def update_affinity(request, pk):
#     affinity = Affinity.objects.get(id = pk)
#     serializer = AffinitySerializer(instance = affinity,data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['DELETE'])
# def delete_affinity(request, pk):
#     affinity = Affinity.objects.get(id = pk)
#     affinity.delete()
#     return Response('Affinity has been deleted.')

# # view, select, update or delete Sight
# @api_view(['GET'])
# def view_all_sights(request):
#     sights = Sight.objects.all()
#     serializer = SightSerializer(sights, many = True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def view_sight(request, pk):
#     sight = Sight.objects.get(id = pk)
#     serializer = SightSerializer(sight, many = False)
#     return Response(serializer.data)

# @api_view(['POST'])
# def select_sight(request):
#     serializer = SightSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['POST'])
# def update_sight(request, pk):
#     sight = Sight.objects.get(id = pk)
#     serializer = SightSerializer(instance = sight, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['DELETE'])
# def delete_sight(request, pk):
#     sight = Sight.objects.get(id = pk)
#     sight.delete()
#     return Response('Sight has been deleted.')