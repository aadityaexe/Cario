import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function OtpScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const [otp, setOtp] = useState("");

  // TEMP: hardcoded admin numbers for demo
  const adminPhones = ["9999999999", "8888888888", "7777777777"]; // change to what you want

  const verifyOtp = () => {
    console.log("Verified:", phone, otp);

    // === FRONTEND ROLE CHECK (DEMO) ===
    if (phone && adminPhones.includes(phone.toString())) {
      // 👑 Admin → go to admin UI
      router.replace("/admin");
    } else {
      // Normal user / owner → renter app tabs
      router.replace("/(tabs)/home");
    }
  };

  return (
    <View className="flex-1 bg-black px-6 justify-center">
      <Text className="text-white text-3xl font-semibold mb-2">Enter OTP</Text>
      <Text className="text-zinc-400 text-sm mb-8">
        OTP sent to +91 {phone}
      </Text>

      <TextInput
        className="w-full border border-zinc-700 text-white rounded-2xl px-4 py-3 text-center text-2xl tracking-widest mb-6"
        placeholder="------"
        keyboardType="number-pad"
        maxLength={6}
        placeholderTextColor="#52525b"
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity
        className="bg-emerald-400 rounded-full py-4 items-center"
        disabled={otp.length < 4}
        onPress={verifyOtp}
        style={{ opacity: otp.length >= 4 ? 1 : 0.5 }}
      >
        <Text className="text-black text-base font-semibold">Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-emerald-400 text-xs text-center mt-3">
          Change phone number
        </Text>
      </TouchableOpacity>
    </View>
  );
}
