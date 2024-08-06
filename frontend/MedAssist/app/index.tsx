import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import Account from './Account';
import Header from '../components/Header';
import Footer from '../components/Footer';

const App = () => {
  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.container}>
        <Header onMenuPress={undefined} onNotificationPress={undefined} />
        <Account />
        <Footer />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#007bff',
  },
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
