import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, Box, HStack, VStack, Progress, ProgressFilledTrack } from '@gluestack-ui/themed';
import HeaderComponent from "../components/HeaderComponent";

const FitnessScreen = ({ navigation }) => {
    return (
        <>
            <HeaderComponent navigation={navigation} />
        <ScrollView style={styles.container}>
            <Box style={styles.statsBox}>
                <HStack space="md" alignItems="center">
                    <VStack space="sm">
                        <Text style={styles.statTitle}>Steps Today</Text>
                        <Progress value={70} w={150} size="md"  >
                            <ProgressFilledTrack />
                        </Progress>
                        <Text style={styles.statValue}>7,000 / 10,000</Text>
                    </VStack>
                    <VStack space="sm">
                        <Text style={styles.statTitle}>Calories Burned</Text>
                        <Progress value={50} w={150} size="md"  >
                            <ProgressFilledTrack />
                        </Progress>
                        <Text style={styles.statValue}>500 / 1,000</Text>
                    </VStack>
                </HStack>
            </Box>

            <VStack space="lg" alignItems="center">
                <Text style={styles.sectionTitle}>Today's Workout</Text>
                <Box style={styles.workoutBox}>
                    <Text style={styles.workoutText}>Cardio - 30 mins</Text>
                    <Text style={styles.workoutText}>Strength Training - 45 mins</Text>
                    <Text style={styles.workoutText}>Yoga - 15 mins</Text>
                </Box>

                <Text style={styles.sectionTitle}>Nutrition</Text>
                <Box style={styles.nutritionBox}>
                    <Text style={styles.nutritionText}>Protein: 120g</Text>
                    <Text style={styles.nutritionText}>Carbs: 200g</Text>
                    <Text style={styles.nutritionText}>Fats: 50g</Text>
                </Box>

                <Text style={styles.sectionTitle}>Water Intake</Text>
                <Progress value={60} w={300} size="md"  >
                    <ProgressFilledTrack />
                </Progress>
                <Text style={styles.waterText}>6 / 10 Glasses</Text>
            </VStack>
        </ScrollView>
        </>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
    },
    statsBox: {
        padding: 20,
    },
    statTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statValue: {
        fontSize: 14,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    workoutBox: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        width: '90%',
    },
    workoutText: {
        fontSize: 16,
        marginVertical: 5,
    },
    nutritionBox: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        width: '90%',
    },
    nutritionText: {
        fontSize: 16,
        marginVertical: 5,
    },
    waterBar: {
        width: '90%',
        height: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    waterText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 5,
    },
    // ... (other styles you may need)
});

export default FitnessScreen;
