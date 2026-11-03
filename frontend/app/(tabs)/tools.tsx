// app/(tabs)/tools.tsx
import { useCallback, useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, ActivityIndicator, RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import API from "../../services/api";

interface ToolItem   { id: string; name: string; unlocked: boolean; minStage: number }
interface Entry      { _id: string; toolId: string; createdAt: string; data: Record<string, any> }
interface ArticleSection { heading: string; body: string }
interface Article    { id: string; title: string; readTime: string; minStage: number; safeMessaging?: boolean; sections: ArticleSection[]; hasReflection: boolean }

const C = {
  bg: "#F4F8F6", green: "#4CAF93", greenLight: "#E8F5F1",
  greenMid: "#B8E0D6", greenDark: "#3a9478",
  text: "#1C2B26", textMuted: "#7A9490",
  white: "#FFFFFF", border: "#DCF0EA",
}

const TOOL_ICONS: Record<string, string> = {
  checklist:"✅", breathing:"🌬️", grounding:"🌿", abc:"🔍",
  strengths:"💪", cognitiveRestructuring:"🧠", worry:"🌀",
  problemSolving:"🗺️", behaviouralActivation:"⚡",
  exposure:"🪜", smartGoals:"🎯",
}

const STAGE_NAMES: Record<number, string> = {
  1:"Moratorium", 2:"Awareness", 3:"Preparation", 4:"Rebuilding", 5:"Growth"
}

const FIELD_LABELS: Record<string, string> = {
  water:"Water", food:"Food", sleep:"Sleep", shower:"Shower",
  teeth:"Teeth", movement:"Movement", outside:"Outside",
  social:"Social", enjoyment:"Enjoyment", activity:"Activity",
  cyclesCompleted:"Cycles", moodAfter:"Mood after",
  see:"Saw", touch:"Felt", hear:"Heard", smell:"Smelled", taste:"Tasted",
  activatingEvent:"What happened", inference:"First thought",
  evaluation:"What it meant", emotional:"Emotion", behavioural:"Behaviour",
  goodAt:"Good at", challenges:"Challenges", compliments:"Compliments",
  helpedOthers:"Helped others", unique:"Unique quality",
  values:"Values", madeHappy:"Made someone happy", appearance:"Appearance",
  situation:"Situation", emotion:"Emotion", allThoughts:"All thoughts",
  hotThought:"Hot thought", evidenceFor:"Evidence for",
  evidenceAgainst:"Evidence against", balancedThought:"Balanced thought",
  balancedThoughtBelief:"Belief in balanced thought", emotionAfter:"Emotion after",
  distortion:"Pattern",
  worry:"Worry", ratingBefore:"Anxiety before", ratingAfter:"Anxiety after",
  action:"Action step", when:"When",
  diaryEntry:"Diary entry", refocusActivity:"Refocus activity",
  problem:"Problem", solutions:"Solutions", prosAndCons:"Pros & cons",
  selectedSolution:"Chosen solution", plan:"Plan", doIt:"When",
  routine:"Routine", pleasurable:"Pleasurable", necessary:"Necessary",
  hierarchy:"Hierarchy", schedule:"Schedule",
  target:"Target situation", targetRating:"Initial anxiety",
  ladder:"Exposure ladder", firstStep:"First step",
  triggers:"Triggers", goal:"Goal", specific:"Specific",
  measurable:"Measurable", achievable:"Achievable",
  relevant:"Relevant", timeLimited:"Deadline",
  problems:"Obstacles", reflection:"Reflection",
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })
}

function entryPreview(data: Record<string, any>): string {
  const skip = ["_reprompt", "type", "diary"]
  const first = Object.entries(data).find(([k, v]) => !skip.includes(k) && v && typeof v === "string")
  if (!first) return "Entry"
  return first[1].length > 60 ? first[1].slice(0, 60) + "…" : first[1]
}

