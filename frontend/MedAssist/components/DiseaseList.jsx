import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

const diseases = [
  { id: '1', name: 'Cirrhosis', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Hepatitis C', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Heart Failure', image: 'https://via.placeholder.com/100' },
  { id: '4', name: 'Stroke', image: 'https://via.placeholder.com/100' },
  { id: '5', name: 'Diabetes', image: 'https://via.placeholder.com/100' },
  { id: '6', name: 'Body Fat', image: 'https://via.placeholder.com/100' }
];

const DiseaseList = () => {
  const [search, setSearch] = useState('');
  const [filteredDiseases, setFilteredDiseases] = useState(diseases);

  const handleSearch = (text) => {
    setSearch(text);
    setFilteredDiseases(
      diseases.filter((disease) =>
        disease.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const renderDisease = ({ item }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Button
          title="CHECK"
          buttonStyle={styles.button}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a disease..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredDiseases}
        renderItem={renderDisease}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  searchBar: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 18,
    elevation: 2,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 10,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});

export default DiseaseList;
