import base64
import requests
from django.conf import settings
from rest_framework.response import Response
import requests
from rest_framework.decorators import api_view

def search_rental_cars(location, pickup_date, dropoff_date, access_token):
    url = 'https://api-crt.cert.havail.sabre.com/v1/shop/cars'
    headers = {'Authorization': f'Bearer {access_token}'}
    params = {
        'pickupdate': pickup_date,
        'dropoffdate': dropoff_date,
        'location': location
    }

    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        response_data = response.json()
        request_data = {
            'VehAvailRQCore': {
                'QueryType': 'VehAvailRate',
                'VehRentalCore': {
                    'PickUpDateTime': pickup_date,
                    'ReturnDateTime': dropoff_date,
                    'PickUpLocation': {
                        'LocationCode': location
                    },
                    'ReturnLocation': {
                        'LocationCode': location
                    }
                },
                'VendorPrefs': {
                    'VendorPref': [
                        {
                            'Code': response_data['cars'][0]['vendor']['code'],
                            'CompanyShortName': response_data['cars'][0]['vendor']['name']
                        }
                    ]
                }
            }
        }
        return get_vehicle_availability(request_data, access_token)
    return None

def get_vehicle_availability(request_data, access_token):
    url = 'https://api-crt.cert.havail.sabre.com/v2.0.0/get/vehavail'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    response = requests.post(url, headers=headers, json=request_data)
    if response.status_code == 200:
        return response.json()
    return None