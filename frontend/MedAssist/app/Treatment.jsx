import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import TreatmentDataEntry from '../components/TreatmentDataEntry';

const Treatment = () => {
  const handleSubmit = (formData) => {
    console.log('Submitted Data:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TreatmentDataEntry onSubmit={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});

export default Treatment;
