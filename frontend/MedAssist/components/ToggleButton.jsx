import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleButton = ({ options, selected, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[styles.button, selected === option && styles.selectedButton]}
          onPress={() => onSelect(option)}
        >
          <Text style={[styles.buttonText, selected === option && styles.selectedButtonText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007bff',
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedButtonText: {
    color: '#ffffff',
  },
});

export default ToggleButton;
