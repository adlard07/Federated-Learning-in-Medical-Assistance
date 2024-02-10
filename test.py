import requests
from src.gmaps.address import geocode_address


query = 'hospitals|clinics'
address = 'sagarshet vasai'
latitude, longitude = geocode_address(address)
link = f'https://serpapi.com/search.json?engine=google_maps&q={query}&ll=@{latitude},{longitude},15.1z&type=search'

params = {
    'key':'a417c75840f5b0aabab2ffdf6f0ee103e072bad3a9182c0fef468cf534772362',
    }
response = requests.get(link, params=params)
addresses = response.json()
hospitals = addresses['local_results']
print(hospitals)