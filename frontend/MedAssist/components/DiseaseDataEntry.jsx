import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import ToggleButton from './ToggleButton';

const diseaseFields = {
  'Diabetes': [
    { label: 'Gender', key: 'gender', options: ['Male', 'Female'] },
    { label: 'Age', key: 'age' },
    { label: 'BMI', key: 'bmi' },
    { label: 'Hypertension', key: 'hypertension', options: ['Yes', 'No'] },
    { label: 'Heart Disease', key: 'heartDisease', options: ['Yes', 'No'] },
    { label: 'HbA1c Level', key: 'hba1cLevel' },
    { label: 'Blood Glucose Level', key: 'bloodGlucoseLevel' }
  ],
  'Cirrhosis': [
    { label: 'Age', key: 'Age', type: 'number' },
    { label: 'Sex', key: 'Sex', options: ['M', 'F'] },
    { label: 'Ascites', key: 'Ascites', options: ['Y', 'N'] },
    { label: 'Hepatomegaly', key: 'Hepatomegaly', options: ['Y', 'N'] },
    { label: 'Spiders', key: 'Spiders', options: ['Y', 'N'] },
    { label: 'Edema', key: 'Edema', options: ['Y', 'N'] },
    { label: 'Bilirubin', key: 'Bilirubin', type: 'number' },
    { label: 'Cholesterol', key: 'Cholesterol', type: 'number' },
    { label: 'Albumin', key: 'Albumin', type: 'number' },
    { label: 'Copper', key: 'Copper', type: 'number' },
    { label: 'Alk Phosphate', key: 'Alk_Phos', type: 'number' },
    { label: 'SGOT', key: 'SGOT', type: 'number' },
    { label: 'Tryglicerides', key: 'Tryglicerides', type: 'number' },
    { label: 'Platelets', key: 'Platelets', type: 'number' },
    { label: 'Prothrombin', key: 'Prothrombin', type: 'number' }
  ]
};

const DiseaseDataEntry = ({ disease, onSubmit }) => {
  const [formData, setFormData] = useState(
    diseaseFields[disease.name]?.reduce((acc, field) => {
      acc[field.key] = '';
      return acc;
    }, {})
  );
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = async () => {
    // Convert numeric fields to numbers
    const processedData = Object.keys(formData).reduce((acc, key) => {
      const field = diseaseFields[disease.name]?.find(field => field.key === key);
      acc[key] = field?.type === 'number' ? parseFloat(formData[key]) || 0 : formData[key];
      return acc;
    }, {});
  
    // Check for empty fields
    const emptyFields = Object.values(processedData).some(value => value === '' || value === 0);
    if (emptyFields) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/predict/${disease.name.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([processedData]),
      });
  
      const result = await response.json();
      setResponseMessage(`Prediction: ${result[0]}`); // Assuming the prediction is the first item in the response array
  
      // Optionally call onSubmit() with the form data if you need it in the parent component
      onSubmit(processedData);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while submitting the data.');
      console.error(error);
    }
  };
  

  return (
    <Card containerStyle={styles.card}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Enter Medical Data for {disease.name}</Text>
        {diseaseFields[disease.name]?.map((field) => (
          <View key={field.key} style={styles.inputContainer}>
            {field.options ? (
              <>
                <Text style={styles.label}>{field.label}:</Text>
                <ToggleButton
                  options={field.options}
                  selected={formData[field.key]}
                  onSelect={(value) => handleInputChange(field.key, value)}
                />
              </>
            ) : (
              <>
                <Text style={styles.label}>{field.label}:</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  value={formData[field.key]}
                  onChangeText={(text) => handleInputChange(field.key, text)}
                />
              </>
            )}
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Data</Text>
        </TouchableOpacity>
        {responseMessage ? <Text style={styles.response}>{responseMessage}</Text> : null}
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    elevation: 3,
    padding: 15,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    shadowColor: '#00000020',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    height: 40,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  response: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default DiseaseDataEntry;
