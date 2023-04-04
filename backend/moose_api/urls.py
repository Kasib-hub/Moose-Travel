from django.urls import path
from . import views
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('user/<int:user_id>/', view_or_update_user, name='view_user'),
    path('itinerary/', itinerary, name='itinerary'),
    path('itinerary/<int:itinerary_id>/', itinerary),
    path('itinerary/<int:itinerary_id>/flight/', flight, name='flight'),
    path('itinerary/<int:itinerary_id>/flight/<int:flight_id>/', flight),
    path('itinerary/<int:itinerary_id>/hotel/', hotel, name='hotel'),
    path('itinerary/<int:itinerary_id>/hotel/<int:hotel_id>/', hotel),
    path('itinerary/<int:itinerary_id>/rental/', views.rental, name='rental'),
    path('itinerary/<int:itinerary_id>/rental/<int:rental_id>/', views.rental),
    path('itinerary/<int:itinerary_id>/affinity/', affinity, name='affinity'),
    path('itinerary/<int:itinerary_id>/affinity/<int:affinity_id>/', affinity),
    path('itinerary/<int:itinerary_id>/sight/', sight, name='sight'),
    path('itinerary/<int:itinerary_id>/sight/<int:sight_id>/', sight),
    path('itinerary/<int:itinerary_id>/car-locations/<str:country_code>/<str:brand>/<str:keyword>/', views.get_car_locations, name='get_car_locations'),
    path('itinerary/<int:itinerary_id>/cars/', views.car_endpoint, name='car_endpoint'),
    path('itinerary/<int:itinerary_id>/cars/<int:car_pk>/', views.car_endpoint),
    path('itinerary/<int:itinerary_id>/reservations/', views.reservation_endpoint, name='reservation_endpoint'),
    path('itinerary/<int:itinerary_id>/reservations/<int:rent_pk>/', views.reservation_endpoint),
]
