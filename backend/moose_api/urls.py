from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from .views import *

#from the simpleJWT authentication
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), #takes in the username and password to give an authentication and refresh token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #takes in the refresh token -> gives a new refresh token
    path('signup/', views.SignupView.as_view(), name='signup'),
    #view, create, update and delete itineraries
    path('itinerary/', itinerary, name='itinerary'), 
    # view, save, update and delete flight
    path('flight/', flight, name='flight'),  
    # view, save, update and delete hotel
    path('hotel/', hotel, name='hotel'), 
    # # save, update and delete rental
    path('rental/', rental, name='rental'), 
    # # select, update and delete affinity - travel type
    path('affinity/', affinity, name='affinity'), 
    # # select, update and delete sight
    path('sight/', sight, name='sight'), 
]

