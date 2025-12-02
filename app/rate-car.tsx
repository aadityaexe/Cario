import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Rating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";

export default function RateCarScreen() {
  const router = useRouter();
  const { car } = useLocalSearchParams();
  const [rating, setRating] = useState(4);

  const submitRating = () => {
    console.log(`Rating submitted for ${car}:`, rating);
    alert("Thanks for rating! ✅");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-black px-6 justify-center items-center">

      <View className="flex-row items-center w-full mb-8">
        <TouchableOpacity
          className="w-9 h-9 rounded-full bg-zinc-900 items-center justify-center"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={18} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold ml-3 flex-1">Rate Car</Text>
      </View>

      <Ionicons name="car-sport-outline" size={55} color="#34d399" className="mb-5" />
      <Text className="text-white text-xl font-bold mb-2">{car}</Text>
      <Text className="text-zinc-400 text-xs mb-6">Share your trip experience 😊</Text>

      <Rating
        startingValue={rating}
        ratingCount={5}
        imageSize={32}
        showRating={false}
        onFinishRating={(value) => setRating(value)}
        type="custom"
        tintColor="black"
        ratingBackgroundColor="#27272a"
        ratingColor="#34d399"
      />

      <TouchableOpacity
        onPress={submitRating}
        className="bg-emerald-400 px-7 py-4 rounded-full mt-6"
      >
        <Text className="text-black font-bold text-sm">Submit Rating ⭐</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
