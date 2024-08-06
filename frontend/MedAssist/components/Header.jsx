import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import menuIcon from '../assets/icons/menu.png';
import notificationIcon from '../assets/icons/notification.png';

const Header = ({ onMenuPress, onNotificationPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Image
          source={menuIcon}
          style={styles.menuIcon}
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onNotificationPress} style={styles.notificationButton}>
        <Image
          source={notificationIcon}
          style={styles.notificationIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    width: 22,
    height: 22,
    tintColor: '#007bff',
  },
  notificationButton: {
    padding: 5,
  },
  notificationIcon: {
    width: 24,
    height: 24,
    tintColor: '#007bff',
  },
});

export default Header;
