import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated";

const SplashScreenContentComponent: React.FC = () => {
  const fadeAnim = useSharedValue(0); // Initial value for opacity: 0
  const logoAnim = useSharedValue(0);
  const translateXAnim = useSharedValue(-100); // Initial value for translateX: -100

  useEffect(() => {
    fadeAnim.value = withSequence(
      withTiming(1, { duration: 500 }),
      withDelay(1000, withTiming(0, { duration: 2500 })),
    );

    logoAnim.value = withSequence(
      withTiming(1, { duration: 3500 }),
      withDelay(1000, withTiming(0, { duration: 1000 })),
    );

    translateXAnim.value = withTiming(0, { duration: 1500 });
  }, []);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoAnim.value,
  }));

  const translateXStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXAnim.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          padding: 24,
        },
        fadeStyle,
      ]}
    >
      <Animated.Image
        source={require("../../assets/logo.png")}
        alt="Logo"
        resizeMode="contain"
        style={[{ height: "50%", marginBottom: 4 }, logoStyle]}
      />
      <Animated.Text
        style={[
          {
            fontSize: 24,
            fontWeight: "bold",
            color: "#FFFFFF",
            marginBottom: 2,
          },
          translateXStyle,
        ]}
      >
        Rijal Club
      </Animated.Text>
      <Animated.Text
        style={[
          {
            fontSize: 16,
            color: "#FFFFFF",
          },
          translateXStyle,
        ]}
      >
        May peace be upon you
      </Animated.Text>
    </Animated.View>
  );
};

export default SplashScreenContentComponent;
