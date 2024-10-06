from flask import Flask, request, jsonify
import pymongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

client = pymongo.MongoClient("mongodb+srv://zack:e26v82rs1f6IIhV@cluster0.4inxm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client['user_infromation']
collection = db['user_information']


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    collection.insert_one(data)
    return jsonify({"message": "User registered successfully!"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print("Received login data:", data)  # Debug statement
    user = collection.find_one({"email": data["email"]})
    print("Fetched user data:", user)  # Debug statement
    if user and user["pass"] == data["pass"]:
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


if __name__ == '__main__':
    app.run(debug=True)