import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const router = useRouter();

  const settingsItems = [
    { icon: "person-outline", label: "Account" },
    { icon: "notifications-outline", label: "Notifications" },
    { icon: "car-outline", label: "Car Preferences" },
    { icon: "shield-checkmark-outline", label: "Privacy & Security" },
    { icon: "help-circle-outline", label: "Help & Support" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>

        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            className="w-9 h-9 rounded-full bg-zinc-900 items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={18} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold ml-3 flex-1">
            Settings
          </Text>
        </View>

        {/* Settings list */}
        {settingsItems.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            className="flex-row items-center bg-zinc-900 rounded-2xl px-4 py-3 mb-3"
            onPress={() => Alert.alert(item.label, "This will connect to backend later")}
          >
            <Ionicons name={item.icon} size={20} color="white" />
            <Text className="text-zinc-300 font-medium text-sm ml-3 flex-1">
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#71717a" />
          </TouchableOpacity>
        ))}

        {/* Logout button */}
        <TouchableOpacity
          className="w-full bg-red-500/20 rounded-full py-4 items-center mt-4 border border-red-500/50"
          onPress={() => Alert.alert("Logged out ✅")}
        >
          <Text className="text-red-400 font-bold text-sm">Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
