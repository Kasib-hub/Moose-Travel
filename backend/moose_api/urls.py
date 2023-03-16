from django.urls import path
from . import views
from .views import * #MyTokenObtainPairView

#from the simpleJWT authentication
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), #takes in the username and password to give an authentication and refresh token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #takes in the refresh token -> gives a new refresh token
    #view, create, update and delete itineraries
    path('view-all-itineraries/', view_all_itineraries, name='view_all_itineraries'), 
    path('view-itinerary/<int:pk>/', view_itinerary, name='view_itinerary'), 
    path('create-itinerary/', create_itinerary, name='create_itinerary'), 
    path('update-itinerary/<int:pk>/', update_itinerary, name='update_itinerary'), 
    path('delete-itinerary/<int:pk>/', delete_itinerary, name='delete_itinerary'), 
    # view, save, update and delete flight
    path('view-all-flights/', view_all_flights, name='view_all_flights'), 
    path('view-flight/<int:pk>/', view_flight, name='view_flight'), 
    path('select-flight/', select_flight, name='select_flight'), 
    path('update-flight/<int:pk>/', update_flight, name='update_flight'), 
    path('delete-flight/<int:pk>/', delete_flight, name='delete_flight'), 
    # save, update and delete hotel
    path('view-all-hotels/', view_all_hotels, name='view_all_hotel'), 
    path('view-hotel/<int:pk>/', view_hotel, name='view_hotel'), 
    path('select-hotel/', select_hotel, name='select_hotel'), 
    path('update-hotel/<int:pk>/', update_hotel, name='update_hotel'), 
    path('delete-hotel/<int:pk>/', delete_hotel, name='delete_hotel'), 
    # save, update and delete rental
    path('view-all-rentals/', view_all_rentals, name='view_all_rentals'), 
    path('view-rental/<int:pk>/', view_rental, name='view_rental'), 
    path('select-rental/', select_rental, name='select_rental'), 
    path('update-rental/<int:pk>/', update_rental, name='update_rental'), 
    path('delete-rental/<int:pk>/', delete_rental, name='delete_rental'), 
    # select, update and delete affinity - travel type
    path('view-all-affinities/', view_all_affinities, name='view_all_affinities'), 
    path('view-affinity/<int:pk>/', view_affinity, name='view_affinity'), 
    path('select-affinity/', select_affinity, name='select_affinity'), 
    path('update-affinity/<int:pk>/', update_affinity, name='update_affinity'), 
    path('delete-affinity/<int:pk>/', delete_affinity, name='delete_affinity'), 
    # select, update and delete sight
    path('view-all-sights/', view_all_sights, name='view_all_sights'), 
    path('view-sight/<int:pk>/', view_sight, name='view_sight'),
    path('select-sight/', select_sight, name='select_sight'), 
    path('update-sight/<int:pk>/', update_sight, name='update_sight'), 
    path('delete-sight/<int:pk>/', delete_sight, name='delete_sight'), 
]
