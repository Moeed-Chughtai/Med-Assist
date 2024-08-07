from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os
import joblib
import pandas as pd

load_dotenv()
app = Flask(__name__)

app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
mysql = MySQL(app)

cirrhosis_model = joblib.load('./trained_models/cirrhosis_model.pkl')
cirrhosis_preprocessor = joblib.load('./trained_models/cirrhosis_preprocessor.pkl')


## Get all patient names
@app.route('/patients', methods=['GET'])
def get_users():
    cur = mysql.connection.cursor()
    cur.execute("SELECT name FROM medical_records")
    names = cur.fetchall()
    cur.close()

    names_list = [name[0] for name in names]
    return jsonify(names_list)

## Prediction for cirrhosis
@app.route('/predict/cirrhosis', methods=['POST'])
def predict_cirrhosis():
    data = request.json
    df = pd.DataFrame(data)

    expected_features = cirrhosis_preprocessor.transformers_[0][2] + cirrhosis_preprocessor.transformers_[1][2]
    df = df[expected_features]

    print(f"Feature names: {expected_features}")
    print(f"Input DataFrame columns: {df.columns.tolist()}")
    print(f"Input DataFrame shape: {df.shape}")

    #X_processed = cirrhosis_preprocessor.transform(df)
    predictions = cirrhosis_model.predict(df)
    return jsonify(predictions.tolist())


if __name__ == '__main__':
    app.run(debug=True)
