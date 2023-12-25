import React, {useState, useEffect} from 'react';
import {StyleSheet, BackHandler} from 'react-native';
import {Box, VStack, HStack, Text, View, Pressable} from '@gluestack-ui/themed';
import {Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {useAtom} from "jotai";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {routerHistoryAtom} from "./utils/atoms";
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
    const [history, setHistory] = useAtom(routerHistoryAtom);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButtonPress
        );
        return () => backHandler.remove();
    }, [history]);

    const navigateToScreen = (screen) => {
        setHistory(prevHistory => [...prevHistory, screen]); // Push new screen to history
        setActiveScreen(screen);
    };

    const handleBackButtonPress = () => {
        if (history.length > 1) {
            const newHistory = history.slice(0, history.length - 1); // Remove the last screen
            setHistory(newHistory);
            setActiveScreen(newHistory[newHistory.length - 1]); // Set the previous screen as active
            return true;
        }
        BackHandler.exitApp();
        return true; // To do nothing
    };


    const renderScreen = () => {
        switch (activeScreen) {
            case 'Fitness':
                return <FitnessScreen handleBackPress={handleBackButtonPress}/>;
            case 'Football':
                return <FootballScreen handleBackPress={handleBackButtonPress}/>;
            case 'Profile':
                return <ProfileScreen handleBackPress={handleBackButtonPress}/>;
            default:
                return <HomeScreen handleBackPress={handleBackButtonPress}/>;
        }
    };

    return (
            <NavigationContainer>
                <Box flex={1} style={{ paddingBottom: Math.max(insets.bottom, 10), paddingTop: Math.max(insets.top, 10)}}>
                    <View style={styles.container}>
                    {renderScreen()}
                    </View>
                    <HStack justifyContent="space-around" paddingX="20px" paddingY="10px" style={styles.navBar}>
                        <TabIcon name="football-outline" label="Football" onPress={() => navigateToScreen('Football')}
                                 active={activeScreen === 'Football'}/>
                        <TabIcon name="home" label="Home" onPress={() => navigateToScreen('Home')}
                                 active={activeScreen === 'Home'}/>
                        <TabIcon name="fitness-outline" label="Fitness" onPress={() => navigateToScreen('Fitness')}
                                 active={activeScreen === 'Fitness'}/>
                        <TabIcon name="person-outline" label="Profile" onPress={() => navigateToScreen('Profile')}
                                 active={activeScreen === 'Profile'}/>
                    </HStack>
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
        paddingTop : 15
    }
});

export default App;
