import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const NotificationModalComponent = ({ notification, isVisible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <AntDesign name="closecircle" size={24} color="black" />
                    </TouchableOpacity>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.title}>{notification.title}</Text>
                        <Text style={styles.timestamp}>{new Date(notification.timestamp).toLocaleString()}</Text>
                        <Text style={styles.message}>{notification.message}</Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        shadowRadius: 10,
        shadowOpacity: 0.25,
        elevation: 5,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    scrollView: {
        marginVertical: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
    },
    timestamp: {
        fontSize: 14,
        color: 'grey',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default NotificationModalComponent;
