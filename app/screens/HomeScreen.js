import React from 'react';
import { Box, Text, VStack, Avatar, AvatarFallbackText, AvatarImage } from '@gluestack-ui/themed';

const HomeScreen = () => {
    return (
        <Box flex={1} alignItems="center" justifyContent="center">
            <VStack space={4} alignItems="center">
                <Avatar size="lg">
                    <AvatarImage
                        source={require("../../assets/logo.png")}
                        alt={"Rijal Logo"}
                    />
                    <AvatarFallbackText>Initials</AvatarFallbackText>
                </Avatar>
                <Text>Welcome to the Rijal App!!!</Text>
            </VStack>
        </Box>
        );
}

export default HomeScreen;
