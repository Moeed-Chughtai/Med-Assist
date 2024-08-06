import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import ImageUploader from '../components/ImageUploader';

const ImageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ImageUploader />
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
});

export default ImageScreen;
