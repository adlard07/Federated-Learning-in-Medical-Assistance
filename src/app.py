from flask import Flask, request, jsonify, session
from database.insert_into import PushData
from flask_session import Session
# from gmaps.addresses import gmaps
from flask_cors import CORS

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'  # You can use other session storage options
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a secret key for secure sessions
Session(app)
CORS(app)
db = PushData()


####################################################### Login #####################################################
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if all([username, password]):
        table = db.fetch_table()
        for row in table:
            if row[1] == username and row[2] == password:
                session['username'] = username
                message = 'Login Successful!'
                break
            else:
                message = 'User not found!'
        print(message)
    return jsonify({'username': username, 'password': password, 'message': message})


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if all([email, username, password]):
        message = db.insert_values(values=(str(email), str(username), str(password)))
        print(message)
        return jsonify({'email': email, 'username': username, 'password': password, 'message': message})

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None) 
    return jsonify({'message': 'Logout Successful!'})

#################################################################################################################

################################################# Google Maps API ###############################################
# @app.route('/address')
# def addresses():
#     data = request.get_json()
#     address = data.get('email')
    
#     hospitals = gmaps(address)
#     return hospitals


if __name__ == '__main__':
    app.run(debug=True)
