from flask import Flask, request
from flask_cors import CORS
from simulation import simulate
import os

app = Flask(__name__)
CORS(app)

app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

@app.route("/simulate", methods=["POST"])
def run_simulation():
    return simulate()

# Optional test route (recommended)
@app.route("/")
def home():
    return {"message": "Backend is running 🚀"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)