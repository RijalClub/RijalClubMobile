import React from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FitnessScreen from './screens/FitnessScreen';
import FootballScreen from './screens/FootballScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import CustomDrawerContent from "./components/CustomDrawerContent";

const App = () => {
    const Drawer = createDrawerNavigator();
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false, // Hide default header
                    drawerStyle: styles.drawer,
                    drawerType: 'slide',
                    drawerActiveTintColor: 'blue', // Color for the active item
                    drawerInactiveTintColor: '#fff',
                }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Fitness" component={FitnessScreen} />
                <Drawer.Screen name="Football" component={FootballScreen} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
        );
};

const styles = StyleSheet.create({
    drawer: {
        backgroundColor: '#121212', // primary dark background
        width: 250, // Adjust the width as needed
    },
});

export default App;
