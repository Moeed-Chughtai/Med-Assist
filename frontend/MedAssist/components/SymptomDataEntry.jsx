import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import ToggleButton from './ToggleButton';

const genderOptions = ['Male', 'Female'];
const yesNoOptions = ['Yes', 'No'];
const bloodPressureOptions = ['Low', 'Normal', 'High'];
const cholesterolOptions = ['Low', 'Normal', 'High'];

const SymptomDataEntry = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    fever: '',
    fatigue: '',
    cough: '',
    difficultyBreathing: '',
    bloodPressure: '',
    cholesterol: ''
  });

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = () => {
    const emptyFields = Object.values(formData).some(value => value.trim() === '');
    if (emptyFields) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.header}>Symptom Data Entry</Text>

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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fever:</Text>
          <ToggleButton
            options={yesNoOptions}
            selected={formData.fever}
            onSelect={(value) => handleInputChange('fever', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fatigue:</Text>
          <ToggleButton
            options={yesNoOptions}
            selected={formData.fatigue}
            onSelect={(value) => handleInputChange('fatigue', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cough:</Text>
          <ToggleButton
            options={yesNoOptions}
            selected={formData.cough}
            onSelect={(value) => handleInputChange('cough', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Difficulty Breathing:</Text>
          <ToggleButton
            options={yesNoOptions}
            selected={formData.difficultyBreathing}
            onSelect={(value) => handleInputChange('difficultyBreathing', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Blood Pressure:</Text>
          <ToggleButton
            options={bloodPressureOptions}
            selected={formData.bloodPressure}
            onSelect={(value) => handleInputChange('bloodPressure', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cholesterol Level:</Text>
          <ToggleButton
            options={cholesterolOptions}
            selected={formData.cholesterol}
            onSelect={(value) => handleInputChange('cholesterol', value)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Data</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
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
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SymptomDataEntry;
