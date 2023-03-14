from django.urls import path
from . import views
from .views import MyTokenObtainPairView

#from the simpleJWT authentication
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), #takes in the username and password to give an authentication and refresh token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #takes in the refresh token -> gives a new refresh token
]

# urlpatterns = [
#     path('', views.WinesView.as_view()),
#     path('<int:pk>', views.WinesView.as_view())
# ]
