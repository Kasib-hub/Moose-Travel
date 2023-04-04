from django.urls import path
from . import views
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('user/<int:user_id>/', views.view_or_update_user, name='view_user'),
    path('itinerary/', views.ItineraryListCreateView.as_view(), name='itinerary_list_create'),
    path('itinerary/<int:pk>/', views.ItineraryRetrieveUpdateDestroyView.as_view(), name='itinerary_retrieve_update_destroy'),
    path('itinerary/<int:itinerary_id>/flight/', views.FlightListCreateView.as_view(), name='flight_list_create'),
    path('itinerary/<int:itinerary_id>/flight/<int:pk>/', views.FlightRetrieveUpdateDestroyView.as_view(), name='flight_retrieve_update_destroy'),
    path('itinerary/<int:itinerary_id>/hotel/', views.HotelListCreateView.as_view(), name='hotel_list_create'),
    path('itinerary/<int:itinerary_id>/hotel/<int:pk>/', views.HotelRetrieveUpdateDestroyView.as_view(), name='hotel_retrieve_update_destroy'),
    path('itinerary/<int:itinerary_id>/rentals/', views.RentalListCreateView.as_view(), name='rental_list_create'),
    path('itinerary/<int:itinerary_id>/rentals/<int:pk>/', views.RentalRetrieveUpdateDestroyView.as_view(), name='rental_retrieve_update_destroy'),
    path('itinerary/<int:itinerary_id>/affinity/', views.AffinityListCreateView.as_view(), name='affinity_list_create'),
    path('itinerary/<int:itinerary_id>/affinity/<int:pk>/', views.AffinityRetrieveUpdateDestroyView.as_view(), name='affinity_retrieve_update_destroy'),
    path('itinerary/<int:itinerary_id>/sight/', views.SightListCreateView.as_view(), name='sight_list_create'),
    path('itinerary/<int:itinerary_id>/sight/<int:pk>/', views.SightRetrieveUpdateDestroyView.as_view(), name='sight_retrieve_update_destroy'),
    path('itinerary/<int:itinerary_id>/car-locations/<str:country_code>/<str:brand>/<str:keyword>/', views.get_car_locations, name='get_car_locations'),
    path('itinerary/<int:itinerary_id>/cars/', views.CarListCreateView.as_view(), name='car_list_create'),
    path('itinerary/<int:itinerary_id>/cars/<int:pk>/', views.CarRetrieveUpdateDestroyView.as_view(), name='car_retrieve_update_destroy'),
    path('itinerary/<int:itinerary_id>/reservations/', views.ReservationListCreateView.as_view(), name='reservation_list_create'),
    path('itinerary/<int:itinerary_id>/reservations/<int:pk>/', views.ReservationRetrieveUpdateDestroyView.as_view(), name='reservation_retrieve_update_destroy'),
]