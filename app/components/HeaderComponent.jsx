// HeaderComponent.jsx
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Image } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';

const HeaderComponent = ({navigation}) => {
    const onMenuPress = () => {
        navigation.toggleDrawer();
    };

    const onProfilePress = () => {
        navigation.navigate('Profile');
    };

    const onHomePress = () => {
        navigation.navigate('Home');
    };

  return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onHomePress} style={styles.logoContainer}>
          <Image
              source={require('../../assets/logo.png')} // Update with your logo
              style={styles.logo}
              resizeMode="contain"
              alt="App logo"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
          <Ionicons name="person-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#121212', // primary dark background
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // space out menu, logo, and profile
    height: 60,
    paddingHorizontal: 10, // add some horizontal padding
  },
  menuButton: {
    // add styles if needed
  },
  logoContainer: {
    flex: 1, // ensure the logo stays centered
    alignItems: 'center', // center logo
  },
  profileButton: {
    // add styles if needed
  },
  logo: {
    width: 30, // adjust the size as needed
    height: 30, // adjust the size as needed
  },
});

export default HeaderComponent;

