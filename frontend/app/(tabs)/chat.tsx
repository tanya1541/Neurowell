// app/(tabs)/chat.tsx
import { useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet, ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import API from "../../services/api";

// ── Types ──────────────────────────────────────────────────────────────────
interface Message { role: 'bot' | 'user'; text: string }
interface Option  { label: string; action?: string; next?: string }
interface ArticleSection { heading: string; body: string }
interface Article {
  id: string
  title: string
  readTime: string
  safeMessaging: boolean
  sections: ArticleSection[]
  hasReflection: boolean
  reflectionPrompt: string | null
}

export default function ChatScreen() {
  const { toolId } = useLocalSearchParams<{ toolId?: string }>();

  const [sessionId, setSessionId]   = useState<string | null>(null);
  const [mode, setMode]             = useState<string>("");
  const [messages, setMessages]     = useState<Message[]>([]);
  const [options, setOptions]       = useState<Option[]>([]);
  const [inputType, setInputType]   = useState<string>("choice");
  const [textInput, setTextInput]   = useState<string>("");
  const [loading, setLoading]       = useState(true);

  // Assessment state
  const [assessmentQuestions, setAssessmentQuestions] = useState<any[]>([]);
  const [assessmentAnswers, setAssessmentAnswers]     = useState<Record<number, number>>({});
  const [assessmentGroup, setAssessmentGroup]         = useState(1);
  const [assessmentTotal, setAssessmentTotal]         = useState(6);

  // Psychoed state
  const [article, setArticle]               = useState<Article | null>(null);
  const [reflectionInput, setReflectionInput] = useState("");
  const [pendingToolId, setPendingToolId]   = useState<string | null>(null);

  const scrollRef       = useRef<ScrollView>(null);
  const launchedToolRef = useRef<string | null>(null);

  // ── Session load ──────────────────────────────────────────────────────────
  useFocusEffect(
    useCallback(() => {
      if (toolId && toolId !== launchedToolRef.current) {
        launchedToolRef.current = toolId as string;
        startTool(toolId as string);
      } else if (!toolId && launchedToolRef.current === null) {
        loadSession();
      }
      return () => { launchedToolRef.current = null; };
    }, [toolId])
  );

  const loadSession = async () => {
    try {
      const res = await API.get("/api/chat/");
      handleResponse(res.data);
    } catch (e) { console.log(e); }
    finally { setLoading(false); }
  };

  const startTool = async (id: string) => {
    setMessages([]); setOptions([]); setLoading(true);
    try {
      const res = await API.post("/api/chat/start-tool", { toolId: id, sessionId });
      handleResponse(res.data);
    } catch (e: any) {
      if (e?.response?.data?.message === 'complete_assessment_first') loadSession();
      else loadSession();
    } finally { setLoading(false); }
  };

  // ── Response handler ──────────────────────────────────────────────────────
  const handleResponse = (data: any) => {
    if (!data) return;
    setSessionId(data.sessionId);
    setMode(data.mode);

    // Assessment
    if (data.mode === "assessment") {
      setAssessmentQuestions(data.questions || []);
      setAssessmentGroup(data.group);
      setAssessmentTotal(data.totalGroups);
      setAssessmentAnswers({});
      return;
    }

    // Psychoed article
    if (data.mode === "psychoed") {
      setArticle(data.article);
      setPendingToolId(data.pendingToolId || null);
      return;
    }

    // Chat (triage / tool / reflection)
    if (data.reply) {
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "bot" && last.text === data.reply) return prev;
        return [...prev, { role: "bot", text: data.reply }];
      });
    }
    setOptions(data.options || []);
    setInputType(data.inputType || "choice");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  // ── Send message ──────────────────────────────────────────────────────────
  const sendMessage = async (text: string, fromOption = false) => {
    setMessages(prev => [...prev, { role: "user", text }]);
    setOptions([]);
    try {
      const res = await API.post("/api/chat/message", { sessionId, text, fromOption });
      handleResponse(res.data);
    } catch (e) { console.log(e); }
  };

  // ── Assessment submit ─────────────────────────────────────────────────────
  const submitAssessmentGroup = async () => {
    const answers = assessmentQuestions.map(q => ({
      questionId: q.id,
      answer: assessmentAnswers[q.id] || 3,
    }));
    try {
      const res = await API.post("/api/chat/message", { sessionId, answers });
      handleResponse(res.data);
    } catch (e) { console.log(e); }
  };

  // ── Psychoed done / reflection submit ────────────────────────────────────
  const finishArticle = async (text = 'done') => {
    setArticle(null);
    setPendingToolId(null);
    setReflectionInput("");
    try {
      const res = await API.post("/api/chat/message", { sessionId, text, fromOption: text === 'done' || text === 'skip' });
      handleResponse(res.data);
    } catch (e) { console.log(e); }
  };

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) return <ActivityIndicator style={{ flex: 1 }} color="#4CAF93" />;

  // ── Assessment render ─────────────────────────────────────────────────────
  if (mode === "assessment") {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.assessHeader}>
          <Text style={s.assessTitle}>Group {assessmentGroup} of {assessmentTotal}</Text>
          <View style={s.assessProgress}>
            <View style={[s.assessProgressBar, { width: `${Math.round(((assessmentGroup - 1) / assessmentTotal) * 100)}%` as any }]} />
          </View>
        </View>
        <ScrollView contentContainerStyle={s.assessScroll}>
          {assessmentQuestions.map(q => (
            <View key={q.id} style={s.questionCard}>
              <Text style={s.qText}>{q.text}</Text>
              <View style={s.likertRow}>
                {[1, 2, 3, 4, 5].map(v => (
                  <TouchableOpacity
                    key={v}
                    style={[s.likertBtn, assessmentAnswers[q.id] === v && s.likertSelected]}
                    onPress={() => setAssessmentAnswers(prev => ({ ...prev, [q.id]: v }))}
                  >
                    <Text style={[s.likertNum, assessmentAnswers[q.id] === v && s.likertNumSel]}>{v}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={s.likertLabels}>
                <Text style={s.likertLabel}>Disagree</Text>
                <Text style={s.likertLabel}>Agree</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={s.nextBtn} onPress={submitAssessmentGroup}>
            <Text style={s.nextBtnText}>Next →</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Psychoed article render ───────────────────────────────────────────────
  if (mode === "psychoed" && article) {
    return (
      <SafeAreaView style={s.safe}>
        <ScrollView contentContainerStyle={s.articleScroll}>

          {/* Safe messaging banner */}
          {article.safeMessaging && (
            <View style={s.safeBanner}>
              <Text style={s.safeBannerText}>
                📞 If you're in crisis: Samaritans 116 123 · Text HELLO to 85258
              </Text>
            </View>
          )}

          {/* Header */}
          <View style={s.articleHeader}>
            <Text style={s.articleTitle}>{article.title}</Text>
            <Text style={s.articleReadTime}>🕐 {article.readTime}</Text>
          </View>

          {/* Sections */}
          {article.sections.map((sec, i) => (
            <View key={i} style={s.articleSection}>
              {sec.heading ? <Text style={s.sectionHeading}>{sec.heading}</Text> : null}
              <Text style={s.sectionBody}>{sec.body}</Text>
            </View>
          ))}

          {/* Reflection input (if article has one) */}
          {article.hasReflection && article.reflectionPrompt ? (
            <View style={s.reflectionCard}>
              <Text style={s.reflectionPrompt}>{article.reflectionPrompt}</Text>
              <TextInput
                style={s.reflectionInput}
                placeholder="Write your thoughts here..."
                multiline
                value={reflectionInput}
                onChangeText={setReflectionInput}
              />
              <TouchableOpacity
                style={s.nextBtn}
                onPress={() => finishArticle(reflectionInput.trim() || 'done')}
              >
                <Text style={s.nextBtnText}>Submit →</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={s.articleActions}>
              <TouchableOpacity style={s.nextBtn} onPress={() => finishArticle('done')}>
                <Text style={s.nextBtnText}>
                  {pendingToolId ? "Done — what's next?" : "Done"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.skipBtn} onPress={() => finishArticle('skip')}>
                <Text style={s.skipBtnText}>Skip for now</Text>
              </TouchableOpacity>
            </View>
          )}

        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Chat render ───────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView
        ref={scrollRef}
        style={s.messages}
        contentContainerStyle={s.messagesContent}
      >
        {messages.map((m, i) => (
          <View key={i} style={[s.bubble, m.role === "user" ? s.userBubble : s.botBubble]}>
            <Text style={[s.bubbleText, m.role === "user" && s.userText]}>{m.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={s.inputArea}>
        {/* Choice buttons */}
        {inputType === "choice" && options.length > 0 && (
          <View style={s.optionsWrap}>
            {options.map((o, i) => (
              <TouchableOpacity
                key={i}
                style={s.optionBtn}
                onPress={() => sendMessage(o.label, true)}
              >
                <Text style={s.optionText}>{o.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Text / multiline / scale */}
        {(inputType === "multiline" || inputType === "text" || inputType === "scale") && (
          <View style={s.textRow}>
            <TextInput
              style={s.textIn}
              placeholder={inputType === "scale" ? "0 – 100" : "Type here..."}
              value={textInput}
              onChangeText={setTextInput}
              multiline={inputType === "multiline"}
              keyboardType={inputType === "scale" ? "numeric" : "default"}
            />
            <TouchableOpacity
              style={s.sendBtn}
              onPress={() => { sendMessage(textInput); setTextInput(""); }}
            >
              <Text style={s.sendText}>→</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────
const C = {
  bg: "#F4F8F6", green: "#4CAF93", greenLight: "#E8F5F1",
  greenMid: "#B8E0D6", greenDark: "#3a9478",
  text: "#1C2B26", muted: "#7A9490", white: "#FFFFFF", border: "#DCF0EA",
}

const s = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: C.bg },

  // ── Chat ──
  messages:       { flex: 1 },
  messagesContent:{ padding: 16, gap: 10 },
  bubble:         { maxWidth: "80%", padding: 12, borderRadius: 16 },
  botBubble:      { backgroundColor: C.white, alignSelf: "flex-start", borderWidth: 1, borderColor: C.border },
  userBubble:     { backgroundColor: C.green, alignSelf: "flex-end" },
  bubbleText:     { fontSize: 14, color: C.text, lineHeight: 20 },
  userText:       { color: C.white },
  inputArea:      { padding: 12, backgroundColor: C.white, borderTopWidth: 1, borderTopColor: C.border },
  optionsWrap:    { gap: 8 },
  optionBtn:      { backgroundColor: C.greenLight, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: C.greenMid },
  optionText:     { fontSize: 13, color: C.text, textAlign: "center" },
  textRow:        { flexDirection: "row", gap: 8, alignItems: "flex-end" },
  textIn:         { flex: 1, backgroundColor: C.bg, padding: 12, borderRadius: 12, fontSize: 14, maxHeight: 100 },
  sendBtn:        { backgroundColor: C.green, width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  sendText:       { color: C.white, fontSize: 18 },

  // ── Assessment ──
  assessHeader:      { padding: 20, paddingBottom: 8 },
  assessTitle:       { fontSize: 16, fontWeight: "600", color: C.text, marginBottom: 8 },
  assessProgress:    { height: 4, backgroundColor: C.greenLight, borderRadius: 4, overflow: "hidden" },
  assessProgressBar: { height: "100%", backgroundColor: C.green, borderRadius: 4 },
  assessScroll:      { padding: 24, gap: 24 },
  questionCard:      { backgroundColor: C.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: C.border },
  qText:             { fontSize: 14, color: C.text, marginBottom: 14, lineHeight: 20 },
  likertRow:         { flexDirection: "row", gap: 8, justifyContent: "center" },
  likertBtn:         { width: 48, height: 48, borderRadius: 12, backgroundColor: C.white, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center" },
  likertSelected:    { backgroundColor: C.green, borderColor: C.green },
  likertNum:         { fontSize: 16, fontWeight: "600", color: C.text },
  likertNumSel:      { color: C.white },
  likertLabels:      { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
  likertLabel:       { fontSize: 11, color: C.muted },
  nextBtn:           { backgroundColor: C.green, padding: 16, borderRadius: 14, alignItems: "center", marginTop: 8 },
  nextBtnText:       { color: C.white, fontWeight: "600", fontSize: 15 },

  // ── Article ──
  articleScroll:   { padding: 24, gap: 20, paddingBottom: 48 },
  safeBanner:      { backgroundColor: "#FFF3E0", borderWidth: 1, borderColor: "#FFE082", borderRadius: 12, padding: 12 },
  safeBannerText:  { fontSize: 12, color: "#E65100", lineHeight: 18 },
  articleHeader:   { gap: 4 },
  articleTitle:    { fontSize: 22, fontWeight: "700", color: C.text, lineHeight: 28 },
  articleReadTime: { fontSize: 12, color: C.muted, fontWeight: "500" },
  articleSection:  { backgroundColor: C.white, borderRadius: 16, padding: 18, borderWidth: 1, borderColor: C.border, gap: 8 },
  sectionHeading:  { fontSize: 15, fontWeight: "600", color: C.text },
  sectionBody:     { fontSize: 14, color: C.text, lineHeight: 22 },
  reflectionCard:  { backgroundColor: C.white, borderRadius: 16, padding: 18, borderWidth: 1, borderColor: C.border, gap: 12 },
  reflectionPrompt:{ fontSize: 14, fontWeight: "600", color: C.text },
  reflectionInput: { backgroundColor: C.bg, borderRadius: 12, padding: 14, fontSize: 14, minHeight: 100, textAlignVertical: "top" },
  articleActions:  { gap: 10 },
  skipBtn:         { padding: 12, borderRadius: 14, alignItems: "center" },
  skipBtnText:     { color: C.muted, fontSize: 13 },
})