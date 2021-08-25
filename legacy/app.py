from flask import Flask, render_template, request, redirect, jsonify
import json

app = Flask(__name__)

#Import DataFrame
PATH_IN = r'static/data/miserables.json'

#Routing to define URL
@app.route('/')
def index():
    return render_template('matrix.html')

#Post json
@app.route('/get-json', methods=['GET', 'POST'])
def get_json():
    #Import Data
    with open(PATH_IN) as f:
        json_to = json.load(f)
    return jsonify(json_to)

if __name__ == '__main__':
    app.run(debug=True, port=5000)