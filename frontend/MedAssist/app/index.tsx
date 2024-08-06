import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import DiseaseDataEntry from '../components/DiseaseDataEntry';

const App = () => {
  // Sample disease object
  const disease = {
    name: 'Diabetes'
  };

  // Function to handle form submission
  const handleDataSubmit = (data) => {
    console.log('Submitted Data:', data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DiseaseDataEntry disease={disease} onSubmit={handleDataSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
