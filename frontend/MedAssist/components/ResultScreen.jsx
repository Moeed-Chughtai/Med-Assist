import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultScreen = ({ route }) => {
  const { result } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Prediction Result</Text>
      <Text style={styles.resultText}>Predicted Class: {result.predicted_class}</Text>
      <Text style={styles.resultText}>Probabilities: {result.probabilities.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ResultScreen;
