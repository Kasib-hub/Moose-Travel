from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Itinerary)
admin.site.register(Hotel)
admin.site.register(Flight)
admin.site.register(Rental)
admin.site.register(Affinity)
admin.site.register(Sight)

# superuser:
# username: moosetravel
# passworf: moosetravel123