from src.model_agregation.agregate import Predict
from tensorflow.keras.models import load_model
from database.insert_into import PushData
from flask import Flask, request, jsonify
from geopy.geocoders import Nominatim
from src.gmaps.address import gmaps
from flask_cors import CORS
import numpy as np
import logging
import cv2
import os

app = Flask(__name__)  
CORS(app)
db = PushData()


####################################################### Authorization ##########################################################

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if all([email, password]):
        table = list(db.fetch_table())
        for row in table:
            if row[1] == email:
                message = 'Login Successful!'
                break
            else:
                message = 'User not found!'
        logging.info(message)
    return message

@app.route('/register', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if all([email, password]):
        message = db.insert_values(values=(str(email), str(password)))
        logging.info(message)
        return message

####################################################### Google Maps API ########################################################

@app.route('/latlong', methods=['POST'])
def geocode_address():
    address = request.get_json()
    geolocator = Nominatim(user_agent="myapp")
    location = geolocator.geocode(address)
    if location:
        return jsonify({'latitude':location.latitude, 'logitude':location.longitude})
    else:
        return None
    
@app.route('/hospitals', methods=['POST'])
def hospitals():
    address = request.get_json().get('address')
    hospoital_data = gmaps(address)
    return jsonify(hospoital_data)

####################################################### Model Prediction #######################################################

@app.route('/predict', methods=['POST'])
def predict():
    dropdown = request.form.get('disease')
    image = request.files['image'].read()
    
    nparr = np.frombuffer(image, np.uint8)
    img = np.array(cv2.imdecode(nparr, cv2.IMREAD_COLOR))
    
    predictor = Predict()
    result = predictor.make_prediction(dropdown, img)

    return result
    # return jsonify(success=True, message="Image received and disease prediction started.")


if __name__ == '__main__':
    app.run(debug=True, port=5000)