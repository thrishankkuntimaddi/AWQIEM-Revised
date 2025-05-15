from flask import Flask, request, jsonify
from coordinate_extractor import CoordinateExtractor

app = Flask(__name__)
extractor = CoordinateExtractor()

@app.route('/get_aqi', methods=['GET'])
def get_aqi():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    if not lat or not lon:
        return jsonify({"error": "Latitude and longitude are required"}), 400
    try:
        lat = float(lat)
        lon = float(lon)
        aqi_data = extractor.get_aqi_from_coords(lat, lon, "0c286e13d68a43f9f57092b05b610fc6")  # Replace with your API key
        if aqi_data:
            return jsonify({"aqi_data": aqi_data})
        return jsonify({"error": "Failed to fetch AQI data"}), 500
    except ValueError:
        return jsonify({"error": "Invalid latitude or longitude"}), 400

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)