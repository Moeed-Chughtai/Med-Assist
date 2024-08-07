import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SymptomDataEntry from '../components/SymptomDataEntry';

const Diagnosis = () => {
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  const handleSymptomDataSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SymptomDataEntry onSubmit={handleSymptomDataSubmit} />
      {diagnosisResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultHeader}>Diagnosis Result:</Text>
          <Text style={styles.resultText}>{JSON.stringify(diagnosisResult, null, 2)}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#00000020',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  resultHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  resultText: {
    fontSize: 16,
    color: '#555',
  },
});

export default Diagnosis;
