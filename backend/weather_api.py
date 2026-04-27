import requests

def get_weather(city="Delhi"):
    API_KEY = "YOUR_API_KEY"
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}"

    response = requests.get(url)
    return response.json()