// app/admin/bookings.tsx
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const bookings = [
  {
    id: "BKG1234",
    user: "Rahul Singh",
    car: "Hyundai i20",
    route: "Patna → Gaya",
    date: "02 Dec · 08:00 AM",
    status: "Ongoing",
    amount: 2499,
  },
  {
    id: "BKG1235",
    user: "Priya Sharma",
    car: "Maruti Baleno",
    route: "Patna local",
    date: "28 Nov · 10:30 AM",
    status: "Completed",
    amount: 1599,
  },
];

export default function AdminBookingsScreen() {
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
            Bookings
          </Text>
          <View className="w-9 h-9" />
        </View>

        {bookings.map((b) => (
          <View
            key={b.id}
            className="mb-3 bg-zinc-900 rounded-2xl p-4 border border-zinc-800"
          >
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-[12px] text-zinc-400">
                #{b.id}
              </Text>
              <Text className="text-[11px] text-zinc-500">
                ₹{b.amount}
              </Text>
            </View>

            <Text className="text-[13px] text-white font-semibold">
              {b.user}
            </Text>
            <Text className="text-[11px] text-zinc-400 mt-1">
              {b.car} · {b.route}
            </Text>
            <Text className="text-[11px] text-zinc-500 mt-1">
              {b.date}
            </Text>

            <View className="flex-row justify-between items-center mt-3">
              <View
                className={`px-2 py-1 rounded-full ${
                  b.status === "Ongoing"
                    ? "bg-emerald-500/10 border border-emerald-500/60"
                    : "bg-zinc-800 border border-zinc-700"
                }`}
              >
                <Text
                  className={`text-[10px] font-medium ${
                    b.status === "Ongoing"
                      ? "text-emerald-400"
                      : "text-zinc-300"
                  }`}
                >
                  {b.status}
                </Text>
              </View>

              <TouchableOpacity className="px-3 py-1 rounded-full bg-zinc-800">
                <Text className="text-[10px] text-zinc-200">
                  View details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
