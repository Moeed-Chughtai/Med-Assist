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

# Load models and preprocessors
cirrhosis_model = joblib.load('./trained_models/cirrhosis_model.pkl')
cirrhosis_preprocessor = joblib.load('./trained_models/cirrhosis_preprocessor.pkl')
bodyfat_model = joblib.load('./trained_models/bodyfat_model.pkl')
bodyfat_preprocessor = joblib.load('./trained_models/bodyfat_preprocessor.pkl')
heartfailure_model = joblib.load('./trained_models/heartfailure_model.pkl')
heartfailure_preprocessor = joblib.load('./trained_models/heartfailure_preprocessor.pkl')
hepatitis_model = joblib.load('./trained_models/hepatitis_model.pkl')
hepatitis_preprocessor = joblib.load('./trained_models/hepatitis_preprocessor.pkl')
treatment_model = joblib.load('./trained_models/treatment_model.pkl')
scaler = joblib.load('./trained_models/scaler.pkl')
svd = joblib.load('./trained_models/svd.pkl')
label_encoders = joblib.load('./trained_models/label_encoders.pkl')

# Get all patient names
@app.route('/patients', methods=['GET'])
def get_users():
    cur = mysql.connection.cursor()
    cur.execute("SELECT name FROM medical_records")
    names = cur.fetchall()
    cur.close()

    names_list = [name[0] for name in names]
    return jsonify(names_list)

# Prediction for cirrhosis
@app.route('/predict/cirrhosis', methods=['POST'])
def predict_cirrhosis():
    data = request.json
    df = pd.DataFrame(data)

    expected_features = cirrhosis_preprocessor.transformers_[0][2] + cirrhosis_preprocessor.transformers_[1][2]
    df = df[expected_features]

    print(f"Feature names: {expected_features}")
    print(f"Input DataFrame columns: {df.columns.tolist()}")
    print(f"Input DataFrame shape: {df.shape}")

    ##X_processed = cirrhosis_preprocessor.transform(df)
    predictions = cirrhosis_model.predict(df)
    return jsonify(predictions.tolist())

# Prediction for treatment
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # Convert to DataFrame
    df = pd.DataFrame([data])

    # Encode categorical variables
    for column, encoder in label_encoders.items():
        if column in df.columns:
            df[column] = encoder.transform(df[column])

    # Create age bin
    df['Age_Bin'] = pd.cut(df['Age'], bins=[0, 18, 35, 50, 65, 100], labels=[0, 1, 2, 3, 4])

    # Create interaction matrix for SVD
    interaction_matrix = pd.DataFrame(index=df['PatientID'])
    patient_features = svd.transform(interaction_matrix)
    patient_feature_df = pd.DataFrame(patient_features, index=interaction_matrix.index)
    df = pd.merge(df, patient_feature_df, left_on='PatientID', right_index=True)

    # Drop unnecessary columns
    df = df.drop(['Treatment', 'PatientID', 'Notes'], axis=1)

    # Normalize the features
    X_scaled = scaler.transform(df)

    # Make prediction
    prediction = treatment_model.predict(X_scaled)
    prediction_label = label_encoders['Treatment'].inverse_transform(prediction)

    return jsonify({'predicted_treatment': prediction_label[0]})



if __name__ == '__main__':
    app.run(debug=True)
