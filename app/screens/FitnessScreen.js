import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FitnessScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the Fitness Screen!</Text>
            {/* Add more UI elements here as needed */}
        </View>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default FitnessScreen;
