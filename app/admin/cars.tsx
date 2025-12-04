// app/admin/cars.tsx
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const cars = [
  {
    id: "1",
    name: "Hyundai i20 Sportz",
    owner: "Aditya",
    reg: "BR 01 AB 1234",
    city: "Patna",
    status: "Active",
    pending: false,
  },
  {
    id: "2",
    name: "Maruti Baleno Zeta",
    owner: "Rahul",
    reg: "BR 02 CD 5678",
    city: "Patna",
    status: "Pending approval",
    pending: true,
  },
];

export default function AdminCarsScreen() {
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
            Cars
          </Text>
          <View className="w-9 h-9" />
        </View>

        {cars.map((c) => (
          <View
            key={c.id}
            className="mb-3 bg-zinc-900 rounded-2xl p-4 border border-zinc-800"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-[13px] text-white font-semibold">
                  {c.name}
                </Text>
                <Text className="text-[11px] text-zinc-500 mt-1">
                  {c.reg} · {c.city}
                </Text>
                <Text className="text-[11px] text-zinc-500 mt-1">
                  Owner: {c.owner}
                </Text>
              </View>

              <View
                className={`px-2 py-1 rounded-full ${
                  c.pending
                    ? "bg-amber-500/10 border border-amber-500/60"
                    : "bg-emerald-500/10 border border-emerald-500/60"
                }`}
              >
                <Text
                  className={`text-[10px] font-medium ${
                    c.pending ? "text-amber-400" : "text-emerald-400"
                  }`}
                >
                  {c.status}
                </Text>
              </View>
            </View>

            <View className="flex-row mt-3">
              {c.pending && (
                <>
                  <TouchableOpacity className="px-3 py-1 rounded-full bg-emerald-500/20 mr-2">
                    <Text className="text-[10px] text-emerald-400">
                      Approve
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="px-3 py-1 rounded-full bg-red-500/10 mr-2">
                    <Text className="text-[10px] text-red-400">Reject</Text>
                  </TouchableOpacity>
                </>
              )}
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
