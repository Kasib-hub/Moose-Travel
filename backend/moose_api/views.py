
from rest_framework.response import Response
from rest_framework.decorators import api_view
#from the simpleJWT Docs 'Customizing token claims'
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

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

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh'

    ]

    return Response(routes)