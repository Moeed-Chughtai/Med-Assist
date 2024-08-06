import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import TreatmentDataEntry from '../components/TreatmentDataEntry'; // Adjust the path as necessary

const App = () => {
  // Function to handle form submission
  const handleDataSubmit = (data) => {
    console.log('Submitted Data:', data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TreatmentDataEntry onSubmit={handleDataSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 15,
  },
});

export default App;
