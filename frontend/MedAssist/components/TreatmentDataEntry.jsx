import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

const diagnosisOptions = [
  'Diabetes',
  'Hypertension',
  'Asthma',
  'COVID-19',
  'Malaria',
  // Add more diagnosis options here
];

const allergyOptions = [
  'Peanuts',
  'Shellfish',
  'Milk',
  'Eggs',
  'Wheat',
  'Soy',
  'None',
  // Add more allergy options here
];

const PatientDataEntry = ({ onSubmit }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [allergies, setAllergies] = useState('');
  const [customAllergy, setCustomAllergy] = useState('');

  const handleSubmit = () => {
    if (!diagnosis || !allergies) {
      Alert.alert('Error', 'Please select both diagnosis and allergies.');
      return;
    }
    onSubmit({ diagnosis, allergies: allergies === 'Other' ? customAllergy : allergies });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.header}>Patient Data Entry</Text>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Diagnosis:</Text>
          <Picker
            selectedValue={diagnosis}
            style={styles.picker}
            onValueChange={(itemValue) => setDiagnosis(itemValue)}
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
            selectedValue={allergies}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setAllergies(itemValue);
              if (itemValue !== 'Other') {
                setCustomAllergy(''); // Clear custom allergy input if predefined option is selected
              }
            }}
          >
            <Picker.Item label="Select an allergy" value="" />
            {allergyOptions.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
            <Picker.Item label="Other" value="Other" />
          </Picker>
          {allergies === 'Other' && (
            <TextInput
              style={styles.input}
              placeholder="Please specify"
              value={customAllergy}
              onChangeText={setCustomAllergy}
            />
          )}
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
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
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
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PatientDataEntry;
