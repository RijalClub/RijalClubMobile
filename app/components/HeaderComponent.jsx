import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { View, Image, Pressable } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';

const HeaderComponent = ({ onBackPress}) => {
  const showBackButton = Platform.OS === 'ios' && onBackPress;

  const logoPath = require('../../assets/logo.png');

  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <Pressable onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      )}
      {/* The header will now be centered horizontally */}
      <View style={styles.header}>
        <Image
          source={logoPath}
          style={styles.logo}
          resizeMode="contain"
          alt="rijal logo"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: '100%',
    justifyContent: 'center', // Center children horizontally
  },
  header: {
    flex: 1, // Take up all available space
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center', // Center children horizontally
    alignItems: 'center', // Center children vertically
  },
  backButton: {
    position: 'absolute', // Position the back button absolutely
    left: 10, // Place it 10 units from the left
    zIndex: 10, // Ensure it's above other elements
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignSelf: 'center',
  },
});

export default HeaderComponent;
