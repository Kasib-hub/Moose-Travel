from django.http import JsonResponse
from amadeus import Client, ResponseError
import json

amadeus = Client(
    client_id="YOUR_CLIENT_ID",
    client_secret="YOUR_CLIENT_SECRET"
)

def autocomplete(request):
    keyword = request.GET.get("keyword", "")

    try:
        response = amadeus.reference_data.locations.get(
            keyword=keyword,
            subType="CITY,AIRPORT"
        )
        data = response.data
        return JsonResponse(data, safe=False)

    except ResponseError as error:
        print(error)
        return JsonResponse({"error": "Error fetching autocomplete data"}, status=500)


def search(request):
    origin = request.GET.get("origin", "")
    destination = request.GET.get("destination", "")
    departure_date = request.GET.get("departureDate", "")
    adults = request.GET.get("adults", "")
    children = request.GET.get("children", "")
    infants = request.GET.get("infants", "")
    travel_class = request.GET.get("travelClass", "")
    return_date = request.GET.get("returnDate", "")

    search_params = {
        "originLocationCode": origin,
        "destinationLocationCode": destination,
        "departureDate": departure_date,
        "adults": adults,
        "travelClass": travel_class,
    }

    if children:
        search_params["children"] = children

    if infants:
        search_params["infants"] = infants

    if return_date:
        search_params["returnDate"] = return_date

    try:
        response = amadeus.shopping.flight_offers_search.get(**search_params)
        data = response.data
        return JsonResponse(data, safe=False)

    except ResponseError as error:
        print(error)
        return JsonResponse({"error": "Error fetching search results"}, status=500)
