import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

// Replace with actual image paths or URLs
import classifyIcon from '../assets/icons/classify.png';
import aidIcon from '../assets/icons/aid.png';
import uploadIcon from '../assets/icons/upload.png';
import userIcon from '../assets/icons/user.png';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.menuButton}>
        <Image source={classifyIcon} style={styles.menuIcon} />
        <Text style={styles.menuText}>Diagnosis</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton}>
        <Image source={aidIcon} style={styles.menuIcon} />
        <Text style={styles.menuText}>Treatment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton}>
        <Image source={uploadIcon} style={styles.menuIcon} />
        <Text style={styles.menuText}>Scans</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton}>
        <Image source={userIcon} style={styles.menuIcon} />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuButton: {
    alignItems: 'center',
    width: '25%',
  },
  menuIcon: {
    width: 25,
    height: 25,
    marginBottom: 5,
    tintColor: '#007bff',
  },
  menuText: {
    fontSize: 12,
    color: '#007bff',
  },
});

export default Footer;
