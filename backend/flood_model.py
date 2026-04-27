def predict_flood(rainfall):
    if rainfall > 120:
        return "HIGH"
    elif rainfall > 70:
        return "MEDIUM"
    else:
        return "LOW"