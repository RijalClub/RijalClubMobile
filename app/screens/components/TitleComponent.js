import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@gluestack-ui/themed';

const Title = ({ children, style }) => (
  <Text style={[styles.titleStyle, style]}>{children}</Text>
  );

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default Title;