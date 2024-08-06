import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ToggleButton from './ToggleButton';

const ImageUploader = () => {
  const [imageUri, setImageUri] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const toggleOptions = ['Brain Scan', 'Chest X-ray', 'Blood Test'];

  const handleImagePick = async () => {
    // Ask for permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCalculate = () => {
    // Implement the calculate logic here
    Alert.alert('Calculation Result', `Selected Option: ${selectedOption}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload and Display Image</Text>
      <TouchableOpacity style={styles.button} onPress={handleImagePick}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.noImageText}>No image selected</Text>
      )}
      <ToggleButton
        options={toggleOptions}
        selected={selectedOption}
        onSelect={(option) => setSelectedOption(option)}
      />
      <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
        <Text style={styles.calculateButtonText}>Calculate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  noImageText: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
  calculateButton: {
    backgroundColor: '#28a745',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  calculateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ImageUploader;
