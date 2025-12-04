// app/admin/users.tsx
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const users = [
  {
    id: "1",
    name: "Aditya Kashyap",
    phone: "+91 9XXXX XXXXX",
    role: "Owner",
    trips: 14,
    kyc: "Verified",
  },
  {
    id: "2",
    name: "Rahul Singh",
    phone: "+91 8XXXX XXXXX",
    role: "Renter",
    trips: 3,
    kyc: "Pending",
  },
  {
    id: "3",
    name: "Priya Sharma",
    phone: "+91 7XXXX XXXXX",
    role: "Renter",
    trips: 0,
    kyc: "Blocked",
  },
];

export default function AdminUsersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            className="w-9 h-9 rounded-full bg-zinc-900 items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={18} color="#e5e5e5" />
          </TouchableOpacity>
          <Text className="text-sm text-zinc-300 font-medium">
            Users
          </Text>
          <View className="w-9 h-9" />
        </View>

        {users.map((u) => (
          <View
            key={u.id}
            className="mb-3 bg-zinc-900 rounded-2xl p-4 border border-zinc-800"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-[13px] text-white font-semibold">
                  {u.name}
                </Text>
                <Text className="text-[11px] text-zinc-500 mt-1">
                  {u.phone}
                </Text>
                <Text className="text-[11px] text-zinc-500 mt-1">
                  Role: {u.role} · Trips: {u.trips}
                </Text>
              </View>

              <View
                className={`px-2 py-1 rounded-full ${
                  u.kyc === "Verified"
                    ? "bg-emerald-500/10 border border-emerald-500/60"
                    : u.kyc === "Pending"
                    ? "bg-amber-500/10 border border-amber-500/60"
                    : "bg-red-500/10 border border-red-500/60"
                }`}
              >
                <Text
                  className={`text-[10px] font-medium ${
                    u.kyc === "Verified"
                      ? "text-emerald-400"
                      : u.kyc === "Pending"
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  {u.kyc}
                </Text>
              </View>
            </View>

            <View className="flex-row mt-3">
              <TouchableOpacity className="px-3 py-1 rounded-full bg-zinc-800 mr-2">
                <Text className="text-[10px] text-zinc-200">
                  View details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-3 py-1 rounded-full bg-zinc-800 mr-2">
                <Text className="text-[10px] text-zinc-200">
                  Mark KYC verified
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-3 py-1 rounded-full bg-zinc-800">
                <Text className="text-[10px] text-red-400">Block user</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
