import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Account from './Account';
import Header from '../components/Header';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header onMenuPress={undefined} onNotificationPress={undefined} />
      <Account />
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
