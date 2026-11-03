// app/login.tsx
import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../services/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/api/auth/login", { email, password });
      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      router.replace("/(tabs)");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Welcome back 🌱</Text>

      {error ? (
        <View style={s.errorBox}>
          <Text style={s.errorText}>{error}</Text>
        </View>
      ) : null}

      <TextInput
        placeholder="Email"
        style={[s.input, error && !password ? s.inputError : null]}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={v => { setEmail(v); setError(""); }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={s.input}
        value={password}
        onChangeText={v => { setPassword(v); setError(""); }}
      />

      <TouchableOpacity
        style={[s.button, loading && s.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={s.buttonText}>Login</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={s.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container:      { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#F4F8F6" },
  title:          { fontSize: 26, marginBottom: 24, fontWeight: "600", textAlign: "center", color: "#1C2B26" },
  errorBox:       { backgroundColor: "#FDECEA", borderWidth: 1, borderColor: "#FFCDD2", borderRadius: 10, padding: 12, marginBottom: 14 },
  errorText:      { color: "#C62828", fontSize: 13, lineHeight: 18 },
  input:          { backgroundColor: "#fff", padding: 14, borderRadius: 12, marginBottom: 12, fontSize: 14, borderWidth: 1, borderColor: "#DCF0EA" },
  inputError:     { borderColor: "#E57373" },
  button:         { backgroundColor: "#4CAF93", padding: 15, borderRadius: 12, alignItems: "center" },
  buttonDisabled: { opacity: 0.6 },
  buttonText:     { color: "#fff", fontWeight: "600", fontSize: 15 },
  link:           { marginTop: 16, textAlign: "center", color: "#4CAF93", fontSize: 13 },
});