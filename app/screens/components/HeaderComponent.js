import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { View, Text } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';

const HeaderComponent = ({ onBackPress, title }) => {
  const showBackButton = Platform.OS === 'ios' && onBackPress;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {showBackButton && (
          <Pressable onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        )}
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    minHeight: 44,
  },
  backButton: {
    position: 'absolute',
    left: 15, // Adjust this value as needed to align the back button
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%', // Set width to 100% to ensure centering
  },
});

export default HeaderComponent;