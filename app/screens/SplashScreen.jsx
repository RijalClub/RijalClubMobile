import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import SplashScreenContentComponent from '../components/SplashScreenContentComponent';

const SplashScreen = ({ onAnimationComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity

  useEffect(() => {
    // Fade in the background and content together
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // 1 second for fade in
      useNativeDriver: true,
    }).start(() => {
      // After the background and content have faded in, wait for 2 seconds then fade out
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000, // 1 second for fade out
          useNativeDriver: true,
        }).start(onAnimationComplete);
        }, 2000); // 2 seconds delay
    });
    }, [fadeAnim, onAnimationComplete]);

  return (
    <Animated.View
      style={{
      ...styles.container,
        opacity: fadeAnim,
        transform: [
        {
          scale: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1], // Scales up from 0.9 to 1
          }),
        },
        ],
      }}
      >
      <SplashScreenContentComponent />
    </Animated.View>
    );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
};

export default SplashScreen;
