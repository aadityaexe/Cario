import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyNumberScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center">
      <Text className="text-white text-xl font-bold mb-2">My Number</Text>
      <Text className="text-zinc-400">+91 XXXXX XXXXX</Text>
    </SafeAreaView>
 );
}
