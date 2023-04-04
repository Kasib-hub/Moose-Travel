import requests
import time

CLIENT_ID = '4492e1f0'
CLIENT_SECRET = '6a3959df1e3f6f4ca13d09adb6e85b7c'
TOKEN_URL = 'https://stage.abgapiservices.com/oauth/token/v1'
# Car Availability API
CAR_AVAILABILITY_API = 'https://stage.abgapiservices.com/cars/catalog/v1/vehicles'
# Car Locations API
CAR_LOCATIONS_API = 'https://stage.abgapiservices.com/cars/locations/v1'
# Car Reservations API
CAR_RESERVATIONS_API = 'https://stage.abgapiservices.com/cars/reservation/v1'

access_token = None
token_expiration_time = 0

def get_access_token():
    global access_token, token_expiration_time

    current_time = int(time.time())
    if current_time < token_expiration_time:
        return access_token

    headers = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }

    data = {
        'grant_type': 'client_credentials'
    }

    response = requests.post(TOKEN_URL, headers=headers, data=data)
    if response.status_code == 200:
        data = response.json()
        access_token = data['access_token']
        token_expiration_time = current_time + data['expires_in'] - 300  # subtract 300 seconds to handle API call delay
        return access_token
    else:
        raise Exception("Error getting access token: " + response.text)

