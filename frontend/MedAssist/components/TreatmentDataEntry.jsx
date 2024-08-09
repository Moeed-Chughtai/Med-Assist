import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import ToggleButton from './ToggleButton';

const diagnosisOptions = [
  'Diabetes',
  'Hypertension',
  'Asthma',
  'COVID-19',
  'Malaria',
  // Add diagnosis
];

const allergyOptions = [
  'Peanuts',
  'Shellfish',
  'Milk',
  'Eggs',
  'Wheat',
  'Soy',
  'None',
  // Add allergy
];

const genderOptions = ['Male', 'Female'];

const TreatmentDataEntry = () => {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    diagnosis: '',
    allergies: '',
    customAllergy: '',
  });
  const [prediction, setPrediction] = useState('');

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.gender || !formData.age || !formData.diagnosis || !formData.allergies) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const data = {
      ...formData,
      allergies: formData.allergies === 'Other' ? formData.customAllergy : formData.allergies
    };

    try {
      console.log(JSON.stringify(data))
      const response = await fetch('http://127.0.0.1:5000/predict/treatment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setPrediction(result.predicted_treatment);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to get prediction.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.header}>Treatment Data Entry</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender:</Text>
          <ToggleButton
            options={genderOptions}
            selected={formData.gender}
            onSelect={(value) => handleInputChange('gender', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter age..."
            value={formData.age}
            onChangeText={(text) => handleInputChange('age', text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Diagnosis:</Text>
          <Picker
            selectedValue={formData.diagnosis}
            style={styles.picker}
            onValueChange={(itemValue) => handleInputChange('diagnosis', itemValue)}
          >
            <Picker.Item label="Select a diagnosis" value="" />
            {diagnosisOptions.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Allergies:</Text>
          <Picker
            selectedValue={formData.allergies}
            style={styles.picker}
            onValueChange={(itemValue) => {
              handleInputChange('allergies', itemValue);
              if (itemValue !== 'Other') {
                handleInputChange('customAllergy', '');
              }
            }}
          >
            <Picker.Item label="Select an allergy" value="" />
            {allergyOptions.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
            <Picker.Item label="Other" value="Other" />
          </Picker>
          {formData.allergies === 'Other' && (
            <TextInput
              style={styles.input}
              placeholder="Please specify"
              value={formData.customAllergy}
              onChangeText={(text) => handleInputChange('customAllergy', text)}
            />
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Data</Text>
        </TouchableOpacity>

        {prediction ? (
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionText}>Predicted Treatment: {prediction}</Text>
          </View>
        ) : null}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
  },
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
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  picker: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    height: 40,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  predictionContainer: {
    marginTop: 20,
  },
  predictionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});

export default TreatmentDataEntry;
