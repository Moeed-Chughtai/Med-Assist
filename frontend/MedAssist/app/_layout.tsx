import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="#007bff"
        />
        <Header onMenuPress={undefined} onNotificationPress={undefined} />
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
        <Footer />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});

export default Layout;
