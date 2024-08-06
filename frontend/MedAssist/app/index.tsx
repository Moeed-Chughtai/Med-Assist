import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import ImageUploader from '../components/ImageUploader'; // Adjust the path as necessary

const App = () => {
  // Function to handle image upload
  const handleImageUpload = (image) => {
    console.log('Uploaded Image:', image);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageUploader onUpload={handleImageUpload} />
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
