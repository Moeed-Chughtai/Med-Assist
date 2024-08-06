import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import DiseaseList from '../components/DiseaseList';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DiseaseList />
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
