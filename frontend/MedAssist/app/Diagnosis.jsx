import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import DiseaseList from '../components/DiseaseList';
import DiseaseDataEntry from '../components/DiseaseDataEntry';

const Diagnosis = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);

  const handleDiseaseSelect = (disease) => {
    setSelectedDisease(disease);
  };

  const handleSymptomDataSubmit = (formData) => {
    console.log('Form Data:', formData);
    setSelectedDisease(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedDisease ? (
        <DiseaseDataEntry disease={selectedDisease} onSubmit={handleSymptomDataSubmit} />
      ) : (
        <DiseaseList onDiseaseSelect={handleDiseaseSelect} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
});

export default Diagnosis;
