from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('moose_api.urls')),
    path('api/flight-search/', include('flight_search.urls')),  # Add this line
]
