# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.shortcuts import get_object_or_404
# from .serializers import WineSerializer
# from .models import Wine

from django.http import JsonResponse
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

# class WinesView(APIView):

#     def get(self, request, pk=None):
#         if pk:  
#             data = Wine.objects.get(pk=pk)
#             serializer = WineSerializer(data)
#         else:
#             data = Wine.objects.all()
#             serializer = WineSerializer(data, many=True)
#         return Response({"result": serializer.data})

#     def post(self, request):
#         wine = request.data
#         serializer = WineSerializer(data=wine)
#         if serializer.is_valid(raise_exception=True):
#             wine_saved = serializer.save()
#         return Response({"result": f"{wine_saved.wine_name} saved"})

#     def put(self, request, pk):
#         saved_wine = get_object_or_404(Wine.objects.all(), pk=pk)
#         data = request.data
#         serializer = WineSerializer(instance=saved_wine, data=data, partial=True)
#         if serializer.is_valid(raise_exception=True):
#             saved_wine = serializer.save()
#         return Response({"result": f"{saved_wine.wine_name} updated"})

#     def delete(self, request, pk):
#         wine = get_object_or_404(Wine.objects.all(), pk=pk)
#         wine.delete()
#         return Response({"result": f"Wine id {pk} deleted"},status=204)
