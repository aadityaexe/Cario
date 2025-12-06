import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AdminKycReports() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            className="w-9 h-9 bg-zinc-900 rounded-full items-center justify-center mr-3"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={18} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">KYC & Reports</Text>
        </View>

        {/* KYC Card */}
        <TouchableOpacity
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4 flex-row items-center"
          onPress={() => router.push("/admin/kyc")}
        >
          <View className="w-10 h-10 bg-emerald-500/20 rounded-full items-center justify-center">
            <Ionicons name="id-card-outline" size={20} color="#22c55e" />
          </View>

          <View className="ml-3 flex-1">
            <Text className="text-white font-semibold text-sm">KYC Verification</Text>
            <Text className="text-[11px] text-zinc-400">
              Verify Aadhaar, licence & selfie uploads.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#71717a" />
        </TouchableOpacity>

        {/* Reports Card */}
        <TouchableOpacity
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4 flex-row items-center"
          onPress={() => router.push("/admin/reports")}
        >
          <View className="w-10 h-10 bg-sky-500/20 rounded-full items-center justify-center">
            <Ionicons name="bar-chart-outline" size={20} color="#38bdf8" />
          </View>

          <View className="ml-3 flex-1">
            <Text className="text-white font-semibold text-sm">Reports & Analytics</Text>
            <Text className="text-[11px] text-zinc-400">
              Trips, revenue & admin insights.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#71717a" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
