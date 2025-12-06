import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function AuthScreen() {
  const router = useRouter();

  const [mode, setMode] = useState<"phone" | "email">("phone");

  // Phone auth
  const [phone, setPhone] = useState("");

  // Email auth
  const [emailMode, setEmailMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // === PHONE FLOW (OTP) ===
  const sendOtp = () => {
    if (phone.length !== 10) {
      return;
    }
    // later: call backend to send OTP
    router.push({ pathname: "/auth/otp", params: { phone } });
  };

  // === EMAIL LOGIN FLOW ===
  const handleEmailLogin = () => {
    if (!email.includes("@") || password.length < 4) {
      return Alert.alert("Invalid details", "Enter valid email & password.");
    }

    // TODO: connect to backend: POST /api/auth/login-email
    console.log("Login with email:", { email, password });
    router.replace("/(tabs)/home");
  };

  // === EMAIL SIGNUP FLOW ===
  const handleEmailSignup = () => {
    if (!name.trim()) {
      return Alert.alert("Name required", "Please enter your name.");
    }
    if (!email.includes("@")) {
      return Alert.alert("Invalid email", "Please enter a valid email.");
    }
    if (password.length < 4) {
      return Alert.alert(
        "Weak password",
        "Password should be at least 4 characters."
      );
    }
    if (password !== confirmPassword) {
      return Alert.alert("Password mismatch", "Passwords do not match.");
    }

    // TODO: connect backend: POST /api/auth/signup-email
    console.log("Signup with email:", { name, email, password });
    router.replace("/(tabs)/home");
  };

  const isLoginDisabled =
    !email.includes("@") || password.length < 4;

  const isSignupDisabled =
    !name.trim() ||
    !email.includes("@") ||
    password.length < 4 ||
    password !== confirmPassword;

  return (
    <View className="flex-1 bg-black px-6 justify-center">
      {/* Title */}
      <Text className="text-white text-3xl font-semibold mb-2">
        Login / Sign up
      </Text>
      <Text className="text-zinc-400 text-sm mb-8">
        Use your phone or email to get started.
      </Text>

      {/* Main mode toggle */}
      <View className="flex-row bg-zinc-900 rounded-full p-1 mb-8">
        <TouchableOpacity
          className={`flex-1 py-2 rounded-full ${
            mode === "phone" ? "bg-emerald-400" : "bg-transparent"
          }`}
          onPress={() => setMode("phone")}
        >
          <Text
            className={`text-center font-semibold ${
              mode === "phone" ? "text-black" : "text-white"
            }`}
          >
            Phone
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-2 rounded-full ${
            mode === "email" ? "bg-emerald-400" : "bg-transparent"
          }`}
          onPress={() => setMode("email")}
        >
          <Text
            className={`text-center font-semibold ${
              mode === "email" ? "text-black" : "text-white"
            }`}
          >
            Email
          </Text>
        </TouchableOpacity>
      </View>

      {/* ========== PHONE LOGIN UI ========== */}
      {mode === "phone" && (
        <View>
          <Text className="text-zinc-400 text-sm mb-3">
            Enter your mobile number to receive OTP.
          </Text>

          <View className="flex-row items-center border border-zinc-700 rounded-2xl px-4 py-3 mb-6">
            <Text className="text-white mr-2 text-base">+91</Text>
            <TextInput
              className="flex-1 text-white text-lg"
              placeholder="Enter phone number"
              keyboardType="number-pad"
              maxLength={10}
              placeholderTextColor="#52525b"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TouchableOpacity
            className="bg-emerald-400 rounded-full py-4 items-center"
            disabled={phone.length !== 10}
            onPress={sendOtp}
            style={{ opacity: phone.length === 10 ? 1 : 0.5 }}
          >
            <Text className="text-black text-base font-semibold">
              Send OTP
            </Text>
          </TouchableOpacity>

          <Text className="text-[11px] text-zinc-500 mt-3">
            We&apos;ll create your account automatically if you&apos;re new.
          </Text>
        </View>
      )}

      {/* ========== EMAIL LOGIN / SIGNUP UI ========== */}
      {mode === "email" && (
        <View>
          {/* Inner toggle: Login / Sign up */}
          <View className="flex-row bg-zinc-900 rounded-full p-1 mb-5">
            <TouchableOpacity
              className={`flex-1 py-2 rounded-full ${
                emailMode === "login" ? "bg-emerald-400" : "bg-transparent"
              }`}
              onPress={() => setEmailMode("login")}
            >
              <Text
                className={`text-center text-xs font-semibold ${
                  emailMode === "login" ? "text-black" : "text-white"
                }`}
              >
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-2 rounded-full ${
                emailMode === "signup" ? "bg-emerald-400" : "bg-transparent"
              }`}
              onPress={() => setEmailMode("signup")}
            >
              <Text
                className={`text-center text-xs font-semibold ${
                  emailMode === "signup" ? "text-black" : "text-white"
                }`}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>

          {/* LOGIN FORM */}
          {emailMode === "login" && (
            <>
              <Text className="text-zinc-400 text-sm mb-3">
                Login with your email:
              </Text>

              <TextInput
                className="w-full border border-zinc-700 text-white rounded-2xl px-4 py-3 mb-4"
                placeholder="Email"
                placeholderTextColor="#52525b"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                className="w-full border border-zinc-700 text-white rounded-2xl px-4 py-3 mb-6"
                placeholder="Password"
                placeholderTextColor="#52525b"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                className="bg-emerald-400 rounded-full py-4 items-center"
                disabled={isLoginDisabled}
                onPress={handleEmailLogin}
                style={{ opacity: isLoginDisabled ? 0.5 : 1 }}
              >
                <Text className="text-black text-base font-semibold">
                  Login with Email
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* SIGNUP FORM */}
          {emailMode === "signup" && (
            <>
              <Text className="text-zinc-400 text-sm mb-3">
                Create a new account:
              </Text>

              <TextInput
                className="w-full border border-zinc-700 text-white rounded-2xl px-4 py-3 mb-4"
                placeholder="Full name"
                placeholderTextColor="#52525b"
                value={name}
                onChangeText={setName}
              />

              <TextInput
                className="w-full border border-zinc-700 text-white rounded-2xl px-4 py-3 mb-4"
                placeholder="Email"
                placeholderTextColor="#52525b"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                className="w-full border border-zinc-700 text-white rounded-2xl px-4 py-3 mb-4"
                placeholder="Password"
                placeholderTextColor="#52525b"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TextInput
                className="w-full border border-zinc-700 text-white rounded-2xl px-4 py-3 mb-6"
                placeholder="Confirm password"
                placeholderTextColor="#52525b"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity
                className="bg-emerald-400 rounded-full py-4 items-center"
                disabled={isSignupDisabled}
                onPress={handleEmailSignup}
                style={{ opacity: isSignupDisabled ? 0.5 : 1 }}
              >
                <Text className="text-black text-base font-semibold">
                  Sign up with Email
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
}
