from flask import Flask, request, jsonify
import pymongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

client = pymongo.MongoClient("mongodb+srv://zack:e26v82rs1f6IIhV@cluster0.4inxm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client['user_infromation']
db2 = client['test_collection']
collection = db['user_information']

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    
    if get_user_by_email(email):
        return jsonify({'message': 'Email already exists'}), 400
    
    # Add user to the database
    add_user(data)
    return jsonify({'message': 'User registered successfully'}), 200

def get_user_by_email(email):
    return collection.find_one({"email": email})

def add_user(data):
    collection.insert_one(data)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = collection.find_one({"email": data["email"]})
    if user and user["pass"] == data["pass"]:
        return jsonify({"message": "Login successful!", "grade": user["grade"]}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

def get_questions_by_grade(grade):
    collection_name = f'{grade}thGradeTest'
    collection2 = db2[collection_name]
    questions = list(collection2.find())
    
    categorized_questions = {}
    for question in questions:
        category = question['Category']
        if category not in categorized_questions:
            categorized_questions[category] = []
        categorized_questions[category].append(question)
    
    for category, questions in categorized_questions.items():
        for question in questions:
            question['_id'] = str(question['_id'])
    
    return categorized_questions

@app.route("/questions/<grade>")
def get_questions(grade):
    categorized_questions = get_questions_by_grade(grade)
    return jsonify(categorized_questions)

@app.route('/evaluate', methods=['POST'])
def evaluate():
    results = request.get_json()
    category_scores = {}
    for result in results:
        category = result['category']
        if category not in category_scores:
            category_scores[category] = {'correct': 0, 'total': 0}
        category_scores[category]['total'] += 1
        if result['isCorrect']:
            category_scores[category]['correct'] += 1
    return jsonify(category_scores)

if __name__ == '__main__':
    app.run(debug=True)
