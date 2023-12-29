import React from 'react';
import { StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props} style={styles.container}>
            <DrawerItemList {...props} />
            {/* Add additional custom components or items if needed */}
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
});

export default CustomDrawerContent;