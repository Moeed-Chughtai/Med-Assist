import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import DiseaseList from '../components/DiseaseList';
import DiseaseDataEntry from '../components/DiseaseDataEntry';

const Diagnosis = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);

  const handleDiseaseSelect = (disease) => {
    setSelectedDisease(disease);
  };

  const handleSymptomDataSubmit = (formData) => {
    Alert.alert('Data Submitted', 'Form data has been submitted successfully.');
    setSelectedDisease(null); // Resetting to show the disease list
  };

  return (
    <View style={styles.container}>
      {selectedDisease ? (
        <DiseaseDataEntry disease={selectedDisease} onSubmit={handleSymptomDataSubmit} />
      ) : (
        <DiseaseList onDiseaseSelect={handleDiseaseSelect} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
});

export default Diagnosis;
