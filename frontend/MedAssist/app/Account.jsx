import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PharmacyComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImage}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} />
        </View>
        <Text style={styles.profileName}>John Smith</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.icon} />
          <Text style={styles.iconText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.icon} />
          <Text style={styles.iconText}>Saved Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.icon} />
          <Text style={styles.iconText}>Shifts</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.title} style={styles.menuItem}>
            <Image source={{ uri: item.icon }} style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.title}</Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const menuItems = [
  { title: 'Appointments', icon: 'https://via.placeholder.com/100' },
  { title: 'Patients', icon: 'https://via.placeholder.com/100' },
  { title: 'Departments', icon: 'https://via.placeholder.com/100' },
  { title: 'Shifts', icon: 'https://via.placeholder.com/100' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#d3d3d3',
    borderWidth: 3,
    borderColor: '#007bff',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileNumber: {
    fontSize: 18,
    color: '#555',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  iconButton: {
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  iconText: {
    fontSize: 14,
    color: '#333',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    color: '#007bff',
  },
});

export default PharmacyComponent;
