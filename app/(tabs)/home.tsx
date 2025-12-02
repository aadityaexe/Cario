import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const banners = [
  { id: "1", text: "Flat 20% off on first booking!" },
  { id: "2", text: "Outstation rides from ₹899/day" },
  { id: "3", text: "Airport pickup starting ₹499" },
];

const categories = [
  { id: "1", label: "Hatchback", icon: "car-outline" },
  { id: "2", label: "SUV", icon: "jeep-outline" },
  { id: "3", label: "Sedan", icon: "car-sport-outline" },
  { id: "4", label: "Luxury", icon: "diamond-outline" },
  { id: "5", label: "Manual", icon: "swap-horizontal-outline" },
  { id: "6", label: "Automatic", icon: "flash-outline" },
  { id: "7", label: "Petrol", icon: "water-outline" },
  { id: "8", label: "Diesel", icon: "flame-outline" },
];

const popularCars = [
  {
    id: "1",
    name: "Hyundai i20",
    type: "Hatchback · Petrol · Manual",
    pricePerDay: 1499,
    rating: 4.7,
    location: "Patna Junction",
  },
  {
    id: "2",
    name: "Maruti Baleno",
    type: "Premium Hatch · Petrol · Manual",
    pricePerDay: 1699,
    rating: 4.8,
    location: "Boring Road",
  },
  {
    id: "3",
    name: "Toyota Innova Crysta",
    type: "SUV · Diesel · Automatic",
    pricePerDay: 2999,
    rating: 4.9,
    location: "Airport, Patna",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Header */}
        <View className="px-5 pt-2 pb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-zinc-400">Good evening,</Text>
            <Text className="text-xl text-white font-semibold mt-1">Aditya</Text>
            <View className="flex-row items-center mt-2">
              <Ionicons name="location-outline" size={14} />
              <Text className="text-[11px] text-zinc-400 ml-1">Patna, Bihar · India</Text>
            </View>
          </View>
         <TouchableOpacity
  className="w-10 h-10 rounded-full bg-emerald-400/90 items-center justify-center"
  onPress={() => router.push("/profile")}  // ✅ this opens profile tab
>
  <Text className="text-xs font-semibold text-black">AK</Text>
</TouchableOpacity>

        </View>

        {/* Top Banner Slider */}
        <FlatList
          data={banners}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
          renderItem={({ item }) => (
            <View className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 mr-3">
              <Text className="text-emerald-400 text-xs font-medium">{item.text}</Text>
            </View>
          )}
        />

        {/* Search bar */}
        <View className="px-5">
          <View className="flex-row items-center bg-zinc-900 rounded-2xl px-4 py-3">
            <Ionicons name="search" size={18}  color="white"/>
            <TextInput
              className="flex-1 ml-2 text-sm text-white"
              placeholder="Where do you want to drive?"
              placeholderTextColor="#71717a"
            />
            <Ionicons name="filter-outline" size={18}  color="white"/>
          </View>
        </View>

        {/* Car Categories */}
        <View className="px-5 mt-6">
          <Text className="text-sm text-white font-semibold mb-3">Categories</Text>
          <View className="flex-row flex-wrap gap-3">

            {categories.map((c) => (
              <TouchableOpacity
                key={c.id}
                className="bg-zinc-900 w-[22%] rounded-xl p-3 items-center border border-zinc-800"
              >
                <Ionicons name={c.icon} size={20}  color="white"/>
                <Text className="text-zinc-300 text-[10px] mt-1 font-medium text-center">{c.label}</Text>
              </TouchableOpacity>
            ))}

          </View>
        </View>

        {/* Popular Cars Section */}
        <View className="px-5 mt-6 flex-row items-center justify-between">
          <Text className="text-base text-white font-semibold">Popular in your city</Text>
          <Text className="text-xs text-emerald-400">View all</Text>
        </View>

        <FlatList
          data={popularCars}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 14 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="w-64 mr-4 rounded-3xl bg-zinc-900 p-4"
              onPress={() =>
                router.push({
                  pathname: "/car-details",
                  params: {
                    name: item.name,
                    type: item.type,
                    price: String(item.pricePerDay),
                    rating: String(item.rating),
                    location: item.location,
                  },
                })
              }
            >
              <View className="flex-row justify-between items-center mb-2">
                <View>
                  <Text className="text-[13px] text-zinc-400">From</Text>
                  <Text className="text-lg text-white font-semibold">₹{item.pricePerDay}/day</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="star" size={14} />
                  <Text className="text-xs text-zinc-300 ml-1">{item.rating}</Text>
                </View>
              </View>
              <Image
                source={require("../../assets/images/hero-car.jpeg")}
                className="w-full h-32 mt-1 mb-3"
                resizeMode="contain"
              />
              <Text className="text-sm text-white font-semibold">{item.name}</Text>
              <Text className="text-[11px] text-zinc-400 mt-1">{item.type}</Text>
              <Text className="text-[11px] text-zinc-500 mt-2">{item.location}</Text>
            </TouchableOpacity>
          )}
        />

      </ScrollView>
    </SafeAreaView>
  );
}
