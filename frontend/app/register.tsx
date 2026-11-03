// app/register.tsx
import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import API from "../services/api";

export default function Register() {
  const router = useRouter();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]     = useState<string[]>([]);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const handleRegister = async () => {
    setErrors([]);

    // Basic client-side checks before hitting the server
    const clientErrors: string[] = [];
    if (!name.trim())              clientErrors.push("Name is required.");
    if (!email.trim())             clientErrors.push("Email is required.");
    if (!password.trim())          clientErrors.push("Password is required.");
    else if (password.length < 8)  clientErrors.push("Password must be at least 8 characters.");
    if (clientErrors.length) { setErrors(clientErrors); return; }

    setLoading(true);
    try {
      await API.post("/api/auth/register", { name, email, password });
      setSuccess(true);
      setTimeout(() => router.replace("/login"), 1500);
    } catch (err: any) {
      const data = err.response?.data;
      // Backend returns array of strings or { message: string }
      if (Array.isArray(data)) {
        setErrors(data);
      } else if (data?.message) {
        setErrors([data.message]);
      } else {
        setErrors(["Something went wrong. Please try again."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Create Account 🌱</Text>

      {success ? (
        <View style={s.successBox}>
          <Text style={s.successText}>Account created! Taking you to login…</Text>
        </View>
      ) : null}

      {errors.length > 0 ? (
        <View style={s.errorBox}>
          {errors.map((e, i) => (
            <Text key={i} style={s.errorText}>• {e}</Text>
          ))}
        </View>
      ) : null}

      <TextInput
        placeholder="Name"
        style={s.input}
        value={name}
        onChangeText={v => { setName(v); setErrors([]); }}
      />
      <TextInput
        placeholder="Email"
        style={s.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={v => { setEmail(v); setErrors([]); }}
      />
      <TextInput
        placeholder="Password (min 8 characters)"
        secureTextEntry
        style={s.input}
        value={password}
        onChangeText={v => { setPassword(v); setErrors([]); }}
      />

      <TouchableOpacity
        style={[s.button, loading && s.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={s.buttonText}>Create Account</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={s.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container:      { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#F4F8F6" },
  title:          { fontSize: 26, marginBottom: 24, fontWeight: "600", textAlign: "center", color: "#1C2B26" },
  successBox:     { backgroundColor: "#E8F5F1", borderWidth: 1, borderColor: "#B8E0D6", borderRadius: 10, padding: 12, marginBottom: 14 },
  successText:    { color: "#3a9478", fontSize: 13, fontWeight: "500" },
  errorBox:       { backgroundColor: "#FDECEA", borderWidth: 1, borderColor: "#FFCDD2", borderRadius: 10, padding: 12, marginBottom: 14 },
  errorText:      { color: "#C62828", fontSize: 13, lineHeight: 20 },
  input:          { backgroundColor: "#fff", padding: 14, borderRadius: 12, marginBottom: 12, fontSize: 14, borderWidth: 1, borderColor: "#DCF0EA" },
  button:         { backgroundColor: "#4CAF93", padding: 15, borderRadius: 12, alignItems: "center" },
  buttonDisabled: { opacity: 0.6 },
  buttonText:     { color: "#fff", fontWeight: "600", fontSize: 15 },
  link:           { marginTop: 16, textAlign: "center", color: "#4CAF93", fontSize: 13 },
});