// Shared helper — handles worry picker or direct navigation
function launchTool(toolId: string, router: any, setShowWorryPicker: (v: boolean) => void) {
  if (toolId === 'worry') {
    setShowWorryPicker(true)
  } else {
    router.push(`/(tabs)/chat?toolId=${toolId}`)
  }
}

export default function ToolsScreen() {
  const router = useRouter()
  const [tools, setTools]           = useState<ToolItem[]>([])
  const [articles, setArticles]     = useState<Article[]>([])
  const [loading, setLoading]       = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedTool, setSelectedTool]       = useState<ToolItem | null>(null)
  const [entries, setEntries]                 = useState<Entry[]>([])
  const [entriesLoading, setEntriesLoading]   = useState(false)
  const [selectedEntry, setSelectedEntry]     = useState<Entry | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [showWorryPicker, setShowWorryPicker] = useState(false)
  const [tab, setTab] = useState<"tools" | "read">("tools")

  const loadData = useCallback(async () => {
    try {
      const [toolsRes, articlesRes] = await Promise.all([
        API.get("/api/tools/"),
        API.get("/api/chat/articles"),
      ])
      setTools(toolsRes.data.tools || [])
      setArticles(articlesRes.data.articles || [])
    } catch (e) { console.log(e) }
    finally { setLoading(false); setRefreshing(false) }
  }, [])

  useFocusEffect(useCallback(() => { loadData() }, []))

  const openTool = async (tool: ToolItem) => {
    if (!tool.unlocked) return
    setSelectedTool(tool)
    setSelectedEntry(null)
    setEntriesLoading(true)
    try {
      const res = await API.get(`/api/tools/${tool.id}/entries`)
      setEntries(res.data.entries || [])
    } catch (e) { setEntries([]) }
    finally { setEntriesLoading(false) }
  }

  const back = () => {
    if (selectedEntry)   { setSelectedEntry(null); return }
    if (selectedTool)    { setSelectedTool(null); setEntries([]); return }
    if (selectedArticle) { setSelectedArticle(null); return }
  }

  if (loading) return <ActivityIndicator style={{ flex:1 }} color={C.green} />

  // ── Article view ───────────────────────────────────
  if (selectedArticle) {
    return (
      <SafeAreaView style={s.safe} edges={["top"]}>
        <View style={s.topBar}>
          <TouchableOpacity onPress={back} style={s.backBtn}>
            <Text style={s.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={s.topBarTitle} numberOfLines={1}>{selectedArticle.title}</Text>
          <View style={{ width: 60 }} />
        </View>
        <ScrollView contentContainerStyle={s.articleScroll}>
          {selectedArticle.safeMessaging && (
            <View style={s.safeBanner}>
              <Text style={s.safeBannerText}>📞 Samaritans 116 123 · Text HELLO to 85258</Text>
            </View>
          )}
          <Text style={s.articleTitle}>{selectedArticle.title}</Text>
          <Text style={s.articleMeta}>🕐 {selectedArticle.readTime} · Stage {selectedArticle.minStage}+</Text>
          {selectedArticle.sections.map((sec, i) => (
            <View key={i} style={s.articleSection}>
              {sec.heading ? <Text style={s.sectionHeading}>{sec.heading}</Text> : null}
              <Text style={s.sectionBody}>{sec.body}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    )
  }

  // ── Entry detail ───────────────────────────────────
  if (selectedEntry) {
    const data = selectedEntry.data
    const rows = Object.entries(data).filter(([k, v]) =>
      !["_reprompt","diary","type"].includes(k) && v != null && v !== ""
    )
    return (
      <SafeAreaView style={s.safe} edges={["top"]}>
        <View style={s.topBar}>
          <TouchableOpacity onPress={back} style={s.backBtn}>
            <Text style={s.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={s.topBarTitle}>{formatDate(selectedEntry.createdAt)}</Text>
          <View style={{ width: 60 }} />
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
          {rows.map(([k, v]) => (
            <View key={k} style={s.entryRow}>
              <Text style={s.entryKey}>{FIELD_LABELS[k] || k}</Text>
              <Text style={s.entryVal}>{String(v)}</Text>
            </View>
          ))}
          {data.type && (
            <View style={s.typeBadgeWrap}>
              <View style={s.typeBadge}>
                <Text style={s.typeBadgeText}>{data.type}</Text>
              </View>
            </View>
          )}
          {Array.isArray(data.diary) && data.diary.length > 0 && (
            <View style={{ marginTop: 8 }}>
              <Text style={s.diaryLabel}>Diary entries</Text>
              {data.diary.map((d: any, i: number) => (
                <View key={i} style={s.diaryEntry}>
                  <Text style={s.diaryDate}>{d.recordedAt ? formatDate(d.recordedAt) : `Entry ${i+1}`}</Text>
                  {Object.entries(d).filter(([k]) => k !== "recordedAt").map(([k, v]) => (
                    <View key={k} style={{ marginTop: 6 }}>
                      <Text style={s.entryKey}>{FIELD_LABELS[k] || k}</Text>
                      <Text style={s.entryVal}>{String(v)}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }

  // ── Tool entries list ──────────────────────────────
  if (selectedTool) {
    return (
      <SafeAreaView style={s.safe} edges={["top"]}>
        <View style={s.topBar}>
          <TouchableOpacity onPress={back} style={s.backBtn}>
            <Text style={s.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={s.topBarTitle}>{selectedTool.name}</Text>
          {/* Start button — worry shows picker, others navigate directly */}
          <TouchableOpacity
            style={s.startSmallBtn}
            onPress={() => launchTool(selectedTool.id, router, setShowWorryPicker)}
          >
            <Text style={s.startSmallText}>Start</Text>
          </TouchableOpacity>
        </View>

        {entriesLoading
          ? <ActivityIndicator style={{ marginTop: 40 }} color={C.green} />
          : (
            <ScrollView contentContainerStyle={{ padding: 20, gap: 10 }}>
              {entries.length === 0
                ? (
                  <View style={s.emptyWrap}>
                    <Text style={s.emptyText}>No entries yet.</Text>
                    {/* Empty state start button — same logic */}
                    <TouchableOpacity
                      style={s.startBtn}
                      onPress={() => launchTool(selectedTool.id, router, setShowWorryPicker)}
                    >
                      <Text style={s.startBtnText}>Start this tool →</Text>
                    </TouchableOpacity>
                  </View>
                )
                : entries.map(entry => (
                  <TouchableOpacity
                    key={entry._id}
                    style={s.entryCard}
                    onPress={() => setSelectedEntry(entry)}
                  >
                    <Text style={s.entryCardDate}>{formatDate(entry.createdAt)}</Text>
                    <Text style={s.entryCardPreview} numberOfLines={2}>
                      {entryPreview(entry.data)}
                    </Text>
                    {entry.data.type && (
                      <View style={s.typeBadge}>
                        <Text style={s.typeBadgeText}>{entry.data.type}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          )
        }

        {/* Worry type picker — bottom sheet */}
        {showWorryPicker && (
          <View style={s.pickerOverlay}>
            <View style={s.pickerCard}>
              <Text style={s.pickerTitle}>Which type of worry?</Text>
              <TouchableOpacity
                style={s.pickerOpt}
                onPress={() => { setShowWorryPicker(false); router.push('/(tabs)/chat?toolId=worryPractical') }}
              >
                <Text style={s.pickerOptTitle}>Practical worry</Text>
                <Text style={s.pickerOptDesc}>Something I can take a step on today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.pickerOpt}
                onPress={() => { setShowWorryPicker(false); router.push('/(tabs)/chat?toolId=worryHypothetical') }}
              >
                <Text style={s.pickerOptTitle}>Hypothetical worry</Text>
                <Text style={s.pickerOptDesc}>A what-if I can't control</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowWorryPicker(false)} style={{ marginTop: 4, alignItems: 'center', padding: 8 }}>
                <Text style={{ color: C.textMuted, fontSize: 13 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    )
  }

  // ── Main list ──────────────────────────────────────
  const unlockedTools = tools.filter(t => t.unlocked)
  const lockedTools   = tools.filter(t => !t.unlocked)

  const articlesByStage: Record<number, Article[]> = {}
  articles.forEach(a => {
    if (!articlesByStage[a.minStage]) articlesByStage[a.minStage] = []
    articlesByStage[a.minStage].push(a)
  })

  return (
    <SafeAreaView style={s.safe} edges={["top"]}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Library</Text>
        <View style={s.tabs}>
          <TouchableOpacity
            style={[s.tabBtn, tab === "tools" && s.tabBtnActive]}
            onPress={() => setTab("tools")}
          >
            <Text style={[s.tabText, tab === "tools" && s.tabTextActive]}>Tools</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.tabBtn, tab === "read" && s.tabBtnActive]}
            onPress={() => setTab("read")}
          >
            <Text style={[s.tabText, tab === "read" && s.tabTextActive]}>Read</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={s.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadData() }} tintColor={C.green} />}
      >
        {tab === "tools" && (
          <>
            {unlockedTools.length > 0 && (
              <>
                <Text style={s.groupLabel}>Your tools</Text>
                {unlockedTools.map(t => (
                  <TouchableOpacity key={t.id} style={s.row} onPress={() => openTool(t)} activeOpacity={0.75}>
                    <View style={s.rowIcon}>
                      <Text style={{ fontSize: 20 }}>{TOOL_ICONS[t.id] || "🔧"}</Text>
                    </View>
                    <Text style={s.rowTitle}>{t.name}</Text>
                    <Text style={s.rowArrow}>›</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
            {lockedTools.length > 0 && (
              <>
                <Text style={[s.groupLabel, { marginTop: 20 }]}>Locked</Text>
                {lockedTools.map(t => (
                  <View key={t.id} style={[s.row, s.rowLocked]}>
                    <View style={s.rowIcon}>
                      <Text style={{ fontSize: 20, opacity: 0.4 }}>{TOOL_ICONS[t.id] || "🔧"}</Text>
                    </View>
                    <Text style={[s.rowTitle, { color: C.textMuted }]}>{t.name}</Text>
                    <View style={s.lockBadge}>
                      <Text style={s.lockBadgeText}>Stage {t.minStage}</Text>
                    </View>
                  </View>
                ))}
              </>
            )}
          </>
        )}

        {tab === "read" && (
          <>
            {Object.entries(articlesByStage).sort(([a],[b]) => Number(a)-Number(b)).map(([stage, arts]) => (
              <View key={stage}>
                <Text style={s.groupLabel}>Stage {stage} — {STAGE_NAMES[Number(stage)]}</Text>
                {arts.map(a => (
                  <TouchableOpacity key={a.id} style={s.row} onPress={() => setSelectedArticle(a)} activeOpacity={0.75}>
                    <View style={s.rowIcon}>
                      <Text style={{ fontSize: 18 }}>📖</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={s.rowTitle}>{a.title}</Text>
                      <Text style={s.rowSub}>{a.readTime}</Text>
                    </View>
                    <Text style={s.rowArrow}>›</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
            {articles.length === 0 && (
              <View style={s.emptyWrap}>
                <Text style={s.emptyText}>No articles available yet.</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: C.bg },
  header:        { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 0 },
  headerTitle:   { fontSize: 22, fontWeight: "700", color: C.text, marginBottom: 12 },
  tabs:          { flexDirection: "row", backgroundColor: C.greenLight, borderRadius: 12, padding: 3, marginBottom: 4, alignSelf: "flex-start" },
  tabBtn:        { paddingVertical: 6, paddingHorizontal: 18, borderRadius: 10 },
  tabBtnActive:  { backgroundColor: C.white },
  tabText:       { fontSize: 13, fontWeight: "500", color: C.textMuted },
  tabTextActive: { color: C.greenDark },
  listContent:   { padding: 20, paddingTop: 12, gap: 8, paddingBottom: 60 },
  groupLabel:    { fontSize: 12, fontWeight: "600", color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4, marginTop: 4 },
  row:           { backgroundColor: C.white, borderRadius: 14, padding: 14, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: C.border },
  rowLocked:     { opacity: 0.6 },
  rowIcon:       { width: 40, height: 40, borderRadius: 12, backgroundColor: C.greenLight, alignItems: "center", justifyContent: "center" },
  rowTitle:      { flex: 1, fontSize: 14, fontWeight: "600", color: C.text },
  rowSub:        { fontSize: 12, color: C.textMuted, marginTop: 1 },
  rowArrow:      { fontSize: 20, color: C.greenMid },
  lockBadge:     { backgroundColor: C.greenLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  lockBadgeText: { fontSize: 11, color: C.greenDark, fontWeight: "600" },
  topBar:        { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.white },
  backBtn:       { width: 60 },
  backText:      { fontSize: 14, color: C.green, fontWeight: "500" },
  topBarTitle:   { flex: 1, fontSize: 15, fontWeight: "600", color: C.text, textAlign: "center" },
  startSmallBtn: { width: 60, alignItems: "flex-end" },
  startSmallText:{ fontSize: 14, color: C.green, fontWeight: "600" },
  entryCard:     { backgroundColor: C.white, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.border, gap: 4 },
  entryCardDate: { fontSize: 12, color: C.textMuted, fontWeight: "500" },
  entryCardPreview: { fontSize: 14, color: C.text, lineHeight: 20 },
  entryRow:      { backgroundColor: C.white, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.border },
  entryKey:      { fontSize: 11, fontWeight: "600", color: C.textMuted, textTransform: "uppercase", letterSpacing: 0.3, marginBottom: 4 },
  entryVal:      { fontSize: 14, color: C.text, lineHeight: 20 },
  typeBadgeWrap: { alignItems: "flex-start" },
  typeBadge:     { backgroundColor: C.greenLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  typeBadgeText: { fontSize: 12, color: C.greenDark, fontWeight: "500" },
  diaryLabel:    { fontSize: 13, fontWeight: "600", color: C.text, marginBottom: 8 },
  diaryEntry:    { backgroundColor: C.white, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.border, marginBottom: 8 },
  diaryDate:     { fontSize: 12, color: C.textMuted, fontWeight: "500", marginBottom: 6 },
  articleScroll: { padding: 24, gap: 16, paddingBottom: 48 },
  safeBanner:    { backgroundColor: "#FFF3E0", borderWidth: 1, borderColor: "#FFE082", borderRadius: 12, padding: 12 },
  safeBannerText:{ fontSize: 12, color: "#E65100", lineHeight: 18 },
  articleTitle:  { fontSize: 22, fontWeight: "700", color: C.text },
  articleMeta:   { fontSize: 12, color: C.textMuted },
  articleSection:{ backgroundColor: C.white, borderRadius: 16, padding: 18, borderWidth: 1, borderColor: C.border, gap: 8 },
  sectionHeading:{ fontSize: 15, fontWeight: "600", color: C.text },
  sectionBody:   { fontSize: 14, color: C.text, lineHeight: 22 },
  emptyWrap:     { alignItems: "center", paddingTop: 40, gap: 12 },
  emptyText:     { fontSize: 14, color: C.textMuted },
  startBtn:      { backgroundColor: C.green, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  startBtnText:  { color: C.white, fontWeight: "600", fontSize: 14 },
  // Worry picker
  pickerOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  pickerCard:    { backgroundColor: C.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, gap: 12 },
  pickerTitle:   { fontSize: 16, fontWeight: "600", color: C.text, marginBottom: 4 },
  pickerOpt:     { backgroundColor: C.greenLight, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: C.greenMid },
  pickerOptTitle:{ fontSize: 14, fontWeight: "600", color: C.text, marginBottom: 2 },
  pickerOptDesc: { fontSize: 12, color: C.textMuted },
})