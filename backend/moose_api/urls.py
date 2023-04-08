from django.urls import path
from django.contrib import admin
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('user/<int:user_id>/', views.view_or_update_user, name='view_user'),
    path('itinerary/', views.itinerary, name='itinerary'),
    path('itinerary/<int:itinerary_id>/', views.itinerary),
    path('itinerary/<int:itinerary_id>/flight/', views.flight, name='flight'),
    path('itinerary/<int:itinerary_id>/flight/<int:flight_id>/', views.flight),    
    path('itinerary/<int:itinerary_id>/hotel/', views.hotel, name='hotel'),
    path('itinerary/<int:itinerary_id>/hotel/<int:hotel_id>/', views.hotel),    
    path('itinerary/<int:itinerary_id>/rental/', views.rental, name='rental'), 
    path('itinerary/<int:itinerary_id>/rental/<int:rental_id>/', views.rental), 
    path('itinerary/<int:itinerary_id>/affinity/', views.affinity, name='affinity'), 
    path('itinerary/<int:itinerary_id>/affinity/<int:affinity_id>/', views.affinity), 
    path('itinerary/<int:itinerary_id>/sight/', views.sight, name='sight'),
    path('itinerary/<int:itinerary_id>/sight/<int:sight_id>/', views.sight),
    path('itinerary/<int:itinerary_id>/car/', views.car, name='car'),
    path('itinerary/<int:itinerary_id>/car/<int:car_id>/', views.car), 
    path('admin/', admin.site.urls, name=admin),
]
