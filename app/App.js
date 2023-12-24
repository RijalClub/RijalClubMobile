import React, {useState} from 'react';
import {SafeAreaView, Pressable, StyleSheet} from 'react-native';
import {Box, VStack, HStack, Text, View} from '@gluestack-ui/themed';
import {Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';

// Import your actual screen components
import FitnessScreen from './screens/FitnessScreen';
import FootballScreen from './screens/FootballScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const TabIcon = ({name, label, onPress, active}) => (
    <Pressable onPress={onPress}>
        <VStack alignItems="center">
            <Ionicons name={name} size={24} color={active ? "blue" : "gray"}/>
            <Text color={active ? "blue" : "gray"}>{label}</Text>
        </VStack>
    </Pressable>
);

const App = () => {
    const [activeScreen, setActiveScreen] = useState('Home');

    const renderScreen = () => {
        switch (activeScreen) {
            case 'Fitness':
                return <FitnessScreen/>;
            case 'Football':
                return <FootballScreen/>;
            case 'Profile':
                return <ProfileScreen/>;
            default:
                return <HomeScreen/>;
        }
    };

    return (
            <NavigationContainer>
                <Box flex={1}>
                    <View style={styles.container}>
                    {renderScreen()}
                    </View>
                  <SafeAreaView>
                    <HStack justifyContent="space-around" paddingX="20px" paddingY="10px" style={styles.navBar}>
                        <TabIcon name="football-outline" label="Football" onPress={() => setActiveScreen('Football')}
                                 active={activeScreen === 'Football'}/>
                        <TabIcon name="home" label="Home" onPress={() => setActiveScreen('Home')}
                                 active={activeScreen === 'Home'}/>
                        <TabIcon name="fitness-outline" label="Fitness" onPress={() => setActiveScreen('Fitness')}
                                 active={activeScreen === 'Fitness'}/>
                        <TabIcon name="person-outline" label="Profile" onPress={() => setActiveScreen('Profile')}
                                 active={activeScreen === 'Profile'}/>
                    </HStack>
                  </SafeAreaView>
                </Box>
            </NavigationContainer>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
    },
    navBar: {
        paddingTop : 10
    }
});

export default App;
