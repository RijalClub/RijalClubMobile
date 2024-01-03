import React, { FC } from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import FitnessScreen from './screens/FitnessScreen';
import FootballScreen from './screens/FootballScreen';
import HomeScreen from './screens/HomeScreen.tsx';
import ProfileScreen from './screens/ProfileScreen';
import CustomDrawerContent from "./components/CustomDrawerContent";

export type DrawerNavigatorParamList = {
    Home: undefined;
    Quran: undefined;
    Football: undefined;
    Fitness: undefined;
};

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();

const App: FC = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerStyle: styles.drawer,
                    drawerType: 'slide',
                    drawerActiveTintColor: 'blue',
                    drawerInactiveTintColor: '#fff',
                }}
                drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Quran" component={ProfileScreen} />
                <Drawer.Screen name="Football" component={FootballScreen} />
                <Drawer.Screen name="Fitness" component={FitnessScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    drawer: {
        backgroundColor: '#121212',
        width: 250,
    },
});

export default App;