import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Diagnosis from './Diagnosis';
import Header from '../components/Header';
import Footer from '../components/Footer';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header onMenuPress={undefined} onNotificationPress={undefined} />
      <Diagnosis />
      <Footer />
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
