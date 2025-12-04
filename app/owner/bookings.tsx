// app/owner/bookings.tsx
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type BookingStatus = "Pending" | "Accepted" | "Ongoing" | "Completed" | "Rejected";

type OwnerBooking = {
  id: string;
  renterName: string;
  carName: string;
  route: string;
  pickupTime: string;
  dropTime: string;
  amount: number;
  status: BookingStatus;
};

const initialBookings: OwnerBooking[] = [
  {
    id: "BKG1001",
    renterName: "Rahul Singh",
    carName: "Hyundai i20 Sportz",
    route: "Patna → Gaya",
    pickupTime: "02 Dec · 08:00 AM",
    dropTime: "03 Dec · 10:00 PM",
    amount: 2499,
    status: "Pending",
  },
  {
    id: "BKG1002",
    renterName: "Priya Sharma",
    carName: "Toyota Innova Crysta",
    route: "Patna local",
    pickupTime: "01 Dec · 10:00 AM",
    dropTime: "01 Dec · 08:00 PM",
    amount: 3199,
    status: "Accepted",
  },
  {
    id: "BKG1003",
    renterName: "Aman Verma",
    carName: "Maruti Baleno",
    route: "Patna → Ranchi",
    pickupTime: "28 Nov · 06:00 AM",
    dropTime: "29 Nov · 09:00 PM",
    amount: 2799,
    status: "Completed",
  },
];

export default function OwnerBookingsScreen() {
  const router = useRouter();
  const [bookings, setBookings] = useState<OwnerBooking[]>(initialBookings);

  const updateStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    console.log("Updated booking", id, "=>", status);
    // later: call backend PATCH /bookings/:id here
  };

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
            Booking requests
          </Text>
          <View className="w-9 h-9" />
        </View>

        {bookings.map((b) => (
          <View
            key={b.id}
            className="mb-3 bg-zinc-900 rounded-2xl p-4 border border-zinc-800"
          >
            {/* Top row: id + amount */}
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-[11px] text-zinc-500">#{b.id}</Text>
              <Text className="text-[13px] text-emerald-400 font-semibold">
                ₹{b.amount}
              </Text>
            </View>

            {/* Renter + car */}
            <Text className="text-[13px] text-white font-semibold">
              {b.renterName}
            </Text>
            <Text className="text-[11px] text-zinc-400 mt-1">
              {b.carName} · {b.route}
            </Text>

            {/* Time */}
            <View className="mt-2">
              <Text className="text-[10px] text-zinc-500">Pick-up</Text>
              <Text className="text-[11px] text-zinc-200 mt-0.5">
                {b.pickupTime}
              </Text>
              <Text className="text-[10px] text-zinc-500 mt-1">Drop-off</Text>
              <Text className="text-[11px] text-zinc-200 mt-0.5">
                {b.dropTime}
              </Text>
            </View>

            {/* Status + actions */}
            <View className="flex-row items-center justify-between mt-3">
              <StatusPill status={b.status} />

              <View className="flex-row">
                {b.status === "Pending" && (
                  <>
                    <TouchableOpacity
                      className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/60 mr-2"
                      onPress={() => updateStatus(b.id, "Accepted")}
                    >
                      <Text className="text-[10px] text-emerald-400 font-medium">
                        Accept
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/60 mr-2"
                      onPress={() => updateStatus(b.id, "Rejected")}
                    >
                      <Text className="text-[10px] text-red-400 font-medium">
                        Reject
                      </Text>
                    </TouchableOpacity>
                  </>
                )}

                {b.status === "Accepted" && (
                  <TouchableOpacity
                    className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/60"
                    onPress={() => updateStatus(b.id, "Ongoing")}
                  >
                    <Text className="text-[10px] text-sky-400 font-medium">
                      Mark as ongoing
                    </Text>
                  </TouchableOpacity>
                )}

                {b.status === "Ongoing" && (
                  <TouchableOpacity
                    className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/60"
                    onPress={() => updateStatus(b.id, "Completed")}
                  >
                    <Text className="text-[10px] text-emerald-400 font-medium">
                      Mark completed
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatusPill({ status }: { status: BookingStatus }) {
  let bg = "bg-zinc-800 border border-zinc-700";
  let text = "text-zinc-300";

  if (status === "Pending") {
    bg = "bg-amber-500/10 border border-amber-500/60";
    text = "text-amber-400";
  } else if (status === "Accepted") {
    bg = "bg-emerald-500/10 border border-emerald-500/60";
    text = "text-emerald-400";
  } else if (status === "Ongoing") {
    bg = "bg-sky-500/10 border border-sky-500/60";
    text = "text-sky-400";
  } else if (status === "Completed") {
    bg = "bg-emerald-500/10 border border-emerald-500/60";
    text = "text-emerald-400";
  } else if (status === "Rejected") {
    bg = "bg-red-500/10 border border-red-500/60";
    text = "text-red-400";
  }

  return (
    <View className={`px-2 py-1 rounded-full ${bg}`}>
      <Text className={`text-[10px] font-medium ${text}`}>{status}</Text>
    </View>
  );
}
