// HeaderSection.js
import React from 'react';
import { Avatar, Card, Button } from 'react-native-paper';

const HeaderSection = ({ user }) => {
    return (
        <Card>
            <Card.Title
                title={user.name}
                subtitle={user.bio}
                left={(props) => <Avatar.Image {...props} source={{ uri: user.profilePicture }} />}
            />
            <Card.Actions>
                <Button>Edit Profile</Button>
            </Card.Actions>
        </Card>
        );
};

export default HeaderSection;
