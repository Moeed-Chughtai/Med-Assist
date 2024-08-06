import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import ToggleButton from './ToggleButton'; // Make sure to adjust the path

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
  // Other diseases...
};

const DiseaseDataEntry = ({ disease, onSubmit }) => {
  const [formData, setFormData] = useState(
    diseaseFields[disease.name]?.reduce((acc, field) => {
      acc[field.key] = '';
      return acc;
    }, {})
  );

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = () => {
    const emptyFields = Object.values(formData).some(value => value.trim() === '');
    if (emptyFields) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }
    onSubmit(formData);
    setFormData(
      diseaseFields[disease.name]?.reduce((acc, field) => {
        acc[field.key] = '';
        return acc;
      }, {})
    );
  };

  return (
    <Card containerStyle={styles.card}>
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
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DiseaseDataEntry;
