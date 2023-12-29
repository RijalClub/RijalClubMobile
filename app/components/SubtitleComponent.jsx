import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@gluestack-ui/themed';

const Subtitle = ({ children, style }) => (
  <Text style={[styles.subtitleStyle, style]}>{children}</Text>
  );

const styles = StyleSheet.create({
  subtitleStyle: {
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
  }
});

export default Subtitle;