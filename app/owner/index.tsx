// app/owner/index.tsx
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ownerCars = [
  {
    id: "1",
    name: "Hyundai i20 Sportz",
    number: "BR 01 AB 1234",
    city: "Patna",
    earningsThisMonth: 12450,
    status: "Active",
  },
  {
    id: "2",
    name: "Toyota Innova Crysta",
    number: "BR 02 CD 5678",
    city: "Patna",
    earningsThisMonth: 22100,
    status: "Active",
  },
];

export default function OwnerDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-xs text-emerald-400 font-medium">
              Owner dashboard
            </Text>
            <Text className="text-xl text-white font-semibold mt-1">
              Hi, Aditya
            </Text>
            <Text className="text-[11px] text-zinc-500 mt-1">
              Manage your cars and bookings here.
            </Text>
          </View>

          <TouchableOpacity
            className="w-9 h-9 rounded-full bg-zinc-900 items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={18} color="#e5e5e5" />
          </TouchableOpacity>
        </View>

        {/* Summary cards */}
        <View className="flex-row mb-4">
          <View className="flex-1 bg-zinc-900 rounded-2xl p-4 mr-2 border border-zinc-800">
            <Text className="text-[11px] text-zinc-400">Today&apos;s earnings</Text>
            <Text className="text-xl text-white font-semibold mt-1">
              ₹2,450
            </Text>
            <Text className="text-[10px] text-emerald-400 mt-1">
              +₹650 vs yesterday
            </Text>
          </View>

          <View className="flex-1 bg-zinc-900 rounded-2xl p-4 ml-2 border border-zinc-800">
            <Text className="text-[11px] text-zinc-400">This month</Text>
            <Text className="text-xl text-white font-semibold mt-1">
              ₹34,800
            </Text>
            <Text className="text-[10px] text-zinc-500 mt-1">
              From 18 completed trips
            </Text>
          </View>
        </View>

        {/* Active bookings card */}
        <View className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 mb-5">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm text-white font-semibold">
              Active bookings
            </Text>
            <Text className="text-[11px] text-emerald-400">View all</Text>
          </View>
          <View className="mt-1 flex-row items-center justify-between">
            <View>
              <Text className="text-[12px] text-zinc-300">
                Patna → Gaya · Innova Crysta
              </Text>
              <Text className="text-[10px] text-zinc-500 mt-1">
                02 Dec · 08:00 AM – 03 Dec · 10:00 PM
              </Text>
            </View>
            <View className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/50">
              <Text className="text-[10px] text-emerald-400 font-medium">
                Ongoing
              </Text>
            </View>
          </View>
        </View>

        {/* Your cars */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-sm text-white font-semibold">Your cars</Text>
        <TouchableOpacity onPress={() => router.push("/owner/bookings")}>
  <Text className="text-[11px] text-emerald-400">View all</Text>
</TouchableOpacity>

        </View>

        {ownerCars.map((car) => (
          <View
            key={car.id}
            className="mb-3 rounded-2xl bg-zinc-900 p-4 border border-zinc-800"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-[13px] text-white font-semibold">
                  {car.name}
                </Text>
                <Text className="text-[11px] text-zinc-500 mt-1">
                  {car.number} · {car.city}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-[11px] text-zinc-400">
                  Earnings this month
                </Text>
                <Text className="text-[13px] text-emerald-400 font-semibold mt-1">
                  ₹{car.earningsThisMonth}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between mt-3">
              <View className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5" />
                <Text className="text-[10px] text-zinc-400">
                  {car.status}
                </Text>
              </View>

              <View className="flex-row">
                <TouchableOpacity className="px-3 py-1 rounded-full bg-zinc-800 mr-2">
                  <Text className="text-[10px] text-zinc-200">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-3 py-1 rounded-full bg-zinc-800">
                  <Text className="text-[10px] text-zinc-200">
                    View bookings
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Add new car CTA */}
        <TouchableOpacity
          className="mt-4 w-full bg-emerald-400 rounded-full py-4 items-center justify-center"
          onPress={() => router.push("/owner/add-car")}
        >
          <Text className="text-black font-semibold text-sm">
            + Add a new car
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
