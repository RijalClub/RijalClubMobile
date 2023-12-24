import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from '@gluestack-ui/themed';
import {useAtom} from 'jotai';
import {userAtom, checkedEmailAtom, userExistsAtom} from '../utils/atoms';
import EmailVerificationComponent from './components/EmailVerificationComponent';
import SignUpComponent from './components/SignUpComponent';
import SignInComponent from './components/SignInComponent';
import UserProfileComponent from './components/UserProfileComponent';

const ProfileScreen = () => {
    const [user] = useAtom(userAtom);
    const [checkedEmail] = useAtom(checkedEmailAtom);
    const [userExists] = useAtom(userExistsAtom);

    return (
        <View style={styles.container}>
            {user ? (
                <UserProfileComponent/>
            ) : (
                <>
                {checkedEmail ? userExists ? <SignInComponent/> : <SignUpComponent/> : <EmailVerificationComponent/> }
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0', // Choose a light neutral background color
    },
});

export default ProfileScreen;
