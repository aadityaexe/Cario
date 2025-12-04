import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const methods = ["UPI", "Credit Card", "Debit Card", "Net Banking"];

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center px-5 py-3 border-b border-zinc-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="chevron-back" size={20} color="white"/>
        </TouchableOpacity>
        <Text className="text-white text-base font-bold flex-1">Payment Methods</Text>
      </View>

      <View className="p-5">
        {methods.map((m,i) => (
          <TouchableOpacity
            key={i}
            className="flex-row items-center bg-zinc-900 border border-zinc-800 rounded-full px-3 h-12 mb-2"
            onPress={() => Alert.alert("Payment", m + " selected ✅")}
          >
            <Ionicons name="card-outline" size={20} color="white" className="ml-1 mr-3"/>
            <Text className="text-zinc-300 font-semibold text-sm flex-1">{m}</Text>
            <Ionicons name="chevron-forward" size={16} color="#71717a"/>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
