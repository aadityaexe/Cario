// app/car-details.tsx
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

type Params = {
  name?: string;
  type?: string;
  price?: string;
  rating?: string;
  location?: string;
};

export default function CarDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<Params>();

  const name = params.name ?? "Premium car";
  const type = params.type ?? "SUV · Petrol · Automatic";
  const location = params.location ?? "Patna, Bihar";
  const rating = params.rating ?? "4.8";
  const pricePerDay = Number(params.price ?? "1999");

  const days = 1; // for now assume 1 day, real days will come from booking screen later
  const estimatedTotal = pricePerDay * days;

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      {/* main scroll area */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header */}
        <View className="px-5 pt-2 pb-3 flex-row items-center justify-between">
          <TouchableOpacity
            className="w-9 h-9 rounded-full bg-zinc-900 items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color="#e5e5e5" />
          </TouchableOpacity>

          <Text className="text-sm text-zinc-300 font-medium">
            Car details
          </Text>

          <TouchableOpacity className="w-9 h-9 rounded-full bg-zinc-900 items-center justify-center">
            <Ionicons name="heart-outline" size={20} color="#e5e5e5" />
          </TouchableOpacity>
        </View>

        {/* Car info card */}
        <View className="px-5 mt-1">
          <View className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
            <Text className="text-[11px] text-zinc-400 mb-1">
              {location}
            </Text>
            <Text className="text-xl text-white font-semibold">
              {name}
            </Text>
            <Text className="text-[11px] text-zinc-500 mt-1">
              {type}
            </Text>

            <Image
              source={require("../assets/images/hero-car.jpeg")}
              className="w-full h-40 mt-4"
              resizeMode="contain"
            />

            <View className="flex-row items-center justify-between w-full mt-4">
              <View className="flex-row items-center">
                <Ionicons name="star" size={16} color="#22c55e" />
                <Text className="text-xs text-zinc-100 ml-1">
                  {rating} · Excellent
                </Text>
              </View>
              <Text className="text-[11px] text-zinc-500">
                120+ trips · Host since 2024
              </Text>
            </View>
          </View>
        </View>

        {/* Specs pills */}
        <View className="px-5 mt-5">
          <Text className="text-sm text-white font-semibold mb-3">
            Key features
          </Text>

          <View className="flex-row flex-wrap gap-2">
            <SpecPill icon="people-outline" label="5 seats" />
            <SpecPill icon="snow-outline" label="AC available" />
            <SpecPill icon="flash-outline" label="Petrol / Diesel" />
            <SpecPill icon="swap-horizontal-outline" label="Manual / Auto" />
            <SpecPill icon="speedometer-outline" label="300 km/day free" />
            <SpecPill icon="shield-checkmark-outline" label="Full insurance" />
            <SpecPill icon="location-outline" label="Doorstep delivery" />
          </View>
        </View>

        {/* Price breakdown card */}
        <View className="px-5 mt-6">
          <Text className="text-sm text-white font-semibold mb-3">
            Pricing summary
          </Text>

          <View className="bg-zinc-900 rounded-3xl p-4 border border-zinc-800">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[12px] text-zinc-400">
                Base fare (per day)
              </Text>
              <Text className="text-[13px] text-zinc-100 font-semibold">
                ₹{pricePerDay}
              </Text>
            </View>

            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[12px] text-zinc-400">Rental days</Text>
              <Text className="text-[13px] text-zinc-100 font-semibold">
                {days} day
              </Text>
            </View>

            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[12px] text-zinc-400">
                Convenience fee
              </Text>
              <Text className="text-[13px] text-zinc-100 font-semibold">
                ₹0
              </Text>
            </View>

            <View className="border-t border-zinc-800 my-3" />

            <View className="flex-row items-center justify-between">
              <Text className="text-[13px] text-zinc-300 font-semibold">
                Estimated total
              </Text>
              <Text className="text-lg text-white font-bold">
                ₹{estimatedTotal}
              </Text>
            </View>

            <Text className="text-[10px] text-zinc-500 mt-2">
              Taxes will be shown on the next step before you pay.
            </Text>
          </View>
        </View>

        {/* Included & rules */}
        <View className="px-5 mt-6">
          <Text className="text-sm text-white font-semibold">
            What&apos;s included
          </Text>
          <View className="mt-3 space-y-2">
            <Bullet text="Basic insurance cover for damages as per policy." />
            <Bullet text="300 km free per day, extra km at standard charges." />
            <Bullet text="24x7 roadside assistance in case of breakdown." />
          </View>

          <Text className="text-sm text-white font-semibold mt-6">
            Important guidelines
          </Text>
          <View className="mt-3 space-y-2">
            <Bullet text="Original driving licence & Aadhaar required at pickup." />
            <Bullet text="Late return charges apply post grace period." />
            <Bullet text="Smoking inside the car is strictly prohibited." />
          </View>
        </View>
      </ScrollView>

     
           {/* Sticky bottom bar */}
      <View className="px-5 pb-5 pt-3 bg-neutral-950 border-t border-zinc-900">
        {/* Rating button full width */}
        <TouchableOpacity
          className="w-full bg-emerald-400/10 border border-emerald-400/50 rounded-2xl px-4 py-3 flex-row items-center mb-3"
          onPress={() =>
            router.push({ pathname: "/rate-car", params: { car: name } })
          }
        >
          <View className="w-8 h-8 rounded-full bg-emerald-400 items-center justify-center">
            <Ionicons name="star-outline" size={16} color="black" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-[13px] text-white font-semibold">
              Rate this car
            </Text>
            <Text className="text-[11px] text-zinc-400">
              Help others decide
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#71717a" />
        </TouchableOpacity>

        {/* Price + booking row */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[11px] text-zinc-400">Starting from</Text>
            <Text className="text-lg text-white font-semibold">
              ₹{pricePerDay}
              <Text className="text-[11px] text-zinc-400"> / day</Text>
            </Text>
            <Text className="text-[11px] text-zinc-500 mt-1">
              100% refund before trip start
            </Text>
          </View>

          <TouchableOpacity
            className="h-11 px-7 rounded-full bg-emerald-400 items-center justify-center"
            onPress={() =>
              router.push({
                pathname: "/booking/payment",
                params: {
                  name,
                  price: String(pricePerDay),
                  location,
                },
              })
            }
          >
            <Text className="text-sm font-semibold text-black">
              Continue to booking
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

type SpecPillProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

function SpecPill({ icon, label }: SpecPillProps) {
  return (
    <View className="flex-row items-center bg-zinc-900 rounded-full px-3 py-2">
      <Ionicons name={icon} size={14} color="#a1a1aa" />
      <Text className="text-[11px] text-zinc-200 ml-1.5">{label}</Text>
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View className="flex-row items-start">
      <View className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 mr-2" />
      <Text className="text-[12px] text-zinc-300 flex-1">{text}</Text>
    </View>
  );
}
