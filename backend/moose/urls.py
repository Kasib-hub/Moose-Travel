from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('moose_api.urls')),
    # path('flight-search/', include('flight_search.urls')),  # Remove "api/" from this line
]
