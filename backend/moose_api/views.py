
from rest_framework.response import Response
from rest_framework.decorators import api_view
#from the simpleJWT Docs 'Customizing token claims'
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import SignupSerializer
from rest_framework.permissions import AllowAny

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username #grabs the specified attributes of the user model. 'token' here is basically in encripted dictionary
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):   #creates a new view for the serialized information that's based off the old template by inheriting the old method ('template')
    serializer_class = MyTokenObtainPairSerializer

class SignupView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    # this is all it needs to make a user. Doesn't use other stuff because?? remember serializer maps model to json
    # try adding email since its included in the modesl
    def perform_create(self, serializer):   
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            email = serializer.validated_data["email"]
            try:
                User.objects.create_user(username=username, password=password, email=email)
            except:
                return Response({'error': 'Username already exists'})

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh'

    ]

    return Response(routes)