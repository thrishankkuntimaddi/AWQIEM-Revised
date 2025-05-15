import requests

class CoordinateExtractor:
    def __init__(self, user_agent="CoordinateExtractor/1.0"):
        self.user_agent = user_agent
        self.base_url = "https://nominatim.openstreetmap.org/search"

    def get_coordinates(self, place_name):
        try:
            params = {"q": f"{place_name},India", "format": "json", "limit": 1}
            headers = {"User-Agent": self.user_agent}
            response = requests.get(self.base_url, params=params, headers=headers)
            response.raise_for_status()
            data = response.json()
            if not data:
                print(f"No coordinates found for {place_name}")
                return None, None
            lat = float(data[0]["lat"])
            lon = float(data[0]["lon"])
            print(f"Coordinates for {place_name}: lat={lat}, lon={lon}")
            return lat, lon
        except requests.RequestException as e:
            print(f"Error fetching coordinates for {place_name}: {e}")
            return None, None
        except (KeyError, ValueError) as e:
            print(f"Error parsing coordinates for {place_name}: {e}")
            return None, None

    def get_aqi_from_coords(self, lat, lon, api_key):
        try:
            aqi_url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={api_key}"
            response = requests.get(aqi_url)
            response.raise_for_status()
            data = response.json()
            aqi_level = data["list"][0]["main"]["aqi"]
            components = data["list"][0]["components"]
            return {
                "AQI": [50, 100, 200, 300, 400][aqi_level - 1] or 50,
                "aqiStatus": ["Good", "Satisfactory", "Moderate", "Poor", "Very Poor"][aqi_level - 1] or "Good",
                "pollutants": {
                    "PM2_5": components.get("pm2_5", 0),
                    "PM10": components.get("pm10", 0),
                    "O3": components.get("o3", 0),
                    "NO2": components.get("no2", 0),
                    "SO2": components.get("so2", 0),
                    "CO": components.get("co", 0),
                    "NH3": components.get("nh3", 0),
                    "Pb": 0
                }
            }
        except requests.RequestException as e:
            print(f"Error fetching AQI data: {e}")
            return None
        except (KeyError, IndexError) as e:
            print(f"Error parsing AQI data: {e}")
            return None

if __name__ == "__main__":
    extractor = CoordinateExtractor()
    lat, lon = extractor.get_coordinates("Delhi")
    if lat and lon:
        aqi_data = extractor.get_aqi_from_coords(lat, lon, "0c286e13d68a43f9f57092b05b610fc6")  # Replace with your API key
        print(aqi_data)