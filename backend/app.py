from flask import Flask, jsonify
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

mysql = MySQL(app)

@app.route('/')
def index():
    return "Welcome to the Flask MySQL App!"

@app.route('/users', methods=['GET'])
def get_users():
    cur = mysql.connection.cursor()
    cur.execute("SELECT name FROM medical_records")
    names = cur.fetchall()
    cur.close()

    names_list = [name[0] for name in names]
    return jsonify(names_list)

if __name__ == '__main__':
    app.run(debug=True)
