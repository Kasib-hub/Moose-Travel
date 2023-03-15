from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User

# gets User import, We're not providing templates or forms. User doesn't interact with this directly. It's up to react to build the form and send the JSON object back to the djangoREST
# you can add other properties form inherited User Model
class SignupSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "email"]
