import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
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
        <Pressable onPress={onMenuPress} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="white" />
        </Pressable>
        <Pressable onPress={onHomePress} style={styles.logoContainer}>
          <Image
              source={require('../../assets/logo.png')} // Update with your logo
              style={styles.logo}
              resizeMode="contain"
              alt="App logo"
          />
        </Pressable>
        <Pressable onPress={onProfilePress} style={styles.profileButton}>
          <Ionicons name="person-circle" size={24} color="white" />
        </Pressable>
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
    width: 34, // adjust the size as needed
    height: 34, // adjust the size as needed
    borderRadius: 17,
  },
});

export default HeaderComponent;

