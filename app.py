from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # IMPORTANT

@app.route("/simulate", methods=["POST"])
def simulate():
    try:
        data = request.get_json(force=True)

        rainfall = data.get("rainfall")
        earthquake = data.get("earthquake")
        aqi = data.get("aqi")
        temperature = data.get("temperature")

        result = {}

        # 🌧 Rainfall
        if rainfall is not None and rainfall != "":
            rainfall = int(rainfall)
            if rainfall > 120:
                result["flood_risk"] = "HIGH"
            elif rainfall > 70:
                result["flood_risk"] = "MEDIUM"
            else:
                result["flood_risk"] = "LOW"

        # 🌍 Earthquake
        if earthquake is not None and earthquake != "":
            earthquake = float(earthquake)
            if earthquake > 6:
                result["earthquake_risk"] = "HIGH"
            else:
                result["earthquake_risk"] = "LOW"

        # 🌫 AQI (FIXED)
        if aqi is not None and aqi != "":
            aqi = int(aqi)
            if aqi <= 50:
                result["air_quality"] = "GOOD"
            elif aqi <= 100:
                result["air_quality"] = "MODERATE"
            elif aqi <= 200:
                result["air_quality"] = "UNHEALTHY"
            elif aqi <= 300:
                result["air_quality"] = "VERY UNHEALTHY"
            else:
                result["air_quality"] = "HAZARDOUS"

        # 🌡 Temperature
        if temperature is not None and temperature != "":
            temperature = int(temperature)
            if temperature > 40:
                result["weather_status"] = "EXTREME HEAT"
            elif temperature < 5:
                result["weather_status"] = "COLD"
            else:
                result["weather_status"] = "NORMAL"

        return jsonify(result)

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)