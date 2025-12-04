// app/admin/index.tsx
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-5">
          <View>
            <Text className="text-xs text-emerald-400 font-medium">
              Admin panel
            </Text>
            <Text className="text-xl text-white font-semibold mt-1">
              Carigo Control
            </Text>
            <Text className="text-[11px] text-zinc-500 mt-1">
              Manage users, cars & bookings.
            </Text>
          </View>

          <TouchableOpacity
            className="w-9 h-9 rounded-full bg-zinc-900 items-center justify-center"
            onPress={() => router.replace("/(tabs)/home")}
          >
            <Ionicons name="home-outline" size={18} color="#e5e5e5" />
          </TouchableOpacity>
        </View>

        {/* Stats row */}
        <View className="flex-row mb-4">
          <View className="flex-1 bg-zinc-900 rounded-2xl p-4 mr-2 border border-zinc-800">
            <Text className="text-[11px] text-zinc-400">Total users</Text>
            <Text className="text-2xl text-white font-bold mt-1">248</Text>
            <Text className="text-[10px] text-emerald-400 mt-1">
              +12 this week
            </Text>
          </View>

          <View className="flex-1 bg-zinc-900 rounded-2xl p-4 ml-2 border border-zinc-800">
            <Text className="text-[11px] text-zinc-400">Active bookings</Text>
            <Text className="text-2xl text-white font-bold mt-1">7</Text>
            <Text className="text-[10px] text-zinc-500 mt-1">
              Across Patna & nearby
            </Text>
          </View>
        </View>

        {/* Second stats row */}
        <View className="flex-row mb-6">
          <View className="flex-1 bg-zinc-900 rounded-2xl p-4 mr-2 border border-zinc-800">
            <Text className="text-[11px] text-zinc-400">Cars listed</Text>
            <Text className="text-2xl text-white font-bold mt-1">32</Text>
            <Text className="text-[10px] text-zinc-500 mt-1">
              4 pending approval
            </Text>
          </View>

          <View className="flex-1 bg-zinc-900 rounded-2xl p-4 ml-2 border border-zinc-800">
            <Text className="text-[11px] text-zinc-400">Today&apos;s revenue</Text>
            <Text className="text-2xl text-white font-bold mt-1">
              ₹12,450
            </Text>
            <Text className="text-[10px] text-emerald-400 mt-1">
              +₹3,100 vs yesterday
            </Text>
          </View>
        </View>

        {/* Sections */}
        <Text className="text-sm text-zinc-400 font-semibold mb-3">
          Manage
        </Text>

        <AdminRow
          icon="people-outline"
          label="Users"
          sub="Renters & owners, KYC status"
          onPress={() => router.push("/admin/users")}
        />
        <AdminRow
          icon="car-sport-outline"
          label="Cars"
          sub="Approve, block or edit car details"
          onPress={() => router.push("/admin/cars")}
        />
        <AdminRow
          icon="receipt-outline"
          label="Bookings"
          sub="View all trips, cancellations, refunds"
          onPress={() => router.push("/admin/bookings")}
        />

        <Text className="text-sm text-zinc-400 font-semibold mt-8 mb-3">
          Admin tools
        </Text>

        <AdminRow
          icon="shield-checkmark-outline"
          label="KYC & reports"
          sub="Flag suspicious activity, verify documents"
          onPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

type AdminRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub: string;
  onPress: () => void;
};

function AdminRow({ icon, label, sub, onPress }: AdminRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 mb-3"
    >
      <View className="w-9 h-9 rounded-full bg-zinc-800 items-center justify-center">
        <Ionicons name={icon} size={18} color="#e5e5e5" />
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-[13px] text-white font-semibold">{label}</Text>
        <Text className="text-[11px] text-zinc-500 mt-0.5" numberOfLines={1}>
          {sub}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#71717a" />
    </TouchableOpacity>
  );
}
