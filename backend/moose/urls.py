
from django.urls import path, include

urlpatterns = [
    path('api/', include('moose_api.urls')),
]