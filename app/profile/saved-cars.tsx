import { View, Text, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const saved = [
  { id: "1", name: "Maruti Suzuki Brezza", price: 1299 },
  { id: "2", name: "Tata Nexon", price: 1499 },
];

export default function SavedCarsScreen() {
  const router = useRouter();

  const openCar = (name: string) => {
    Alert.alert("Car", name);
    // later router.push("/car-details"…) when ready
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-5 pt-3 pb-4 flex-row items-center border-b border-zinc-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="chevron-back" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-base font-bold flex-1">Saved Cars</Text>
      </View>

      <FlatList
        data={saved}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-zinc-900 rounded-3xl p-4 border border-zinc-800 mb-3"
            onPress={() => openCar(item.name)}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-white font-semibold text-sm">{item.name}</Text>
              <Text className="text-emerald-400 font-bold text-sm">₹{item.price}/day</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
