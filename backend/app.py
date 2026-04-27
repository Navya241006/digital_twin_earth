from flask import Flask
from flask_cors import CORS
from simulation import simulate
from flask import Flask, request
app = Flask(__name__)
CORS(app)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

@app.route("/simulate", methods=["POST"])
def run_simulation():
    return simulate()

if __name__ == "__main__":
    app.run(debug=True)