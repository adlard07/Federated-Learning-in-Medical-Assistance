from flask import Flask, request, jsonify, session
from flask_cors import CORS
from insert_into import PushData
from flask_session import Session

app = Flask(__name__)
CORS(app)
db = PushData()


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if all([username, password]):
        table = db.fetch_table()
        for row in table:
            if row[1] == username:
                session['username'] = username
                message = 'Login Successful!'
                break
            else:
                message = 'User not found!'
        print(message)
    return jsonify({'message': message})


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if all([email, username, password]):
        message = db.insert_values(values=(str(email), str(username), str(password)))
        print(message)
        return jsonify({'message': message})


@app.route('/home', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({'message': 'Home!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)