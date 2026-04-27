import google.generativeai as genai
from flask import Blueprint, request, jsonify

gemini_bp = Blueprint('gemini', __name__)

genai.configure(api_key="YOUR_GEMINI_API_KEY")

@gemini_bp.route('/gemini', methods=['POST'])
def get_insights():
    data = request.json
    risk = data.get("flood_risk")

    model = genai.GenerativeModel("gemini-pro")

    response = model.generate_content(
        f"Explain what actions should be taken if flood risk is {risk}"
    )

    return jsonify({"insight": response.text})