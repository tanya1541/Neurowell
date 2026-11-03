
// app/(tabs)/index.tsx
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, ActivityIndicator, RefreshControl,
} from "react-native";
import API from "../../services/api";

interface UserData    { name: string; storiStage: number | null }
interface ProgressData { currentStage: number | null; totalToolUses: number; memberSince: string; unlockedCount: number }

const STAGE_NAMES: Record<number, string> = {
  1:"Moratorium", 2:"Awareness", 3:"Preparation", 4:"Rebuilding", 5:"Growth",
}
const STAGE_DESCRIPTIONS: Record<number, string> = {
  1:"Finding your footing",       2:"Building understanding",
  3:"Developing your toolkit",    4:"Putting it into practice",
  5:"Sustaining your progress",
}

const C = {
  bg:"#F4F8F6", green:"#4CAF93", greenLight:"#E8F5F1", greenMid:"#B8E0D6",
  greenDark:"#3a9478", text:"#1C2B26", textMuted:"#7A9490",
  white:"#FFFFFF", border:"#DCF0EA",
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return ["Morning", "☀️"]
  if (h < 17) return ["Afternoon", "🌤️"]
  return ["Evening", "🌙"]
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser]         = useState<UserData | null>(null)
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [loading, setLoading]   = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadData = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem("user")
      if (stored) setUser(JSON.parse(stored))

      const [toolsRes, progressRes] = await Promise.all([
        API.get("/api/tools/"),
        API.get("/api/progress/summary"),
      ])

      const unlocked = (toolsRes.data.tools || []).filter((t: any) => t.unlocked).length
      setProgress({ ...progressRes.data, unlockedCount: unlocked })

      if (stored) {
        const parsed  = JSON.parse(stored)
        const updated = { ...parsed, storiStage: progressRes.data.currentStage }
        setUser(updated)
        await AsyncStorage.setItem("user", JSON.stringify(updated))
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        await AsyncStorage.multiRemove(["token", "user"])
        router.replace("/login")
      }
    } finally { setLoading(false); setRefreshing(false) }
  }, [])

  useEffect(() => { loadData() }, [])

  const handleReassess = async () => {
  try {
    const sessionRes = await API.get("/api/chat/")
    await API.post("/api/chat/start-assessment", { sessionId: sessionRes.data.sessionId })
    router.push("/(tabs)/chat")
  } catch (e) { console.log(e) }
}

  const handleLogout = async () => {
    try { await API.post("/api/auth/logout") } catch {}
    await AsyncStorage.multiRemove(["token", "user"])
    router.replace("/login")
  }


  const stage = progress?.currentStage || user?.storiStage
  const [greeting, greetingEmoji] = getGreeting()

  if (loading) return (
    <View style={s.loadingWrap}>
      <ActivityIndicator size="large" color={C.green} />
    </View>
  )

  return (
    <SafeAreaView style={s.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadData() }} tintColor={C.green} />}
      >
        {/* Header */}
        <View style={s.header}>
          <View style={s.headerTop}>
            <View>
              <Text style={s.greeting}>
                Good <Text style={s.greetingAccent}>{greeting}</Text> {greetingEmoji}
              </Text>
              <Text style={s.userName}>{user?.name || "there"}</Text>
            </View>
            <TouchableOpacity style={s.avatar}>
              <Text style={s.avatarText}>🌱</Text>
            </TouchableOpacity>
          </View>

          {stage ? (
            <View style={s.stagePill}>
              <View style={s.stageDot} />
              <Text style={s.stagePillText}>Stage {stage} — {STAGE_NAMES[stage]}</Text>
            </View>
          ) : (
            <TouchableOpacity style={s.stagePillNew} onPress={() => router.push("/(tabs)/chat")}>
              <Text style={s.stagePillNewText}>✨ Tap to start your assessment →</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stage card */}
        {stage && (
          <View style={s.stageCard}>
            <View style={s.stageCardLeft}>
              <Text style={s.stageCardLabel}>YOUR STAGE</Text>
              <Text style={s.stageCardName}>{STAGE_NAMES[stage]}</Text>
              <Text style={s.stageCardDesc}>{STAGE_DESCRIPTIONS[stage]}</Text>
            </View>
            <View style={s.stageCircle}>
              <Text style={s.stageNum}>{stage}</Text>
              <Text style={s.stageOf}>of 5</Text>
            </View>
          </View>
        )}

        {/* Stats */}
        {progress && (
          <View style={s.statsRow}>
            <View style={s.statCard}>
              <Text style={s.statNum}>{progress.totalToolUses}</Text>
              <Text style={s.statLabel}>tools used</Text>
            </View>
            <View style={s.statCard}>
              <Text style={s.statNum}>{progress.unlockedCount}</Text>
              <Text style={s.statLabel}>unlocked</Text>
            </View>
            <View style={s.statCard}>
              <Text style={s.statNum}>
                {progress.memberSince
                  ? Math.floor((Date.now() - new Date(progress.memberSince).getTime()) / 86400000)
                  : 0}
              </Text>
              <Text style={s.statLabel}>days in</Text>
            </View>
          </View>
        )}

        {/* Chat CTA */}
        <View style={s.section}>
          <TouchableOpacity style={s.chatCTA} activeOpacity={0.85} onPress={() => router.push("/(tabs)/chat")}>
            <View style={{ flex: 1 }}>
              <Text style={s.chatCTATitle}>Open Chat</Text>
              <Text style={s.chatCTADesc}>{stage ? "Continue your session" : "Start with your assessment"}</Text>
            </View>
            <Text style={{ fontSize: 28, marginLeft: 12 }}>💬</Text>
          </TouchableOpacity>
        </View>

        {/* No stage */}
        {!stage && (
          <View style={s.section}>
            <View style={s.noStageCard}>
              <Text style={s.noStageEmoji}>🌱</Text>
              <Text style={s.noStageTitle}>Let's get started</Text>
              <Text style={s.noStageDesc}>
                Complete your assessment to unlock your tools and get a personalised recovery stage.
              </Text>
              <TouchableOpacity style={s.noStageBtn} onPress={() => router.push("/(tabs)/chat")}>
                <Text style={s.noStageBtnText}>Start Assessment →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {stage && (
  <View style={{ alignItems: "center", marginTop: 8 }}>
    <TouchableOpacity onPress={handleReassess}>
      <Text style={{ fontSize: 12, color: C.textMuted, textDecorationLine: "underline" }}>
        Retake assessment
      </Text>
    </TouchableOpacity>
  </View>
)}


        {/* Sign out */}
        <TouchableOpacity style={s.signOutBtn} onPress={handleLogout} activeOpacity={0.7}>
          <Text style={s.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: C.bg },
  scroll:       { flex: 1 },
  scrollContent:{ paddingBottom: 100 },
  loadingWrap:  { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: C.bg },
  header:       { paddingTop: 8, paddingHorizontal: 24, paddingBottom: 16 },
  headerTop:    { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  greeting:     { fontSize: 24, fontWeight: "600", color: C.text, lineHeight: 30 },
  greetingAccent:{ color: C.green },
  userName:     { fontSize: 14, color: C.textMuted, marginTop: 2, fontWeight: "500" },
  avatar:       { width: 42, height: 42, backgroundColor: C.green, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  avatarText:   { fontSize: 18 },
  stagePill:    { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", marginTop: 10, backgroundColor: C.greenLight, borderWidth: 1, borderColor: C.greenMid, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, gap: 6 },
  stageDot:     { width: 7, height: 7, backgroundColor: C.green, borderRadius: 4 },
  stagePillText:{ fontSize: 12, fontWeight: "500", color: C.greenDark },
  stagePillNew: { alignSelf: "flex-start", marginTop: 10, backgroundColor: "#FFF8E1", borderWidth: 1, borderColor: "#FFE082", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  stagePillNewText:{ fontSize: 12, fontWeight: "500", color: "#F59E0B" },
  stageCard:    { marginHorizontal: 24, marginBottom: 4, backgroundColor: C.green, borderRadius: 20, padding: 20, flexDirection: "row", alignItems: "center" },
  stageCardLeft:{ flex: 1 },
  stageCardLabel:{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: "600", letterSpacing: 0.5, marginBottom: 4 },
  stageCardName:{ fontSize: 22, fontWeight: "700", color: C.white, marginBottom: 4 },
  stageCardDesc:{ fontSize: 13, color: "rgba(255,255,255,0.8)" },
  stageCircle:  { width: 60, height: 60, borderRadius: 30, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginLeft: 16 },
  stageNum:     { fontSize: 22, fontWeight: "700", color: C.white, lineHeight: 26 },
  stageOf:      { fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: "500" },
  statsRow:     { flexDirection: "row", paddingHorizontal: 24, gap: 10, marginTop: 12 },
  statCard:     { flex: 1, backgroundColor: C.white, borderRadius: 16, padding: 14, alignItems: "center", borderWidth: 1, borderColor: C.border },
  statNum:      { fontSize: 22, fontWeight: "700", color: C.text },
  statLabel:    { fontSize: 11, color: C.textMuted, fontWeight: "500", marginTop: 2 },
  section:      { paddingHorizontal: 24, paddingTop: 24 },
  chatCTA:      { backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 18, padding: 18, flexDirection: "row", alignItems: "center" },
  chatCTATitle: { fontSize: 16, fontWeight: "700", color: C.text, marginBottom: 2 },
  chatCTADesc:  { fontSize: 13, color: C.textMuted },
  noStageCard:  { backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 20, padding: 28, alignItems: "center" },
  noStageEmoji: { fontSize: 40, marginBottom: 12 },
  noStageTitle: { fontSize: 18, fontWeight: "700", color: C.text, marginBottom: 8 },
  noStageDesc:  { fontSize: 14, color: C.textMuted, textAlign: "center", lineHeight: 20, marginBottom: 20 },
  noStageBtn:   { backgroundColor: C.green, paddingVertical: 13, paddingHorizontal: 28, borderRadius: 14 },
  noStageBtnText:{ color: C.white, fontWeight: "600", fontSize: 14 },
  signOutBtn:   { alignSelf: "center", marginTop: 32, paddingVertical: 10, paddingHorizontal: 24, borderRadius: 12, borderWidth: 1, borderColor: C.border, backgroundColor: C.white },
  signOutText:  { fontSize: 13, color: C.textMuted, fontWeight: "500" },
  reassessBtn:     { alignSelf: "center", paddingVertical: 8, paddingHorizontal: 16 },
reassessBtnText: { fontSize: 12, color: C.textMuted, textDecorationLine: "underline" },
})