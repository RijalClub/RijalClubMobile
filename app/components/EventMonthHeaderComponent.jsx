import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const EventMonthHeaderComponent = ({ monthYear }) => (
    <View style={styles.monthHeaderContainer}>
        <Text style={styles.monthHeaderText}>{monthYear}</Text>
    </View>
);

const styles = StyleSheet.create({
    monthHeaderContainer: {
        paddingVertical: 10,
        // backgroundColor: '#262626', // Secondary Background
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    monthHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D0D0D0', // Text Color
    },
});

export default EventMonthHeaderComponent;
