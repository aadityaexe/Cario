// app/(tabs)/home.tsx
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
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

const allCars = [
  {
    id: "1",
    name: "Hyundai i20",
    type: "Hatchback · Petrol · Manual",
    pricePerDay: 1499,
    rating: 4.7,
    location: "Patna Junction",
    category: "Hatchback",
  },
  {
    id: "2",
    name: "Maruti Baleno",
    type: "Hatchback · Petrol · Manual",
    pricePerDay: 1699,
    rating: 4.8,
    location: "Boring Road, Patna",
    category: "Hatchback",
  },
  {
    id: "3",
    name: "Toyota Innova Crysta",
    type: "SUV · Diesel · Automatic",
    pricePerDay: 2999,
    rating: 4.9,
    location: "Jay Prakash Narayan Airport, Patna",
    category: "SUV",
  },
  {
    id: "4",
    name: "Tata Nexon",
    type: "SUV · Diesel · Manual",
    pricePerDay: 1899,
    rating: 4.6,
    location: "Fraser Road, Patna",
    category: "SUV",
  },
  {
    id: "5",
    name: "Honda City",
    type: "Sedan · Petrol · Automatic",
    pricePerDay: 2199,
    rating: 4.5,
    location: "Patliputra Colony, Patna",
    category: "Sedan",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cars, setCars] = useState(allCars);

  const filterCars = (cat: string) => {
    setSelectedCategory(cat);

    if (cat === "All") {
      setCars(allCars);
    } else {
      setCars(allCars.filter((car) => car.category === cat));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Header */}
        <View className="px-5 pt-2 pb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-zinc-400">Good evening,</Text>
            <Text className="text-xl text-white font-semibold mt-1">Aditya</Text>
          </View>

          {/* Go to Profile */}
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-emerald-400/90 items-center justify-center"
            onPress={() => router.push("/profile")}
          >
            <Text className="text-xs font-semibold text-black">AK</Text>
          </TouchableOpacity>
        </View>

        {/* Banner slider */}
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

        {/* Search */}
        <View className="px-5">
          <View className="flex-row items-center bg-zinc-900 rounded-2xl px-4 py-3">
            <Ionicons name="search" size={18} color="white" />
            <TextInput
              className="flex-1 ml-2 text-sm text-white"
              placeholder="Search cars..."
              placeholderTextColor="#71717a"
              onSubmitEditing={(e) =>
                Alert.alert("Search", "You searched for: " + e.nativeEvent.text)
              }
            />
            <Ionicons name="filter-outline" size={18} color="white" />
          </View>
        </View>

        {/* Categories - filtering buttons */}
        <View className="px-5 mt-6">
          <Text className="text-sm text-white font-semibold mb-3">Categories</Text>

          <View className="flex-row flex-wrap gap-3">
            {/* All Reset */}
            <TouchableOpacity
              className={`bg-zinc-800 w-[22%] rounded-xl p-3 items-center border ${
                selectedCategory === "All"
                  ? "border-emerald-400"
                  : "border-zinc-700"
              }`}
              onPress={() => filterCars("All")}
            >
              <Ionicons name="apps-outline" size={20} color="white" />
              <Text className="text-zinc-300 text-[10px] mt-1 font-medium">
                All
              </Text>
            </TouchableOpacity>

            {categories.map((c) => (
              <TouchableOpacity
                key={c.id}
                className={`bg-zinc-900 w-[22%] rounded-xl p-3 items-center border ${
                  selectedCategory === c.label
                    ? "border-emerald-400"
                    : "border-zinc-800"
                }`}
                onPress={() => filterCars(c.label)}
              >
                <Ionicons name={c.icon as any} size={20} color="white" />
                <Text className="text-zinc-300 text-[10px] mt-1 font-medium text-center">
                  {c.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Cars List */}
        <View className="px-5 mt-7">
          <Text className="text-base text-white font-semibold mb-4">
            Cars you can rent
          </Text>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="bg-zinc-900 rounded-3xl p-4 border border-zinc-800 mb-3"
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
                <View className="flex-row items-center">
                  <Image
                    source={require("../../assets/images/hero-car.jpeg")}
                    className="w-20 h-20"
                    resizeMode="contain"
                  />
                  <View className="ml-4 flex-1">
                    <Text className="text-white font-bold text-sm">{item.name}</Text>
                    <Text className="text-[10px] text-zinc-400 mt-1">{item.location}</Text>
                    <Text className="text-emerald-400 font-bold mt-2">
                      ₹{item.pricePerDay}/day
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
