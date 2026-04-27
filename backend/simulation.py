from flask import request, jsonify

def simulate():
    try:
        data = request.get_json(force=True)

        rainfall = data.get("rainfall")
        earthquake = data.get("earthquake")
        aqi = data.get("aqi")
        temperature = data.get("temperature")

        result = {}

        # 🌧 Rainfall
        if rainfall not in [None, ""]:
            rainfall = int(rainfall)
            if rainfall > 120:
                result["flood_risk"] = "HIGH"
            elif rainfall > 70:
                result["flood_risk"] = "MEDIUM"
            else:
                result["flood_risk"] = "LOW"

        # 🌍 Earthquake
        if earthquake not in [None, ""]:
            earthquake = float(earthquake)
            if earthquake > 6:
                result["earthquake_risk"] = "HIGH"
            else:
                result["earthquake_risk"] = "LOW"

        # 🌫 AQI (FIXED)
        if aqi not in [None, ""]:
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
        if temperature not in [None, ""]:
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