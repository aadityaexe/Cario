// app/_layout.tsx
import { Stack } from "expo-router";
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Explicitly declare splash & index, rest auto-registered */}
        <Stack.Screen name="splash" />
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaProvider>
  );
}
