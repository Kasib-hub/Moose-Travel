from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from .views import *

#from the simpleJWT authentication
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), #takes in the username and password to give an authentication and refresh token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #takes in the refresh token -> gives a new refresh token
    path('signup/', views.SignupView.as_view(), name='signup'),
    #view, create, update and delete itineraries
    path('itinerary/', itinerary, name='itinerary'),
    path('itinerary/<int:itinerary_id>/', itinerary),
    # view, save, update and delete flight
    path('itinerary/<int:itinerary_id>/flight/', flight, name='flight'),
    path('itinerary/<int:itinerary_id>/flight/<int:flight_id>/', flight),    
    # view, save, update and delete hotel 
    path('itinerary/<int:itinerary_id>/hotel/', hotel, name='hotel'),
    path('itinerary/<int:itinerary_id>/hotel/<int:hotel_id>/', hotel),    
    # # save, update and delete rental
    path('itinerary/<int:itinerary_id>/rental/', rental, name='rental'), 
    path('itinerary/<int:itinerary_id>/rental/<int:rental_id>/', rental), 
    # # select, update and delete affinity - travel type
    path('itinerary/<int:itinerary_id>/affinity/', affinity, name='affinity'), 
    path('itinerary/<int:itinerary_id>/affinity/<int:affinity_id>/', affinity), 
    # # select, update and delete sight
    path('itinerary/<int:itinerary_id>/sight/', sight, name='sight'),
    path('itinerary/<int:itinerary_id>/sight/<int:sight_id>', sight),  
]

