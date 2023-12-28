import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {View} from '@gluestack-ui/themed';
import {useAtom} from 'jotai';
import {userAtom, checkedEmailAtom, userExistsAtom} from '../utils/atoms';
import EmailCheckComponent from '../components/EmailCheckComponent';
import SignUpComponent from '../components/SignUpComponent';
import SignInComponent from '../components/SignInComponent';
import UserProfileComponent from '../components/UserProfileComponent';
import HeaderComponent from "../components/HeaderComponent";

const ProfileScreen = ({ navigation }) => {
    const [user] = useAtom(userAtom);
    const [checkedEmail] = useAtom(checkedEmailAtom);
    const [userExists] = useAtom(userExistsAtom);

    return (
        <>
            <HeaderComponent navigation={navigation} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <View style={styles.container}>
                    {user ? (
                        <UserProfileComponent/>
                        ) : (
                            <>
                            {checkedEmail ? userExists ? <SignInComponent/> : <SignUpComponent/> : <EmailCheckComponent/> }
                            </>
                            )}
                </View>
            </View>
 </TouchableWithoutFeedback>
        </>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Aligns content to the top with space for the header
        alignItems: 'center',
        paddingTop: 40, // Adds top padding to give space from the header
        backgroundColor: '#f0f0f0', // Keeps the background color light and neutral
    },
});

export default ProfileScreen;
