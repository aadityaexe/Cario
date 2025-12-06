import { View, Text, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // animation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    // redirect after 1.8s
    const timeout = setTimeout(() => {
      router.replace("/");
    }, 1800);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View className="flex-1 bg-black items-center justify-center">
   <Animated.Image
  source={require("../assets/images/carigo_logo.jpeg")}
  style={{
    width: 140,
    height: 140,
    opacity,
    transform: [{ scale }],
  }}
  resizeMode="contain"
/>

    </View>
  );
}
