import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const transactions = [
  {
    id: "1",
    type: "Booking payment",
    amount: -2499,
    date: "28 Nov, 10:32 AM",
    car: "Hyundai i20 · Patna local",
    status: "Completed",
  },
  {
    id: "2",
    type: "Refund credited",
    amount: 800,
    date: "25 Nov, 04:18 PM",
    car: "Patna → Gaya",
    status: "Refund",
  },
  {
    id: "3",
    type: "Cashback",
    amount: 150,
    date: "20 Nov, 08:12 PM",
    car: "Weekend offer",
    status: "Cashback",
  },
  {
    id: "4",
    type: "Booking payment",
    amount: -3199,
    date: "10 Nov, 09:45 AM",
    car: "Innova Crysta · Airport",
    status: "Completed",
  },
];

export default function WalletScreen() {
  const router = useRouter();

  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");
  const [walletBalance, setWalletBalance] = useState(1350); // ✅ real state now
  const [amount, setAmount] = useState(""); // ✅ user enters this

  const numAmount = Number(amount);

  const handleAddMoney = () => {
    if (!numAmount || numAmount <= 0) {
      return Alert.alert("Error ❌", "Enter a valid amount to add!");
    }
    setWalletBalance((prev) => prev + numAmount);
    Alert.alert("Success ✅", `₹${numAmount} added to wallet! 💰`);
    setAmount("");
  };

  const handleWithdraw = () => {
    if (!numAmount || numAmount <= 0) {
      return Alert.alert("Error ❌", "Enter a valid amount to withdraw!");
    }
    if (walletBalance < numAmount) {
      return Alert.alert("Insufficient ❌", "Not enough wallet balance!");
    }
    setWalletBalance((prev) => prev - numAmount);
    Alert.alert("Withdrawn ✅", `₹${numAmount} withdrawn! 💸`);
    setAmount("");
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "credit") return t.amount > 0;
    if (filter === "debit") return t.amount < 0;
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">

      {/* Header */}
      <View className="px-5 py-4 border-b border-zinc-900">
        <Text className="text-xl text-white font-bold">Wallet</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        
        {/* Balance Card */}
        <View className="bg-emerald-400 rounded-3xl p-5 mb-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-black/70 text-sm font-medium">Available Balance</Text>
              <Text className="text-4xl font-extrabold text-black mt-2">₹{walletBalance}</Text>
            </View>
            <Ionicons name="wallet-outline" size={36} color="black" />
          </View>
        </View>

        {/* User Amount Input */}
        <Text className="text-white text-sm font-semibold mb-2">Enter Amount</Text>
        <View className="bg-zinc-900 border border-zinc-700 rounded-2xl p-3 mb-4">
          <TextInput
            className="text-white text-lg text-center"
            placeholder="₹0"
            placeholderTextColor="#555"
            keyboardType="number-pad"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* Buttons */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-1 bg-emerald-400 rounded-full py-3 items-center"
            onPress={handleAddMoney}
          >
            <Text className="text-black font-bold">Add Money</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-red-500/40 border border-red-500/60 rounded-full py-3 items-center"
            onPress={handleWithdraw}
          >
            <Text className="text-white font-bold">Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Transactions Section */}
        <Text className="text-white text-[12px] font-semibold mt-7 mb-3">Recent Transactions</Text>

        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} // inside scrollView already
          renderItem={({ item }) => {
            const isCredit = item.amount > 0;
            return (
              <View className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 mb-3">
                
                <View className="flex-row justify-between items-center">
                  <Text className="text-white font-bold">{item.type}</Text>
                  <Text className={`${isCredit ? "text-emerald-400" : "text-red-400"} font-bold`}>
                    {isCredit ? "+" : "-"}₹{Math.abs(item.amount)}
                  </Text>
                </View>

                <Text className="text-zinc-400 text-[10px] mt-1">{item.car}</Text>
                <Text className="text-zinc-500 text-[10px] mt-1">{item.date}</Text>

                {/* Status badge */}
                <View className="mt-2 self-start px-2 py-1 rounded-full border border-zinc-700 bg-zinc-800">
                  <Text className="text-zinc-300 text-[10px]">{item.status}</Text>
                </View>

              </View>
            );
          }}
        />

      </ScrollView>
    </SafeAreaView>
  );
}
